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
const STUDENT_TO_GUESS_ID = 'studentToGuessID';

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
    // Looks up student by ID if a student was already being guessed during
    // last game play session.
    const initialStudentToGuess = _.find(permittedStudents, {
      id: storage.get(STUDENT_TO_GUESS_ID),
    });
    this.state = {
      students: permittedStudents,
      studentToGuess: initialStudentToGuess,
    };
  }

  componentWillMount() {
    // Only loads a new student on mount if there wasn't already a student
    // loaded. This prevents a user from cheating by refreshing the app
    // manually.
    this.loadNextStudentToGuess(this.state.studentToGuess);
  }

  handleGoodGuess() {
    this.loadNextStudentToGuess();
  }

  loadNextStudentToGuess(forcedStudent = null) {
    // TODO: Don't show a student who has been shown recently.
    const newStudent = forcedStudent || _.sample(this.state.students);
    // Don't include the same student as the student to be guessed or
    // any students of a different sex than the student to be guessed,
    // lest the game be too easy.
    let guessPool = _.reject(this.state.students, (s) => {
      return s.id === newStudent.id || s.sex !== newStudent.sex;
    });
    this.setState({
      studentToGuess: newStudent,
      guessPool: guessPool,
    });
    storage.set(STUDENT_TO_GUESS_ID, newStudent.id);
  }

  render() {
    // Note that although this is called a Question, it is a specific subclass
    // of the Question class. It's called Question so that it's easier for an
    // IDE to map the required props onto it.
    const Question = _.sample(AVAILABLE_QUESTION_COMPONENTS);

    return (
      <div>
        <Question
          studentToGuess={this.state.studentToGuess}
          // TODO: Limit this pool by the same gender of the studentToGuess
          //   for better play experience.
          // TODO: Don't include the same student who is the one to guess.
          guessPool={this.state.guessPool}
          handleGoodGuess={() => this.handleGoodGuess()}
        />

        {/* DESIGN: Escape hatch + Redundancy (to back button in menu bar) */}
        <div className='margin'>
          <FlatButton secondary={true}
                      onClick={() => Router.goToPath('/')}>
            Exit Game
          </FlatButton>
        </div>
      </div>
    );
  }
}

GamePlayEnvironment.propTypes = {};

export default GamePlayEnvironment;
