import React from 'react';
import _ from 'lodash';

import Question from './Question';
import muiTheme from '../../../styles/muiTheme';
import {GridList, GridTile} from 'material-ui';

class TextToPhotoQuestion extends Question {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      // We only need 3 other students for this Question type
      badStudentsToGuess: _.sampleSize(this.props.guessPool, 3),
    });
  }

  render() {
    const good = this.props.studentToGuess;
    // TODO: Randomize this ordering.
    const allStudentOptions = [
      ...this.state.badStudentsToGuess,
      this.props.studentToGuess
    ];
    // Results in square photos if in portrait and reasonably sized photos if
    // in landscape.
    const cellHeight = _.min([
      window.innerWidth / 2,
      window.innerHeight / 2
    ]);
    return (
      <div>
        <h2 style={{fontWeight: 300}}>
          Can you guess
          <div style={{fontWeight: 'bold'}}>
            <span style={{color: muiTheme.palette.focusTextColor}}>
              {good.firstName}
            </span>
            &nbsp;
            <span style={{color: muiTheme.palette.softTextColor}}>
              {good.lastName}
            </span>
          </div>
          from these photos?
        </h2>
        {/* 2-by-2 table of photos */}
        <GridList cols={2} cellHeight={cellHeight}>
          {
            allStudentOptions.map((s, index) => (
              <GridTile key={s.id}>
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
