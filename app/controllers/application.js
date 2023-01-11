import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  queryParams = ['tab'];

  @tracked tab = 'pods';

  get showingPods() {
    return this.tab === 'pods';
  }

  get showingComponents() {
    return this.tab === 'components';
  }
}
