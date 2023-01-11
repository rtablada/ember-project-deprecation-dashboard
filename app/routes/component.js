import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ComponentRoute extends Route {
  @service('data') dataService;

  queryParams = {
    path: {
      refreshModel: true,
    },
  };

  model({ path }) {
    return {
      componentData: this.dataService.getComponentForPath(path),
    };
  }
}
