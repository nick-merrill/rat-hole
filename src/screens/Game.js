import React from 'react';

import GameTutorial, {
  storage as tutorialStorage
} from '../components/game/GameTutorial';
import GamePlayEnvironment from '../components/game/GamePlayEnvironment';

class Game extends React.Component {
  /**
   * If this is the first time the user is playing, show the tutorial screen.
   * Otherwise, start the game.
   */
  render() {
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
