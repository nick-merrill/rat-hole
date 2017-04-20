import React from 'react';
import PropTypes from 'prop-types';
import {RaisedButton} from 'material-ui';

import StorageEngine from '../../../lib/StorageEngine';
import {getCurrentUser} from '../../../data/users';

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
            {userHouseNickname} dojo.
          </span>
        </h2>
        <div style={{textAlign: 'left'}}>
          <p>
            While playing, your social abilities will be tested and
            extended.
          </p>
        </div>

        <RaisedButton label='Play on Starred Students' primary={true}
                      buttonStyle={{
                        height: 50,
                        minWidth: window.innerWidth / 2
                      }}
                      onClick={() => this.handleContinue()}
                      icon={<i className='color-white fa fa-chevron-right' />}
                      style={{margin: 10}}
                      labelPosition='before' />
        <RaisedButton label='Play on Entire House' primary={true}
                      buttonStyle={{
                        height: 50,
                        minWidth: window.innerWidth / 2
                      }}
                      onClick={() => this.handleContinue()}
                      icon={<i className='color-white fa fa-chevron-right' />}
                      labelPosition='before' />
      </div>
    );
  }
}

GameTutorial.propTypes = {
  handleContinue: PropTypes.func.isRequired,
};

export default GameTutorial;
