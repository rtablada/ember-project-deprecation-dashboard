import EmberRouter from '@ember/routing/router';
import config from 'ember-project-deprecation-dashboard/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('component');
  this.route('components');
  this.route('pod-info');
});
