import React from 'react';

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stats = {
      globalRank: 0.4,
      percKnown: 0.48,
      numberIdentified: 1083,
    }
    // let stats = this.props.stat;
    return (
      <div>
        <h2>My Ranking</h2>
        <br />
        <div style={{textAlign:'left'}}>
          {`You're in the top ${100*stats.globalRank}% of players.`}
        </div>
        <br /><br />
        <div style={{textAlign:'left'}}>
          {`You know ${100*stats.percKnown}% of the entire house.`}
        </div>
        <br /><br />
        <div style={{textAlign:'left'}}>
          {`You've identified ${stats.numberIdentified} of the entire house.`}
        </div>
      </div>
    );
  }
}

export default Stats;
