import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Router from '../lib/Router';
import * as colors from 'material-ui/styles/colors';
import CircleProgress from '../components/CircleProgress';
import * as _ from 'lodash';
import GameData from '../data/GameData';
import {Paper} from 'material-ui';
import {BarChart, Bar} from 'recharts';

const buttonStyle = {
  margin: 15,
};

class Home extends React.Component {
  renderChart(data) {
    const availableWidth = window.innerWidth / 2 - 30;
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
        title: 'Your cjoverage',
        percent: GameData.getGuessRatio(),
        color: colors.pink500,
      },
      {
        title: 'How you compare',
        bars: [{value: 10}, {value: 20}],
        color: colors.green500,
      },
      {
        title: 'Your awesomeness',
        percent: _.random(0, 100),
        color: colors.lightBlue500,
      },
      {
        title: 'Your incredibleness',
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
              <Paper key={index} className='small-stat'>
                <h3 style={{flex: '0 0 auto', margin: 0}}>
                  {d.title}
                </h3>
                {this.renderChart(d)}
              </Paper>
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
