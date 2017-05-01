import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

import Question from './Question';
import {RaisedButton, TextField} from 'material-ui';
import SuccessIndicatorOverlay from '../small_components/SuccessIndicatorOverlay';
import muiTheme from '../../../styles/muiTheme';

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
      focused: false,
    });
  }

  componentDidMount() {
    super.componentDidMount();

    // Make it easy for the user to start typing the person's name by focusing
    // on the text field right away.
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

  componentWillUnmount() {
    super.componentWillUnmount();
    this._clearAutoScrollInterval();
  }

  handleValueChange(event) {
    this.setState({
      guessValue: event.target.value,
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleGuess();
    }
  }

  scrollToOptimalTypingPosition() {
    this.forceUpdate(() => {
      $(window).scrollTop($('#image-to-guess').offset().top);
    });
  }

  beginAutoScroll() {
    this.forceUpdate();
    /*
    this._autoScrollIntervalID = setInterval(() => {
      this.scrollToOptimalTypingPosition();
    }, 100);
    // Give the keyboard time to show before we stop auto-scrolling
    if (this._autoScrollTimeoutID) {
      clearTimeout(this._autoScrollTimeoutID);
    }
    this._autoScrollTimeoutID = setTimeout(() => {
      this._clearAutoScrollInterval();
    }, 1500);
    */
  }

  /*
   HACK:
   This is an unfortunate but temporarily necessary function to make sure the
   user doesn't have to scroll back up to view the image she is currently
   guessing. For the next few seconds, this
   listen for scrolling, caused by soft keyboard on a mobile screen, and
   keep forcing the scroll position to be one such that the user can see
   both the image they are trying to guess AND the text field.
   */
  handleInputFocus(event) {
    this.setState({focused: true});
    this.beginAutoScroll();
  }

  handleInputBlur(event) {
    this.setState({focused: false});
    this.beginAutoScroll();
  }

  _clearAutoScrollInterval() {
    if (this._autoScrollIntervalID) {
      clearInterval(this._autoScrollIntervalID);
      this._autoScrollIntervalID = null;
    }
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

    /*
     If the keyboard is shown on mobile, then we can trust the height
     given by the system. But if the keyboard is not shown (input is not
     focused), we must estimate the height of the keyboard.
     */
    let suggestedHeight = window.innerHeight - muiTheme.appBar.height - 30 - 8;
    // if (!this.state.focused) {
    //   suggestedHeight -= KEYBOARD_HEIGHT;
    // }

    const minHeight = _.max([
      100,
      suggestedHeight,
    ]);
    const width = window.innerWidth - 20;

    return (
      <div style={{
        ...this.props.style,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: '10 0 auto',
        minHeight,
      }}>
        <h3>
          Who is this?
        </h3>
        <div id='image-to-guess' style={{
          position: 'relative',
          flex: '1 0 auto',
          alignItems: 'stretch',
          textAlign: 'center',
          // margin: '0 auto',
          backgroundImage: `url(${studentToGuess.imageURL})`,
          backgroundAttachment: 'center center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 50%',
          // width,
          // Make room for the keyboard on small phones, but still allow the
          // photo to be at least 100 pixels high, in case the user is on a
          // teeny, tiny, itsy-bitsy mouse phone.
          // minHeight,
        }}>
          <SuccessIndicatorOverlay
            wasJustSuccessful={this.state.wasJustSuccessful}
            wasJustUnsuccessful={this.state.wasJustUnsuccessful}
            guessedStudent={this.state.guessedStudent}
            studentToGuess={studentToGuess}
            iconSize={width * 0.4}
          />
        </div>
        <div style={{
          textAlign: 'center',
          flex: '0 1 auto',
          display: 'inline-block',
        }}>
          <TextField
            id='quick-entry'
            hintText='First name is enough'
            onChange={this.handleValueChange.bind(this)}
            value={this.state.guessValue}
            // It's annoying to have the phone try to correct your spelling on
            // names that are not included in the device's spelling history.
            autoCorrect='off'
            autoComplete='off'
            spellCheck='off'
            onFocus={this.handleInputFocus.bind(this)}
            onBlur={this.handleInputBlur.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
            style={{
              width: _.min([
                window.innerWidth / 2,
                180,
              ])
            }}
          />
          <RaisedButton type='submit'
                        label='Submit'
                        primary={true}
                        onTouchTap={this.handleGuess.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default PhotoToTextTypingQuestion;
