/**
 * This is the abstract parent of any Question.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import GameData from '../../../data/GameData';
import {getGreatWordShort} from '../generators';

const GOOD_GUESS_DELAY = 400;
const BAD_GUESS_DELAY = GOOD_GUESS_DELAY;
const NUM_OTHER_STUDENTS = 3;

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // User cannot interact with the game when this is false
      interactionAllowed: true,
      wasJustSuccessful: false,
      studentToGuess: props.studentToGuess,
      guessPool: this.getFreshGuessPool(props, NUM_OTHER_STUDENTS),
    };
  }

  componentDidMount() {}

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    // Reset for next question.
    this.setState({
      wasJustSuccessful: false,
    });
    // If student to guess has changed, update the guess pool.
    if (this.props.studentToGuess.id !== nextProps.studentToGuess.id) {
      this.setState({
        studentToGuess: nextProps.studentToGuess,
        guessPool: this.getFreshGuessPool(nextProps, NUM_OTHER_STUDENTS),
      });
    }
  }

  getFreshGuessPool(props, otherStudents = NUM_OTHER_STUDENTS) {
    // other students, plus the correct one
    let allStudentOptions = [
      ...props.guessPool.slice(0, otherStudents),
      props.studentToGuess
    ];
    // Otherwise, student would always be on the bottom left
    allStudentOptions = _.shuffle(allStudentOptions);
    return allStudentOptions;
  }

  /**
   Gives time for the question subclass to show the user she was right,
   then notifies parent in order to move on.
   */
  handleGoodGuess() {
    this.setState({
      wasJustSuccessful: true,
      greatWordShort: getGreatWordShort(),
      interactionAllowed: false,
    });
    GameData.registerGoodGuess(this.props.studentToGuess);
    setTimeout(() => {
      this.setState({
        interactionAllowed: true,
      });
      // Callback for parent
      this.props.handleGoodGuess();
    }, GOOD_GUESS_DELAY);
  }

  /*
   Delays BAD_GUESS_DELAY milliseconds, then tells the parent about the
   bad guess.
   */
  handleBadGuess(wrongStudent = null) {
    GameData.registerBadGuess(this.props.studentToGuess, wrongStudent);
    this.setState({
      wasJustUnsuccessful: true,
      interactionAllowed: false,
    });
    setTimeout(() => {
      this.setState({
        interactionAllowed: true,
      });
      // Callback for parent
      this.props.handleBadGuess();
    }, BAD_GUESS_DELAY);
  }

  handleGuess(guessedStudent) {
    if (!this.state.interactionAllowed) {
      // eslint-disable-next-line no-console
      console.log('interaction not allowed at this time');
      return;
    }
    if (guessedStudent.id === this.props.studentToGuess.id) {
      this.handleGoodGuess();
    } else {
      this.handleBadGuess(guessedStudent);
    }
  }
}

Question.propTypes = {
  studentToGuess: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  guessPool: PropTypes.array.isRequired,
  handleGoodGuess: PropTypes.func.isRequired,
  handleBadGuess: PropTypes.func.isRequired,
  style: PropTypes.object,
  // This is called when the question needs the parent to update, usually
  // to resize the window due to some change like the soft keyboard being shown.
  forceUpdateParent: PropTypes.func.isRequired,
};

export default Question;
