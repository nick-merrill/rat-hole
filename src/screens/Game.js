import React from 'react';

import GamePlayEnvironment from '../components/game/GamePlayEnvironment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import gameMuiTheme from '../styles/gameMuiTheme';

class Game extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={gameMuiTheme}>
        <div style={{
          color: gameMuiTheme.palette.textColor,
          backgroundColor: gameMuiTheme.palette.canvasColor,
        }}>
          <GamePlayEnvironment />
        </div>
      </MuiThemeProvider>
    );
  }
}

Game.propTypes = {};

export default Game;
