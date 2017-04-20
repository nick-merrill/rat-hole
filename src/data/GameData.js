import _ from 'lodash';

import StorageEngine from '../lib/StorageEngine';
import {getCurrentUser} from './users';
import moment from 'moment';
import {getFlaggedStudentIDs, getPermittedStudents} from './students';

// Keys
const STUDENTS = 'students';
const RECENT_GUESS_IDS = 'recent_guess_ids';
const GUESS_LOG = 'guess_log';
const GOOD = 'good';
const BAD = 'bad';

const FILTER_MODE_KEY = 'filter_mode';
export const FILTER_MODES = {
  house: {
    getTitle: () => getCurrentUser().house.nickname,
    apply: (students) => _.filter(students, {
      house: {
        name: getCurrentUser().house.name,
      },
    }),
  },
  advisees: {
    getTitle: () => 'Advisees',
    apply: (students) => _.filter(students, {
      house: {
        name: getCurrentUser().house.name,
      },
    }),
  },
  starred: {
    getTitle: () => 'Starred',
    apply: (students) => {
      const starredStudentIDs = getFlaggedStudentIDs();
      return _.filter(students, {id: starredStudentIDs});
    }
  },
};

/**
 * Handles all the data storage we want for the user's game play.
 * Essentially, this serves two purposes:
 *   1. It receives events regarding game play.
 *   2. It allows us to access data regarding that game play.
 */
class GameData {
  constructor() {
    this._storage = new StorageEngine('game_data');
    // Keeps track of student-specific data by using unique IDs as a
    // lookup method.
    this._subscribers = [];
  }

  /**
   * Call this when the user makes a correct guess.
   * @param student - The student correctly guessed.
   */
  registerGoodGuess(student) {
    this._addToGuessLog(GOOD);
    this._patchStudentData(student, {
      correctlyGuessedCount: (this._getStudentData(student).correctlyGuessedCount || 0) + 1,
      guessLog: [GOOD].concat(this._getStudentGuessLog(student)),
    });
    this._storage.set(
      RECENT_GUESS_IDS,
      (this._storage.get(RECENT_GUESS_IDS) || []).concat(student.id)
    );
    this.callGuessingCallbacks(student);
  }

  /**
   * Call this when the user makes an incorrect guess.
   * @param student - The student supposed to be guessed.
   * @param wrongStudent - (optional) The student the user did guess,
   *                       incorrectly.
   */
  registerBadGuess(student, wrongStudent = null) {
    this._addToGuessLog(BAD);
    this._patchStudentData(student, {
      missedGuessCount: (this._getStudentData(student).missedGuessCount || 0) + 1,
      guessLog: [BAD].concat(this._getStudentGuessLog(student)),
    });
    if (wrongStudent) {
      this._patchStudentData(wrongStudent, {
        incorrectlyGuessedCount: (this._getStudentData(wrongStudent).incorrectlyGuessedCount || 0) + 1,
        incorrectlyGuessedTimestamps: [moment()].concat(this._getStudentData(student).incorrectlyGuessedTimestamps || []),
      });
    }
    this.callGuessingCallbacks(student);
  }

  subscribeToGuessing(callback) {
    this._subscribers.push(callback);
  }

  callGuessingCallbacks(data) {
    this._subscribers.forEach((callback) => {
      callback(data);
    });
  }

  /**
   * Fun stuff
   */

  // The input MUST be comprised of 'good' and 'bad' only.
  _getGuessRatioForGuessLog(guessLog, options = {}) {
    options = _.defaults(options, {
      maxDepth: 100,
    });
    const recent = guessLog.slice(0, options.maxDepth);
    const good = _.filter(recent, (g) => g === GOOD).length;
    const bad = _.filter(recent, (g) => g === BAD).length;
    return good / (good + bad);
  }

  getGuessRatio(options) {
    return this._getGuessRatioForGuessLog(this.getGuessLog(), options);
  }

  /**
   * Returns an array of students that were recently guessed.
   * The first element is the most recent student guessed.
   */
  getRecentlyGuessedStudentIDs() {
    let ret = this._storage.get(RECENT_GUESS_IDS) || [];
    // OPTIMIZE: Store elements in reverse to avoid this dumb operation.
    return _.reverse(ret);
  }

  /**
   * Returns the ratio of successful guesses this user has made for a particular
   * student.
   */
  guessRatioForStudent(student, options = {}) {
    options = _.defaults(options, {
      // Attempts beyond this many are so far back that they are less
      // relevant, at least until we have a good model for our users' memory.
      maxDepth: 5,
    });
    const studentGuessLog = this._getStudentGuessLog(student);
    let ret = this._getGuessRatioForGuessLog(studentGuessLog, options);
    if (_.isNaN(ret)) {
      // Default to 0 guess ratio.
      ret = 0;
    }
    return ret;
  }

  correctGuessCountForStudent(student) {
    return this._getStudentData(student).correctlyGuessedCount || 0;
  }

  averageRecentGuessRatio() {
    let guessRatios = [];
    getPermittedStudents().forEach((s) => {
      guessRatios.push(this.guessRatioForStudent(s));
    });
    return _.mean(guessRatios);
  }

  getFilterMode() {
    return this._storage.get(FILTER_MODE_KEY) || 'house';
  }
  setFilterMode(key) {
    if (!_.keys(FILTER_MODES).includes(key)) {
      throw new Error(`invalid game filter mode key "${key}"`);
    }
    this._storage.set(FILTER_MODE_KEY, key);
  }

  /**
   * Takes into account the current filter and returns students on which
   * the user can play the game.
   */
  getFilteredStudents() {
    const filter = FILTER_MODES[this.getFilterMode()];
    return filter.apply(getPermittedStudents());
  }

  /*
   PRIVATE methods from here on. Don't call them without good reason.
   */

  _getStudents() {
    return this._storage.get(STUDENTS) || {};
  }

  _getStudentData(student) {
    return this._getStudents()[student.id] || {};
  }

  _setStudentData(student, newData) {
    let data = this._getStudents();
    data[student.id] = newData;
    return this._storage.set(STUDENTS, data);
  }

  _getStudentGuessLog(student) {
    return this._getStudentData(student).guessLog || [];
  }

  _patchStudentData(student, patchObject) {
    const studentData = this._getStudentData(student);
    const newData = Object.assign({}, studentData, patchObject);
    this._setStudentData(student, newData);
  }

  getGuessLog() {
    return this._storage.get(GUESS_LOG) || [];
  }

  _addToGuessLog(data) {
    this._storage.set(
      GUESS_LOG,
      [data].concat(this.getGuessLog())
    );
  }
}

// For debugging purposes
window.GameData = new GameData();

export default new GameData();
