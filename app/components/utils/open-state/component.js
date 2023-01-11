import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class OpenState extends Component {
  @tracked isOpen = this.args.isOpen ?? false;

  @action
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
