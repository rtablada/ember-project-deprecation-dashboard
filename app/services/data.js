import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'ember-get-config';

const { podDashboard } = config;

export default class DataService extends Service {
  @tracked data;

  async load() {
    if (this.data) return;

    let res = await fetch(`${podDashboard.dataRoot}data.json`);
    this.data = await res.json();
  }

  getComponentForPath(path) {
    return this.data.componentResults.find((c) => c.path === path);
  }

  getPodInfoForPath(path, childNode) {
    let pathNode = childNode ?? this.data.appResults;

    if (path === pathNode.path) {
      return pathNode;
    }

    for (const node of pathNode.children ?? []) {
      let result = this.getPodInfoForPath(path, node);

      if (result) {
        return result;
      }
    }
  }
}
