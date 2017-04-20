import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Router from '../lib/Router';
import * as colors from 'material-ui/styles/colors';
import CircleProgress from '../components/CircleProgress';
import * as _ from 'lodash';
import GameData from '../data/GameData';
import {BarChart, Bar} from 'recharts';

const buttonStyle = {
  margin: 15,
};

class Home extends React.Component {
  renderChart(data) {
    const availableWidth = 130;
    let graphElement;
    if (!_.isNil(data.percent)) {
      graphElement = (
        <CircleProgress
          size={availableWidth}
          percent={data.percent}
          color={data.color} />
      );
    } else if (!_.isNil(data.bars)) {
      graphElement = (
        <BarChart
          width={availableWidth}
          height={availableWidth}
          data={data.bars}>
          <Bar dataKey='value' fill={data.color} />
        </BarChart>
      );
    } else {
      throw new Error('Could not render this type of data');
    }
    return (
      <div onClick={() => Router.goToPath('/stats')}>
        {graphElement}
      </div>
    );
  }

  render() {
    const data = [
      {
        title: 'House Knowledge',
        percent: GameData.getGuessRatio(),
        color: colors.pink500,
      },
      {
        title: 'Radar Coverage',
        percent: GameData.getGuessRatio(),
        color: colors.lightBlue500,
      },
      {
        title: 'Improvement',
        bars: [{value: 10}, {value: 20}],
        color: colors.green500,
      },
      {
        title: 'Ranking',
        percent: _.random(0, 100),
        color: colors.amber500,
      },
    ];
    return (
      <div>
        <div className='padding' style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
          {
            data.map((d, index) => (
              <div key={index} className='small-stat'>
                <h4 className='title' style={{margin: 0}}>
                  {d.title}
                </h4>
                {this.renderChart(d)}
              </div>
            ))
          }
        </div>

        <RaisedButton label="Test your knowledge"
                      primary={true}
                      style={buttonStyle}
                      onClick={() => Router.goToPath('/game')} />
        <RaisedButton label="See My Stats"
                      secondary={true}
                      style={buttonStyle}
                      onClick={() => Router.goToPath('/stats')} />
      </div>
    );
  }
}

export default Home;
