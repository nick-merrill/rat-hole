import StorageEngine from '../lib/StorageEngine';
import * as _ from 'lodash';
import moment from 'moment';

const storage = new StorageEngine('check_ins');

// Storage key constants
const STUDENTS = 'students'; // object of students, by they IDs
const CHECK_INS = 'check_ins';
const TIMESTAMP = 'timestamp';

/*
Getters
 */

const _getStudentsData = () => {
  return storage.get(STUDENTS) || {};
};

const _getCheckInDataForStudent = (student) => {
  return _getStudentsData()[student.id] || {};
};

/**
 * Latest check in is at the beginning of the array.
 */
export const getCheckInListForStudent = (student) => {
  return _getCheckInDataForStudent(student)[CHECK_INS] || [];
};

/**
 * Returns falsey if no last check in for the student.
 */
export const getLastCheckInForStudent = (student) => {
  const checkIns = getCheckInListForStudent(student);
  return _.first(checkIns);
};

/**
 * If a check-in exists for this student, returns the Moment object of the
 * time at which that check-in occurred.
 * Returns null if no recent check-in exists.
 */
export const momentOfLastCheckInForStudent = (student) => {
  const lastCheckIn = getLastCheckInForStudent(student);
  if (_.isNil(lastCheckIn)) {
    return null;
  }
  const timestamp = lastCheckIn[TIMESTAMP];
  return moment(timestamp);
};


/*
FIXME:
Setters
 */

const _setStudentsData = (data) => {
  storage.set(STUDENTS, data);
};

const _setCheckInDataForStudent = (data) => {
  // FIXME
};

export const addCheckIn = (studentID, body) => {
  // FIXME
};
