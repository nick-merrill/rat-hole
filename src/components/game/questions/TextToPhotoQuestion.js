import React from 'react';
import {Motion, spring} from 'react-motion';
import _ from 'lodash';

import Question from './Question';
import muiTheme from '../../../styles/muiTheme';
import {GridList, GridTile} from 'material-ui';

class TextToPhotoQuestion extends Question {
  render() {
    const studentToGuess = this.state.studentToGuess;
    // Results in square photos if in portrait and reasonably sized photos if
    // in landscape.
    const cellHeight = _.min([
      window.innerWidth / 2,
      window.innerHeight / 2
    ]);

    return (
      <div style={{
        ...this.props.style,
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
              <Motion
                key={s.id}
                defaultStyle={{x: 0.01}}
                style={{x: spring(1, {stiffness: 120, damping: 30})}}
              >
                {
                  ({x}) => (
                    <GridTile
                      key={s.id}
                      onTouchTap={() => this.handleGuess(s)}
                      style={{opacity: x}}
                      title={
                        this.state.wasJustSuccessful && s.id === studentToGuess.id
                          ? this.state.greatWordShort
                          : ''
                      }
                    >
                      <img
                        src={s.imageURL}
                        // TODO: Figure out a way blind users can play this game
                        //   (e.g. by sound or by matching students to their
                        //   interests).
                        alt={`student guess option ${index+1}`}
                      />
                    </GridTile>
                  )
                }
              </Motion>
            ))
          }
        </GridList>
      </div>
    );
  }
}

export default TextToPhotoQuestion;
