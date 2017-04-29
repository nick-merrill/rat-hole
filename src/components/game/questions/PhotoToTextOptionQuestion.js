import React from 'react';

import Question from './Question';
import {RaisedButton} from 'material-ui';
import SuccessIndicatorOverlay from '../small_components/SuccessIndicatorOverlay';

class PhotoToTextOptionQuestion extends Question {
  render() {
    const {studentToGuess, guessedStudent} = this.state;

    const width = window.innerWidth - 20;
    const height = window.innerHeight / 2;
    const iconSize = height * 0.4;

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
        <div style={{
          position: 'relative',
          textAlign: 'center',
          margin: '0 auto',
          backgroundImage: `url(${studentToGuess.imageURL})`,
          backgroundAttachment: 'center center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 50%',
          width: width,
          height: height,
        }}>
          <SuccessIndicatorOverlay
            guessedStudent={guessedStudent}
            studentToGuess={studentToGuess}
            iconSize={iconSize}
          />
        </div>
        <div style={{
          marginTop: '1em',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {
            this.state.guessPool.map((s) => (
              <div key={s.id} style={{margin: 8}}>
                <RaisedButton label={`${s.firstName} ${s.lastName}`}
                              onTouchTap={() => this.handleGuess(s)}
                              primary={true}
                              style={{minWidth: window.innerWidth * 0.40}}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default PhotoToTextOptionQuestion;
