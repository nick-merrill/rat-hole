import React from 'react';
import _ from 'lodash';

import Question from './Question';
import {RaisedButton} from 'material-ui';
import {brightOverlayColors} from '../../../lib/colors';

class PhotoToTextOptionQuestion extends Question {
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
            color: _.sample(brightOverlayColors),
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
