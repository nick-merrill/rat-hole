import React from 'react';
import students from '../data/students';
import {FlatButton} from 'material-ui';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>{students[0].firstName} {students[0].lastName}</h2>
        <img src={students[0].imageURL} alt={students[0].firstName}
             style={{width: '90%'}} />

        <FlatButton label='Exit Game' primary={true} />
        <FlatButton secondary={true}>Exit Game</FlatButton>
      </div>
    );
  }
}

Game.propTypes = {};

export default Game;
