/**
 * These are our default users.
 * @type {Array}
 */

import _ from 'lodash';

import {roles} from './constants';
const {staff, dean, tutor} = roles;
// eslint-disable-next-line no-unused-vars
import {leverett, pfoho, quincy} from './houses';
import StorageEngine from '../lib/StorageEngine';

export const CURRENT_USER_KEY = 'current_user';

let users = [];

// User's email is like kunhok@x.com
const _make_email = (firstName, lastName) => {
  let pre_at = `${firstName}${lastName.slice(0, 1)}`;
  pre_at = pre_at.toLowerCase();
  return `${pre_at}@x.com`;
};

// Password is user's first name, in lower case.
const _make_password = (firstName, lastName) => {
  return firstName.toLowerCase();
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
    password: _make_password(firstName, lastName),
    // The `extra` object allows you to override any of these above settings
    // on a per-user basis.
    ...extra
  };
  users.push(user);
  return user;
};

add('Brigitte', 'Libby', pfoho, dean);
add('Stacy', 'Blondin', pfoho, tutor);
add('Mario', 'León', pfoho, staff, {imageURL: 'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/16388119_10211533632637074_8685994266444723417_n.jpg?oh=1663c341aecd69e94388583ff97967ef&oe=5982E07C'});

add(
  'Nick', 'Merrill', pfoho, staff,
  {
    imageURL: 'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/417556_4604809077869_865814500_n.jpg?oh=096c4f3f2aa402cc5b7ded76d9606501&oe=59567461',
    email: 'nicholas.e.merrill@gmail.com',
  }
);
add(
  'Annie', 'Schugart', quincy, staff,
  {
    imageURL: 'https://scontent-iad3-1.xx.fbcdn.net/v/t31.0-8/14525085_1216566931742134_7204994523829239446_o.jpg?oh=ae0e72e9b48b0581f1b42ec8ea376138&oe=59531292',
  }
);
add(
  'Kunho', 'Kim', leverett, staff,
  {
    imageURL: 'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/10268487_219869451556277_126286291676155279_n.jpg?oh=625d841cd43a2317f3c6dfe9edc16b87&oe=599AACDC',
  }
);
add(
  'Chris', 'Mosch', leverett, dean,
  {
    imageURL: 'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15895094_1242892179109617_1467619406834022630_n.jpg?oh=45ae683d52efc9e55570d79740db1bc8&oe=594D4E43',
    email: 'chris.p.mosch@gmail.com',
  }
);
add(
  'Evan', 'Gastman', pfoho, staff,
  {
    imageURL: '/img/users/evan.jpg',
    email: 'evangastman@college.harvard.edu',
  }
);

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
