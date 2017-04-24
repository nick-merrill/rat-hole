/**
 * Define your routes here. These are primary screens/items the user can access.
 */
import _ from 'lodash';
import React from 'react';

import Game from '../screens/Game';
import Stats from '../screens/Stats';
import Home from '../screens/Home';
import StudentList from '../screens/StudentList';
import Settings from '../screens/Settings';
import UnrecognizedStudentsList from '../screens/UnrecognizedStudentsList';
import Radar from '../screens/Radar';

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
    title: 'Dojo',
    path: '/dojo',
    component: Game,
  },
  {
    key: 'stats',
    title: 'My Stats',
    icon: <i className='fa fa-tachometer' />,
    path: '/stats',
    component: Stats,
  },
  {
    key: 'studentList',
    title: 'Student List',
    path: '/students',
    icon: <i className='fa fa-list' />,
    component: StudentList,
  },
  {
    key: 'settings',
    title: 'Settings',
    path: '/settings',
    icon: <i className='fa fa-cog' />,
    component: Settings,
  },
  {
    key: 'unrecognizedStudents',
    title: 'Unrecognized Students',
    path: '/students/unrecognized',
    icon: <i className='fa fa-eye-slash' />,
    component: UnrecognizedStudentsList,
  },
  {
    key: 'radar',
    title: 'My Radar',
    path: '/radar',
    icon: <i className='fa fa-dot-circle-o' />,
    component: Radar,
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
