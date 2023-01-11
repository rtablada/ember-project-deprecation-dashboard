import { helper } from '@ember/component/helper';
import { kebabCase } from 'lodash';
import config from 'ember-get-config';

const { podDashboard } = config;

export default helper(function componentNameToPath(
  [componentName] /*, named*/
) {
  let segments = componentName.split('::');

  let path = segments.map(kebabCase).join('/');

  return `${podDashboard.podModuleDirectory}/components/${path}`;
});
