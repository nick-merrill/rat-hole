import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Router from '../lib/Router';
import {getCurrentUser} from '../data/users';
import Avatar from 'material-ui/Avatar';
import {
  greenA700,
} from 'material-ui/styles/colors';
import CircleProgress from '../components/CircleProgress';

const buttonStyle = {
  margin: 15,
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentComplete: 75,
    };
  }

  handleClick(path) {
    Router.goToPath(path);
  }

  render() {
    let currentUser = getCurrentUser();
    return (
      <div>
        <div>

          <div style={{paddingTop: 30, paddingBottom: 20}}>
            Welcome, {currentUser.firstName}!
            <div>
              <Avatar src={currentUser.imageURL}
                      size={70}
                      style={{margin: 5}}
              />
            </div>
          </div>


          <div className='padding'>
            <div>
              Your Radar Percentage:
            </div>
            <CircleProgress percent={this.state.percentComplete}
                            color={greenA700} />
          </div>

          <RaisedButton label="Test your knowledge"
                        primary={true}
                        style={buttonStyle}
                        onClick={() => this.handleClick('/game')}

          />
          <RaisedButton label="See my ranking"
                        secondary={true}
                        style={buttonStyle}
                        onClick={() => this.handleClick('/stats')}

          />
        </div>
      </div>
    );
  }
}

export default Home;
