/**
 * Define your routes here. These are primary screens/items the user can access.
 */
import _ from 'lodash';

import Game from "../screens/Game";
import Stats from "../screens/Stats";
import Home from "../screens/Home";
import Students from "../screens/Students";
import StudentProfile from "../screens/StudentProfile";

/**
 * Define your routes here. These are primary screens/items the user can access.
 */

const routes = [
  {
    title: 'Home Screen',
    path: '/',
    component: Home,
  },
  {
    title: 'Game',
    path: '/game',
    component: Game,
  },
  {
    title: 'My Stats',
    path: '/stats',
    component: Stats,
  },
  {
    title: 'Student List',
    path: '/students',
    component: Students,
  },
  {
    title: 'Student Profile',
    path: '/StudentProfile',
    component: StudentProfile,
  },
];

const routeProps = ['title', 'path', 'component'];
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
