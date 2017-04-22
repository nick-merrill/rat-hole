import React from 'react';
import _ from 'lodash';

import Question from './Question';
import {GridList, GridTile} from 'material-ui';
import {brightOverlayColors} from '../../../lib/colors';

class TextToPhotoOptionQuestion extends Question {
  constructor(props) {
    super(props);
    // When the component is unmounted and remounted, these will get
    // reinitialized.
    Object.assign(this.state, {
      brightOverlayColor: _.sample(brightOverlayColors),
    });
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
      <div style={{
        ...this.props.style,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <h3 style={{fontWeight: 300, opacity: 0.9}}>
          Can you guess
          <div style={{fontWeight: 'bold'}}>
            <span style={{opacity: 1}}>
              {studentToGuess.firstName}
            </span>
            &nbsp;
            <span style={{opacity: 0.9}}>
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
                titleStyle={{
                  color: this.state.brightOverlayColor,
                }}
                title={
                  s.id === studentToGuess.id && (
                    this.state.wasJustSuccessful
                      ? this.state.greatWordShort
                      : this.state.wasJustUnsuccessful &&
                      <span>
                        <i className='fa fa-arrow-right' />
                        {studentToGuess.firstName}
                      </span>
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
