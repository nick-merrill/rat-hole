import React from 'react';
// import PropTypes from 'prop-types';

import {AreaChart, Area} from 'recharts';
import GameData from '../../data/GameData';

// Maximum history analyzed for success ratio
const MAX_DEPTH = 8;
// Max number of data points on graph
const MAX_NUM_DATA_POINTS = 8;

class LiveGameScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    GameData.subscribeToGuessing((data) => {
      let newData = this.state.data.concat({
        value: GameData.getGuessRatio({maxDepth: MAX_DEPTH}),
      });
      if (newData.length > MAX_NUM_DATA_POINTS) {
        newData = newData.slice(newData.length - MAX_NUM_DATA_POINTS, newData.length);
      }
      this.setState({
        data: newData,
      });
    });
  }

  render() {
    if (this.state.data.length > 0) {
      return (
        <div>
          {/*<h4>Correctness</h4>*/}
          <AreaChart width={window.innerWidth - 20}
                     height={70}
                     data={this.state.data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type='monotone'
                  dataKey='value'
                  stroke='#8884d8'
                  strokeWidth={2}
                  fill='url(#colorValue)'
                  isAnimationActive={false}
            />
          </AreaChart>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

LiveGameScore.propTypes = {};

export default LiveGameScore;
