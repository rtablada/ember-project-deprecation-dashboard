import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ComponentTree extends Component {
  @service('data') dataService;
}
