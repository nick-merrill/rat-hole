/**
 * These are our default users.
 * @type {Array}
 */

import _ from 'lodash';

import {roles} from './constants';
const {staff, dean, tutor} = roles;
// eslint-disable-next-line no-unused-vars
import {pfoho, quincy} from './houses';
import StorageEngine from '../lib/StorageEngine';

export const CURRENT_USER_KEY = 'current_user';

let users = [];

// User's email is like kunhok@x.com
const _make_email = (firstName, lastName) => {
  let pre_at = `${firstName}${lastName.slice(0, 1)}`;
  pre_at = pre_at.toLowerCase();
  return `${pre_at}@x.com`;
};

const add = (firstName, lastName, house, role, extra = {}) => {
  if (!_.isObject(extra)) {
    throw new Error('"extra" parameter must be an object');
  }
  let user = {
    role,
    house,
    firstName,
    lastName,
    email: _make_email(firstName, lastName),
    // The `extra` object allows you to override any of these above settings
    // on a per-user basis.
    ...extra
  };
  users.push(user);
  return user;
};

add('Brigitte', 'Libby', pfoho, dean);
add('Stacy', 'Blondin', pfoho, tutor);
add('Mario', 'León', pfoho, staff);
add('Custom', 'Email', pfoho, staff, {email: 'whatupyo@gmail.com'});

export const storage = new StorageEngine('users');

export const getCurrentUser = () => {
  return storage.get(CURRENT_USER_KEY);
};
window.getCurrentUser = getCurrentUser;
export const setCurrentUser = (user) => {
  storage.set(CURRENT_USER_KEY, user);
};

// Returns nil if user with that email does not exist.
export const getUserFromEmail = (email) => {
  return _.find(users, {email: email});
};

export default users;
