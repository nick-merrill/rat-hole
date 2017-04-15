import {roles} from './constants';
// eslint-disable-next-line no-unused-vars
import {pfoho, quincy} from './houses';

let students = [];

const add = (firstName, lastName, house, imageURL, bio) => {
  students.push({
    role: roles.student,
    firstName,
    lastName,
    house,
    imageURL,
    bio,
  })
};

add(
  'Nick', 'Merrill',
  pfoho,
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/417556_4604809077869_865814500_n.jpg?oh=096c4f3f2aa402cc5b7ded76d9606501&oe=59567461',
  'Nick is a senior studying computer science. He took two gap years to work on a startup. \n\n he/him/his'
);

export default students;
