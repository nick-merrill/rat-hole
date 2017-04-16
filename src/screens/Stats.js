import React from 'react';

class Stats extends React.Component {
  render() {
    // let stats = this.props.stat;
    let stats = {
      globalRank: 0.4,
      percKnown: 0.48,
      numberIdentified: 1083,
    };
    return (
      <div className='padding'>
        <h2>My Ranking</h2>
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
        </div>
      </div>
    );
  }
}

export default Stats;
