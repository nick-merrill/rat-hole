import React from 'react';
import PropTypes from 'prop-types';
import {Paper, RaisedButton} from 'material-ui';

import StorageEngine from '../../../lib/StorageEngine';
import {getCurrentUser} from '../../../data/users';
import LiveGameScore from '../small_components/LiveGameScore';
import muiTheme from '../../../styles/muiTheme';
import gameMuiTheme from '../../../styles/gameMuiTheme';
import {lighten} from 'material-ui/utils/colorManipulator';

export const storage = new StorageEngine('game_tutorial');

class GameTutorial extends React.Component {
  handleContinue() {
    storage.set('hasReadTutorial', true);
    this.props.handleContinue();
  }

  render() {
    const user = getCurrentUser();
    const userHouseNickname = user.house.nickname || user.house.name;
    return (
      <div className='padding'>
        <h2 style={{fontWeight: 'normal'}}>
          <span className='prefer-no-wrap'>Welcome to the</span>
          &nbsp;
          <span className='prefer-no-wrap'>
            {userHouseNickname} Game.
          </span>
        </h2>
        <div style={{textAlign: 'left'}}>
          <p>
            Your social abilities are about to be tested and extended.
          </p>
          <p>
            You can always change who you want to practice on with the filter
            in the navigation bar at the top.
          </p>
          <p style={{marginBottom: 4}}>
            Indicators like these about how well you're doing will appear above
            when you start playing:
          </p>
          <Paper zDepth={3} style={{
            background: lighten(gameMuiTheme.palette.canvasColor, 0.2),
            border: '1px solid',
            borderColor: muiTheme.palette.flagColor,
            marginBottom: 16,
            padding: 8,
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: '0.8em',
            }}>
              <div>House Knowledge</div>
              <div>Latest Record</div>
              <div>Improvement</div>
              <div>Current Streak</div>
            </div>
            <LiveGameScore />
          </Paper>
        </div>

        <RaisedButton label='Begin' primary={true}
                      buttonStyle={{
                        height: 50,
                        minWidth: window.innerWidth / 2
                      }}
                      onClick={() => this.handleContinue()}
                      icon={<i className='color-white ion-chevron-right' />}
                      labelPosition='before' />
      </div>
    );
  }
}

GameTutorial.propTypes = {
  handleContinue: PropTypes.func.isRequired,
};

export default GameTutorial;
