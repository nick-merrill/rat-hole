import React from 'react';
import {FlatButton} from 'material-ui';

import students from '../data/students';
import GameTutorial, {
  storage as tutorialStorage
} from '../components/game/GameTutorial';

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
    const userHasSeenTutorial = !!tutorialStorage.get('hasReadTutorial');
    if (userHasSeenTutorial) {
      return <GamePlayEnvironment/>;
    } else {
      return <GameTutorial handleContinue={() => this.forceUpdate()}/>;
    }
  }
}

Game.propTypes = {};

export default Game;
