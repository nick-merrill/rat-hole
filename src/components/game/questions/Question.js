/**
 * This is the abstract parent of any Question.
 */

import React from 'react';
import PropTypes from 'prop-types';

import GameData from '../../../data/GameData';

class Question extends React.Component {
  handleGoodGuess() {
    GameData.registerGoodGuess(this.props.studentToGuess);
  }
  handleBadGuess(wrongStudent = null) {
    GameData.registerBadGuess(this.props.studentToGuess, wrongStudent);
  }
}

Question.propTypes = {
  studentToGuess: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  guessPool: PropTypes.array.isRequired,
  handleGoodGuess: PropTypes.func.isRequired,
};

export default Question;
