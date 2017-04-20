/********************************************************
 * This is the main entry point of our app.
 * Everything that flows from the way, flows to the way.
 ********************************************************/

// Library files
import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import './App.css';
import _ from 'lodash';

// MUI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './styles/muiTheme';

// Our Files
// eslint-disable-next-line no-unused-vars
import * as debug from './lib/debug';  // sets up ability to enable debug mode
import styles from './styles/styles';
import {getCurrentUser} from './data/users';
import Router from './lib/Router';
import routes from './lib/routes';
import Login from './screens/Login';
import OurAppBar, {APP_BAR_HEIGHT} from './components/OurAppBar';


class App extends Component {
  componentDidMount() {
    Router.subscribeToChange(() => {
      this.forceUpdate();
    });
  }

  render() {
    let currentUser = getCurrentUser();
    const currentPath = Router.getCurrentPath();
    const currentRoute = _.find(routes, {path: currentPath});
    if (_.isNil(currentRoute)) {
      throw new Error(`
      ${currentPath} is not a valid route. See lib/routes.js file.
      You may need to go to http://localhost:3000/#/
      `);
    }

    /**
     * Shows the login page if the user is not signed in.
     */
      // eslint-disable-next-line no-unused-vars
    let Screen;
    if (_.isNil(currentUser)) {
      Screen = () => (
        <div style={styles.container}>
          <h3>You must log in to see {currentRoute.title}.</h3>
          <Login successCallback={() => {
            this.forceUpdate();
          }}/>
        </div>
      );
    } else {
      Screen = () => (
        <div>
          <OurAppBar currentRoute={currentRoute} />
          <div style={{...styles.container, paddingTop: APP_BAR_HEIGHT}}>
            <currentRoute.component />
          </div>
        </div>
      );
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="main-container"
             style={{
               color: muiTheme.palette.textColor,
               backgroundColor: muiTheme.palette.canvasColor,
             }}>
          <Screen className='container' />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
