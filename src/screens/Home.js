import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Router from '../lib/Router';
import {
  greenA700,
} from 'material-ui/styles/colors';
import CircleProgress from '../components/CircleProgress';
import * as _ from 'lodash';
import GameData from '../data/GameData';
import {Paper} from 'material-ui';

const buttonStyle = {
  margin: 15,
};

class Home extends React.Component {
  renderChart(data) {
    return (
      <div onClick={() => Router.goToPath('/stats')}>
        <CircleProgress
          percent={data.percent}
          color={greenA700} />
      </div>
    );
  }

  render() {
    const data = [
      {percent: GameData.getGuessRatio(), title: 'Your Coverage'},
      {percent: _.random(0, 100), title: 'Your Awesomeness'},
      {percent: _.random(0, 100), title: 'Your Awesomeness'},
      {percent: _.random(0, 100), title: 'Your Awesomeness'},
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
