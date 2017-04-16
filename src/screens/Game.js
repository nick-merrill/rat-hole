import React from 'react';
import {FlatButton} from 'material-ui';

import students from '../data/students';
import {getCurrentUser} from '../data/users';
import StorageEngine from '../lib/StorageEngine';

const storage = new StorageEngine('game_view');

const GameTutorial = () => {
  const user = getCurrentUser();
  const userHouseNickname = user.house.nickname || user.house.name;
  return (
    <div className='padding'>
      <h1>How to Play</h1>
      <div style={{textAlign: 'left'}}>
        <p>
          Welcome to The Game.
        </p>
        <p>
          While playing, your social abilities will both be tested and extended.
        </p>
        <p>
          By playing The Game, you are not only contributing to making
          {userHouseNickname}
          feel like a real home.
        </p>
      </div>
    </div>
  );
};

const GamePlayEnvironment = () => (
  <div>
    <h2>{students[0].firstName} {students[0].lastName}</h2>
    <img src={students[0].imageURL} alt={students[0].firstName}
         style={{width: '90%'}}/>

    <FlatButton label='Exit Game' primary={true}/>
    <FlatButton secondary={true}>Exit Game</FlatButton>
  </div>
);

class Game extends React.Component {
  /**
   * If this is the first time the user is playing, show the tutorial screen.
   * Otherwise, start the game.
   */
  render() {
    // TODO: Use storage engine to tell if this is true
    const userHasSeenTutorial = !!storage.get('hasSeenTutorial');
    storage.set('hasSeenTutorial', true);
    if (userHasSeenTutorial && false) {
      return <GamePlayEnvironment/>;
    } else {
      return <GameTutorial/>;
    }
  }
}

Game.propTypes = {};

export default Game;
