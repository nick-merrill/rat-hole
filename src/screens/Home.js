import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Router from '../lib/Router';
import * as colors from 'material-ui/styles/colors';
import CircleProgress from '../components/CircleProgress';
import * as _ from 'lodash';
import GameData from '../data/GameData';
import {Bar, BarChart} from 'recharts';
import muiTheme from '../styles/muiTheme';
import {getCurrentUser} from '../data/users';
import $ from 'jquery';

const buttonStyle = {
  margin: 15,
};

class Home extends React.Component {
  componentDidMount() {
    // Start window at the top in case user was scrolled down on the previous
    // page.
    $(window).scrollTop(0);
  }

  renderChart(data) {
    const availableWidth = data.fullWidth ? 200 : 130;
    let graphElement;
    if (!_.isNil(data.percent)) {
      graphElement = (
        <CircleProgress
          size={availableWidth}
          percent={data.percent}
          label={data.label}
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
      <div>
        {graphElement}
      </div>
    );
  }

  render() {
    // const rand1 = 64;
    const averageRecentGuessRatio = GameData.averageRecentGuessRatio() * 100;
    const currentUser = getCurrentUser();
    const bestStreak = GameData.getMaxGoodGuessStreakCount();
    const data = [
      {
        title: 'House Knowledge',
        percent: averageRecentGuessRatio,
        label: `${Math.round(averageRecentGuessRatio)}% of ${currentUser.house.nickname}`,
        color: colors.pink500,
        fullWidth: true,
      },
      {
        title: 'Latest Record',
        percent: GameData.getGuessRatio() * 100,
        color: colors.lightBlue500,
      },
      {
        title: 'Improvement',
        bars: [{value: 7}, {value: 9}, {value: 15}],
        color: colors.green500,
      },
      // {
      //   title: 'Ranking',
      //   percent: 100 - rand1,
      //   label: `Top ${rand1}%`,
      //   color: colors.deepOrange500,
      // },
      {
        title: 'Best Streak',
        percent: bestStreak > 0 ? 100 : 0,
        label: `${bestStreak}`,
        color: colors.deepOrange500,
      },
    ];
    return (
      <div>
        <RaisedButton label="Enter the Game"
                      primary={true}
                      style={buttonStyle}
                      buttonStyle={{
                        height: 50,
                        minWidth: window.innerWidth * 0.75,
                      }}
                      onClick={() => Router.goToRoute('game')} />

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
                <h4 className='title' style={{
                  margin: 0,
                  color: muiTheme.palette.softTextColor,
                }}>
                  {d.title}
                </h4>
                {this.renderChart(d)}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Home;
