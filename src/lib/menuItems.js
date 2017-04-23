import React from 'react';
import _ from 'lodash';

import muiTheme from '../styles/muiTheme';
import routes from '../lib/routes';
import Router from '../lib/Router';
import {getCurrentUser, setCurrentUser} from '../data/users';
import {roles} from '../data/constants';

/**
 * This is wrapped in a function so that menu items can change when users
 * are changed.
 */
export const getMenuItems = () => {
  const currentUser = getCurrentUser();

  let menuItems = [];

  menuItems.push({
    route: _.find(routes, {key: 'studentList'}),
  });

  if ([roles.dean, roles.tutor].includes(currentUser.role)) {
    menuItems.push({
      route: _.find(routes, {key: 'unrecognizedStudents'}),
    });
  }

  menuItems.push({
    route: _.find(routes, {key: 'settings'}),
  });

  menuItems.push({
    key: 'logout',
    title: 'Sign Out',
    labelPosition: 'left',
    icon: <i className='fa fa-sign-out' />,
    color: muiTheme.palette.dangerColor,
    handleClick: () => {
      setCurrentUser(null);
      Router.informOfChangeManually();
    },
  });

  return menuItems;
};
