import $ from 'jquery';
import * as _ from 'lodash';
import routes from './routes';

const goToPath = (path) => {
  window.location.hash = path;
};

window.Router = window.Router ||
  {
    goToRoute: (routeKey) => {
      const route = _.find(routes, {key: routeKey});
      goToPath(route.path);
    },
    goToPath: goToPath,
    getCurrentPath: () => {
      return window.location.hash.slice(1);
    },
    subscribeToChange: (callback) => {
      $(window).on('hashchange', callback);
    },
    informOfChangeManually: () => {
      $(window).trigger('hashchange');
    },
  };

export default window.Router;
