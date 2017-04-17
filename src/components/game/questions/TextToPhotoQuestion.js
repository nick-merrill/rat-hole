import React from 'react';
import _ from 'lodash';

import Question from './Question';
import muiTheme from '../../../styles/muiTheme';
import {GridList, GridTile} from 'material-ui';
import {getGreatWordShort} from '../generators';

class TextToPhotoQuestion extends Question {
  constructor(props) {
    super(props);
    Object.assign(this.state, {
      studentToGuess: props.studentToGuess,
      guessPool: this.getFreshGuessPool(props),
    });
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    // If student to guess has changed, update the guess pool.
    if (this.props.studentToGuess.id !== nextProps.studentToGuess.id) {
      this.setState({
        studentToGuess: nextProps.studentToGuess,
        guessPool: this.getFreshGuessPool(nextProps),
      });
    }
  }

  getFreshGuessPool(props) {
    // 3 other students, plus the correct one
    let allStudentOptions = [
      ...props.guessPool.slice(0, 3),
      props.studentToGuess
    ];
    // Otherwise, student would always be on the bottom left
    allStudentOptions = _.shuffle(allStudentOptions);
    return allStudentOptions;
  }

  render() {
    const studentToGuess = this.state.studentToGuess;
    // Results in square photos if in portrait and reasonably sized photos if
    // in landscape.
    const cellHeight = _.min([
      window.innerWidth / 2,
      window.innerHeight / 2
    ]);

    return (
      <div style={{...this.props.style,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <h3 style={{fontWeight: 300}}>
          Can you guess
          <div style={{fontWeight: 'bold'}}>
            <span style={{color: muiTheme.palette.focusTextColor}}>
              {studentToGuess.firstName}
            </span>
            &nbsp;
            <span style={{color: muiTheme.palette.softTextColor}}>
              {studentToGuess.lastName}
            </span>
          </div>
          from these photos?
        </h3>
        {/* 2-by-2 table of photos */}
        <GridList cols={2} cellHeight={cellHeight}>
          {
            this.state.guessPool.map((s, index) => (
              <GridTile
                key={s.id}
                onTouchTap={() => this.handleGuess(s)}
                title={
                  this.state.wasJustSuccessful && s.id === studentToGuess.id
                    ? getGreatWordShort()
                    : ''
                }
              >
                <img
                  src={s.imageURL}
                  // TODO: Figure out a way blind users can play this game
                  //   (e.g. by sound or by matching students to their
                  //   interests).
                  alt={`student guess option ${index}`}
                />
              </GridTile>
            ))
            }
        </GridList>
      </div>
    );
  }
}

export default TextToPhotoQuestion;
