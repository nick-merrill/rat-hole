import React from 'react';
import _ from 'lodash';

import Question from './Question';
import {GridList, GridTile} from 'material-ui';
import SuccessIndicatorOverlay from '../small_components/SuccessIndicatorOverlay';

class TextToPhotoOptionQuestion extends Question {
  render() {
    const {studentToGuess, guessedStudent} = this.state;
    // Results in square photos if in portrait and reasonably sized photos if
    // in landscape.
    const cellDimension = _.min([
      window.innerWidth / 2,
      window.innerHeight / 2
    ]);
    const iconSize = cellDimension * 0.5;

    return (
      <div style={{
        ...this.props.style,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <h3 style={{fontWeight: 300, opacity: 0.9}}>
          Who is
          <div style={{fontWeight: 'bold'}}>
            <span style={{opacity: 1}}>
              {studentToGuess.firstName}
            </span>
            &nbsp;
            <span style={{opacity: 0.9}}>
              {studentToGuess.lastName}
            </span>
            ?
          </div>
        </h3>
        {/* 2-by-2 table of photos */}
        <GridList cols={2} cellHeight={cellDimension} style={{padding: 4}}>
          {
            this.state.guessPool.map((s, index) => (
              <GridTile
                key={s.id}
                onTouchTap={() => this.handleGuess(s)}
                titleStyle={{
                  height: cellDimension,
                  fontSize: 20,
                  fontFamily: 'San Francisco Display',
                }}
                titlePosition='top'
                titleBackground=''
                title={
                  guessedStudent && s.id === guessedStudent.id && (
                    <SuccessIndicatorOverlay
                      style={{height: cellDimension}}
                      guessedStudent={guessedStudent}
                      studentToGuess={studentToGuess}
                      iconSize={iconSize}
                    />
                  )
                }
              >
                <img
                  src={s.imageURL}
                  // TODO: Figure out a way blind users can play this game
                  //   (e.g. by sound or by matching students to their
                  //   interests).
                  alt={`student guess option ${index + 1}`}
                />
              </GridTile>
            ))
          }
        </GridList>
      </div>
    );
  }
}

export default TextToPhotoOptionQuestion;
