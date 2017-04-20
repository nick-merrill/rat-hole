import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

import Question from './Question';
import {RaisedButton, TextField} from 'material-ui';
import {
  cyanA100,
  lightGreenA200,
  pinkA200,
  purpleA200
} from 'material-ui/styles/colors';

// TODO: Also normalize for accents and special characters.
const normalize = (value) => value ? value.toLowerCase() : '';

/**
 * Gives the user as much of a chance as possible to be correct.
 */
const namesAreEqual = (actual, guessed) => {
  let foundMatch = false;
  const normActual = normalize(actual);
  // Try every normalization between the spaces.
  guessed.split(' ').forEach((g) => {
    if (normalize(g) === normActual) {
      foundMatch = true;
    }
  });
  return foundMatch;
};

class PhotoToTextTypingQuestion extends Question {
  constructor(props) {
    super(props);
    Object.assign(this.state, {
      guessValue: '',
    });
  }

  componentDidMount() {
    super.componentDidMount();
    // Make it easy for the user to start typing the person's name
    $('#quick-entry').focus();
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (nextProps.studentToGuess.id !== this.props.studentToGuess.id) {
      // Student did change
      this.setState({
        // Reset guess value
        guessValue: '',
      });
    }
  }

  handleValueChange(event) {
    this.setState({
      guessValue: event.target.value,
    }, () => {
      // Once the state has certainly updated, checks the guess.
      // Auto-submit guess if it is already correct ---->  FUN!!!
      if (this.checkHasCorrectGuess()) {
        this.handleGoodGuess();
      }
    });
  }

  /**
   * Overrides Question method.
   */
  handleGuess(event) {
    event && event.preventDefault();
    if (this.checkHasCorrectGuess()) {
      this.handleGoodGuess();
    } else {
      this.handleBadGuess();
    }
  }

  /**
   * Returns true if the user has a correct guess in the text box.
   */
  checkHasCorrectGuess() {
    const guessedName = this.state.guessValue;
    const student = this.state.studentToGuess;
    return !!namesAreEqual(student.firstName, guessedName);
  }

  render() {
    const studentToGuess = this.state.studentToGuess;

    const dimension = _.min([
      window.innerHeight,
      window.innerWidth
    ]);

    return (
      <div style={{
        ...this.props.style,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <h3>
          Who is this?
          {window.DEBUG && this.state.studentToGuess.firstName}
        </h3>
        <div style={{
          position: 'relative',
          textAlign: 'center',
          margin: '0 auto',
          backgroundImage: `url(${studentToGuess.imageURL})`,
          backgroundAttachment: 'center center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 50%',
          width: dimension * 0.75,
          height: dimension * 0.75,
        }}>
          <div style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            fontSize: 30,
            fontFamily: 'San Francisco Display',
            color: _.sample([lightGreenA200, pinkA200, purpleA200, cyanA100]),
            fontWeight: 'bold',
            textShadow: '0 0 4px #000',
          }}>
            <div>
              {
                this.state.wasJustSuccessful && this.state.greatWordShort
              }
              {
                this.state.wasJustUnsuccessful &&
                <span><i className='fa fa-frown-o' />Sorry</span>
              }
            </div>
          </div>
        </div>
        <form onSubmit={this.handleGuess.bind(this)}
              style={{textAlign: 'center'}}>
          <TextField
            id='quick-entry'
            hintText='First name is enough'
            onChange={this.handleValueChange.bind(this)}
            value={this.state.guessValue}
          />
          <RaisedButton type='submit' label='Submit Guess' primary={true} />
        </form>
      </div>
    );
  }
}

export default PhotoToTextTypingQuestion;
