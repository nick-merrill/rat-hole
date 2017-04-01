/* This is the main entry point of our app.
 * Everything that flows from the way, flows to the way.
 */

// Library files
import './App.css';
import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Our code
import RatTabScreen from './tabScreens/RatTabScreen';

const tabScreens = {
  // Simple tab screen
  friends: <div style={{fontSize: '2em'}}>My Friends</div>,
  // A tab screen that's a component
  rats: <RatTabScreen />,
};

const styles = {
  container: {
    textAlign: 'center',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentTab: 'friends',
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          {/* Header */}
          <AppBar title="REConnect"
                  iconClassNameLeft=" "
                  iconClassNameRight="fa fa-cog"
          />

          {/*
            Our main screens live inside of here. To define a new tab,
            just add your new component to `tabScreens`.
          */}
          <div>
            {tabScreens[this.state.currentTab]}
          </div>

          {/* Tab bar footer */}
          <Tabs style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <Tab icon={<FontIcon className='fa fa-user' />}
                 label='Friends'
                 onActive={() => {this.setState({currentTab: 'friends'})}}
            />
            <Tab icon={<FontIcon className='fa fa-smile-o' />}
                 label='Rats'
                 onActive={() => {this.setState({currentTab: 'rats'})}}
            />
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
