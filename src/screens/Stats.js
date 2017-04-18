import React from 'react';
import GameData from '../data/GameData';

class Stats extends React.Component {
  render() {
    let stats = {
      globalRank: 0.4,
      percKnown: 0.5,
      numberIdentified: 1083,
      recentSuccessRatio: GameData.getGuessRatio({maxDepth: 20}),
    };
    return (
      <div className='padding'>
        <div style={{textAlign: 'left'}}>
          <p>
            {`You're in the top ${100 * stats.globalRank}% of players.`}
          </p>
          <p>
            {`You know ${100 * stats.percKnown}% of the entire house.`}
          </p>
          <p>
            {`You've identified ${stats.numberIdentified} students.`}
          </p>
          <p>
            {`Lately, you've been right ${Math.round(stats.recentSuccessRatio * 100)}% of the time.`}
          </p>
        </div>
      </div>
    );
  }
}

export default Stats;
