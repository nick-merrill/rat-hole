import _ from 'lodash';

import StorageEngine from '../lib/StorageEngine';

// Keys
const STUDENTS = 'students';
const RECENT_GUESS_IDS = 'recent_guess_ids';
const GUESS_LOG = 'guess_log';
const GOOD = 'good';
const BAD = 'bad';

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
    this._storage.set(STUDENTS, {});
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
    });
    if (wrongStudent) {
      this._patchStudentData(wrongStudent, {
        incorrectlyGuessedCount: (this._getStudentData(wrongStudent).incorrectlyGuessedCount || 0) + 1,
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

  getGuessRatio(options) {
    options = _.defaults(options, {
      maxDepth: 100,
    });
    const recent = this.getGuessLog().slice(0, options.maxDepth);
    const good = _.filter(recent, (g) => g === GOOD).length;
    const bad = _.filter(recent, (g) => g === BAD).length;
    return good / (good + bad);
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

window.GameData = new GameData();

export default new GameData();
