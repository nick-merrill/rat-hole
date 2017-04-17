import _ from 'lodash';

import StorageEngine from '../lib/StorageEngine';

// Keys
const STUDENTS = 'students';
const RECENT_GUESS_IDS = 'recent_guess_ids';

/**
 * Handles all the data storage we want for the user's game play.
 * Essentially, this serves two purposes:
 *   1. It receives events regarding game play.
 *   2. It allows us to access data regarding that game play.
 */
class GameData {
  constructor() {
    this.storage = new StorageEngine('game_data');
    // Keeps track of student-specific data by using unique IDs as a
    // lookup method.
    this.storage.set(STUDENTS, {});
  }

  /**
   * Call this when the user makes a correct guess.
   * @param student - The student correctly guessed.
   */
  registerGoodGuess(student) {
    this._patchStudentData(student, {
      goodGuessCount: this._getStudentData(student).goodGuessCount + 1,
    });
    this.storage.set(
      RECENT_GUESS_IDS,
      (this.storage.get(RECENT_GUESS_IDS) || []).concat(student.id)
    );
  }

  /**
   * Call this when the user makes an incorrect guess.
   * @param student - The student supposed to be guessed.
   * @param wrongStudent - (optional) The student the user did guess,
   *                       incorrectly.
   */
  registerBadGuess(student, wrongStudent = null) {
    this._patchStudentData(student, {
      missedGuessCount: this._getStudentData(student).missedGuessCount + 1,
    });
    if (wrongStudent) {
      this._patchStudentData(wrongStudent, {
        badGuessCount: this._getStudentData(wrongStudent).badGuessCount + 1,
      });
    }
  }

  /**
   * Returns an array of students that were recently guessed.
   * The first element is the most recent student guessed.
   */
  getRecentlyGuessedStudentIDs() {
    let ret = this.storage.get(RECENT_GUESS_IDS) || [];
    // OPTIMIZE: Store elements in reverse to avoid this dumb operation.
    return _.reverse(ret);
  }

  /*
   PRIVATE methods from here on. Don't call them without good reason.
   */

  _getStudents() {
    return this.storage.get(STUDENTS) || {};
  }

  _getStudentData(student) {
    return this._getStudents()[student.id] || {};
  }

  _setStudentData(student, newData) {
    let data = this._getStudents();
    data[student.id] = newData;
    return this.storage.set(STUDENTS, data);
  }

  _patchStudentData(student, patchObject) {
    const studentData = this._getStudentData(student);
    const newData = Object.assign({}, studentData, patchObject);
    this._setStudentData(student, newData);
  }
}

export default new GameData();
