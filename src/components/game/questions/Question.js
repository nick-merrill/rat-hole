/**
 * This is the abstract parent of any Question.
 */

import React from 'react';
import PropTypes from 'prop-types';

import GameData from '../../../data/GameData';

const GOOD_GUESS_DELAY = 400;

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wasJustSuccessful: false,
    };
  }

  componentDidMount() {}
  componentWillMount() {}

  componentWillReceiveProps() {
    // Reset for next question.
    this.setState({
      wasJustSuccessful: false,
    });
  }

  /**
   * Gives time for the question subclass to show the user she was right,
   * then notifies parent in order to move on.
   */
  handleGoodGuess() {
    GameData.registerGoodGuess(this.props.studentToGuess);
    this.setState({
      wasJustSuccessful: true,
    });
    setTimeout(() => {
      // Callback for parent
      this.props.handleGoodGuess();
    }, GOOD_GUESS_DELAY);
  }

  handleBadGuess(wrongStudent = null) {
    GameData.registerBadGuess(this.props.studentToGuess, wrongStudent);
  }

  handleGuess(guessedStudent) {
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
  style: PropTypes.object,
};

export default Question;
