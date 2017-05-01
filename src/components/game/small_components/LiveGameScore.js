import React from 'react';
import GameData from '../../../data/GameData';
import SingleChart from '../../SingleChart';
// import PropTypes from 'prop-types';

// Maximum history analyzed for success ratio
// Allow for rapid changes to make choices appear more impactful
const MAX_DEPTH = 5;
// Max number of data points on graph
// Allow to see about 2 minutes worth of progress
const MAX_NUM_DATA_POINTS = 5;

class LiveGameScore extends React.Component {
  constructor(props) {
    super(props);
    const data = GameData.getCommonData();
    this.state = {
      data,
      timeData: {
        bars: [],
        color: data[2].color,
      },
    };
  }

  componentDidMount() {
    GameData.subscribeToGuessing((data) => {
      this.setState({
        data: GameData.getCommonData(),
      });

      let newTimeBars = this.state.data.concat({
        value: GameData.getGuessRatio({maxDepth: MAX_DEPTH}),
      });
      if (newTimeBars.length > MAX_NUM_DATA_POINTS) {
        newTimeBars = newTimeBars.slice(
          newTimeBars.length - MAX_NUM_DATA_POINTS,
          newTimeBars.length
        );
      }
      this.setState({
        timeData: Object.assign({}, this.state.timeData, {
          bars: newTimeBars,
        }),
      });
    });
  }

  render() {
    let {data, timeData} = this.state;
    // Replace third graph with real data
    data[2] = timeData;
    data[3] = {
      textOnly: true,
      text: GameData.getLatestGoodGuessStreakCount(),
      color: data[3].color,
    };

    return (
      <div style={{
        ...this.props.style,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        {
          data.map((d, index) => (
            <div key={index} style={{height: 30, width: 30}}>
              {
                d.textOnly ?
                  <span style={{color: d.color}}>{d.text}</span>
                  :
                  <SingleChart data={d} mini={true} />
              }
            </div>
          ))
        }
      </div>
    );
  }
}

LiveGameScore.propTypes = {};

export default LiveGameScore;
