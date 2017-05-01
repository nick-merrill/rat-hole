import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Router from '../lib/Router';
import GameData from '../data/GameData';
import muiTheme from '../styles/muiTheme';
import $ from 'jquery';
import SingleChart from '../components/SingleChart';

const buttonStyle = {
  margin: 15,
};

class Home extends React.Component {
  componentDidMount() {
    // Start window at the top in case user was scrolled down on the previous
    // page.
    $(window).scrollTop(0);
  }

  render() {
    const data = GameData.getCommonData();
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
                <SingleChart data={d} />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Home;
