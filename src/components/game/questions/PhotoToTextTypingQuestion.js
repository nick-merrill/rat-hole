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
import gameMuiTheme from '../../../styles/gameMuiTheme';

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
    });
  }

  handleInputFocus(event) {
    /*
     For the next few seconds,
     listen for scrolling, caused by soft keyboard on a mobile screen, and
     keep forcing the scroll position to be one such that the user can see
     both the image they are trying to guess AND the text field.
     */
    $(window).on('scroll', () => {
      $(window).scrollTop($('#image-to-guess').offset().top);
    });
    setTimeout(() => {
      // Stop listening
      $(window).off('scroll');
    }, 1000);
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

    const KEYBOARD_HEIGHT = 250;
    const APP_BAR_HEIGHT = gameMuiTheme.appBar.height;
    const imageToGuessOffsetTop = APP_BAR_HEIGHT + 25;

    return (
      <div style={{
        ...this.props.style,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <h3>
          Who is this?
        </h3>
        <div id='image-to-guess' style={{
          position: 'relative',
          textAlign: 'center',
          margin: '0 auto',
          backgroundImage: `url(${studentToGuess.imageURL})`,
          backgroundAttachment: 'center center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 50%',
          width: window.innerWidth,
          // Make room for the keyboard on small phones, but still allow the
          // photo to be at least 100 pixels high, in case the user is on a
          // teeny, tiny, itsy-bitsy mouse phone.
          height: _.max([
            100,
            window.innerHeight - KEYBOARD_HEIGHT - imageToGuessOffsetTop,
          ]),
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
            // It's annoying to have the phone try to correct your spelling on
            // names that are not included in the device's spelling history.
            autoCorrect='off'
            spellCheck='off'
            onFocus={this.handleInputFocus.bind(this)}
            style={{
              width: _.min([
                window.innerWidth / 2,
                180,
              ])
            }}
          />
          <RaisedButton type='submit' label='Submit' primary={true} />
        </form>
      </div>
    );
  }
}

export default PhotoToTextTypingQuestion;
