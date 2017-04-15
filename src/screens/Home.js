import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Router from '../lib/Router';
import {getCurrentUser, setCurrentUser} from '../data/users';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Progress from '../vendors/progress/Progress';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';



const style = {
  margin: 15,
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 75,
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

          <div style={{...style, paddingTop: 30, paddingBottom: 20}}>
            Welcome, {currentUser.firstName}
            <div>
              <Avatar src={currentUser.imageURL}
                      size={70}
                      style={{margin: 5}}
              />
            </div>
          </div>

          <div style={{paddingBottom: 20}}>
            <div style={{paddingBottom: 20}}>
              Your Radar Percentage:
            </div>
            <Progress percent={90} />
          </div>


          <RaisedButton label="Test your knowledge"
                        primary={true}
                        style={style}
                        onClick={() => this.handleClick('/game')}

          />
          <RaisedButton label="See my ranking"
                        secondary={true}
                        style={style}
                        onClick={() => this.handleClick('/stats')}

          />
        </div>

      </div>



    );
  }
}

export default Home;
