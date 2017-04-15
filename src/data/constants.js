/**
 * These are for us to determine permissions, to show the right data to the
 * right user.
 */
const roles = {
  admin: 'admin',     // system administrator
  dean: 'dean',       // as in a resident dean, responsible for the entire house
  tutor: 'tutor',     // responsible for multiple people on their floor
  staff: 'staff',     // like a building manager or security guard
  student: 'student', // a student resident of the house
};

export {roles};
