/**
 * Define your routes here. These are primary screens/items the user can access.
 */
import _ from 'lodash';

import Game from "../screens/Game";
import Stats from "../screens/Stats";
import Home from "../screens/Home";
import StudentList from "../screens/StudentList";

/**
 * Define your routes here. These are primary screens/items the user can access.
 */

const routes = [
  {
    key: 'home',
    title: 'Home Screen',
    path: '/',
    component: Home,
  },
  {
    key: 'game',
    title: 'Game',
    path: '/game',
    component: Game,
  },
  {
    key: 'stats',
    title: 'My Stats',
    path: '/stats',
    component: Stats,
  },
  {
    key: 'studentList',
    title: 'Student List',
    path: '/students',
    component: StudentList,
  },
];

const routeProps = ['key', 'title', 'path', 'component'];
// Verify every route has the appropriate properties.
routes.forEach((route, index) => {
  routeProps.forEach((prop) => {
    if (_.isNil(route[prop])) {
      throw new Error(
        `
        The route at index ${index} is missing the ${prop} property.
        See lib/routes.js for more.
        `
      );
    }
  });
});

export default routes;
