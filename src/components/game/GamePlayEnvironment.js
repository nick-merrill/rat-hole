import React from 'react';
// import PropTypes from 'prop-types';
import {FlatButton} from 'material-ui';
import _ from 'lodash';

import StorageEngine from '../../lib/StorageEngine';
import Router from '../../lib/Router';
import {getPermittedStudents} from '../../data/students';
import {
  TextToPhotoQuestion,
} from './questions';

const storage = new StorageEngine('game_play_environment');

// eslint-disable-next-line no-unused-vars
const AVAILABLE_QUESTION_COMPONENTS = [
  TextToPhotoQuestion,
];

/**
 * Chooses which student to have the user guess and displays a question type
 * of appropriate difficulty for user's ability level.
 *
 * DESIGN:
 *   Takes advantage of the randomness that people find interesting. Randomness
 *   comes in several forms in this game:
 *     1. Which student is presented.
 *     2. How a user is asked to identify each student.
 */
class GamePlayEnvironment extends React.Component {
  constructor(props) {
    super(props);
    const permittedStudents = getPermittedStudents();
    this.state = {
      students: permittedStudents,
      // Looks up student by ID if a student was already being guessed during
      // last game play session.
      studentToGuess: _.find(permittedStudents, {
        id: _.get('studentToGuessID'),
      }),
    };
  }

  componentWillMount() {
    // Only loads a new student on mount if there wasn't already a student
    // loaded. This prevents a user from cheating by refreshing the app
    // manually.
    if (_.isNil(this.state.studentToGuess)) {
      this.loadNextStudentToGuess();
    }
  }

  handleGoodGuess() {
    this.loadNextStudentToGuess();
  }

  loadNextStudentToGuess() {
    const newStudent = _.sample(this.state.students);
    this.setState({
      studentToGuess: newStudent,
    });
    storage.set('studentToGuessID', newStudent.id);
  }

  render() {
    return (
      <div>
        <TextToPhotoQuestion
          studentToGuess={this.state.studentToGuess}
          // TODO: Limit this pool by the same gender of the studentToGuess
          //   for better play experience.
          // TODO: Don't include the same student who is the one to guess.
          guessPool={this.state.students}
          handleGoodGuess={() => this.handleGoodGuess()}
        />

        {/* DESIGN: Escape hatch + Redundancy (to back button in menu bar) */}
        <FlatButton secondary={true}
                    onClick={() => Router.goToPath('/')}>
          Exit Game
        </FlatButton>
      </div>
    );
  }
}

GamePlayEnvironment.propTypes = {};

export default GamePlayEnvironment;
