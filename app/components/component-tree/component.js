import Component from '@glimmer/component';
import { service } from '@ember/service';
import config from 'ember-get-config';
import { flatten, groupBy, sumBy } from 'lodash';
const { podDashboard } = config;
const { podModuleDirectory } = podDashboard;

/**
 * @typedef {{componentData: object; parentSegments: string[]; parentPath: string;}} ComponentPathInfo
 * @typedef {{ComponentPathInfo & isGroup: boolean;}} ComponentGroupInfo
 */

export default class ComponentTree extends Component {
  @service('data') dataService;

  /**
   *
   * @param { Object.<string,ComponentPathInfo[]> } groups
   * @param {string?} groupParentPath
   * @returns {ComponentGroupInfo[]}
   */
  createComponentGroups(groups, groupParentPath = '') {
    let parentSegmentCount = groupParentPath
      ? groupParentPath.split('/').length
      : 0;

    let otherGroupParentPaths = Object.keys(groups).filter(
      (parentPath) =>
        parentSegmentCount === parentPath.split('/').length - 1 &&
        parentPath !== groupParentPath &&
        parentPath.startsWith(groupParentPath)
    );

    let result = [
      ...flatten(
        otherGroupParentPaths.map((parentPath) =>
          this.createComponentGroups(groups, parentPath)
        )
      ),
      ...groups[groupParentPath],
    ];

    return groupParentPath === ''
      ? result
      : {
          isGroup: true,
          path: groupParentPath,
          pathSegments: groupParentPath.split('/'),
          deprecationsCount: sumBy(result, (c) =>
            c.componentData
              ? c.componentData.deprecationsCount
              : c.deprecationsCount
          ),
          componentCount: sumBy(result, (c) => c.componentCount ?? 1),
          children: result,
        };
  }

  get componentData() {
    let pathAndComponents = this.dataService.data.componentResults.map((c) => {
      let parentSegments = c.path
        .replace(`${podModuleDirectory}/components/`, '')
        .split('/')
        .slice(0, -1);

      return {
        componentData: c,
        parentSegments,
        parentPath: parentSegments.join('/'),
      };
    });

    let groups = groupBy(pathAndComponents, 'parentPath');
    return this.createComponentGroups(groups);
  }
}
