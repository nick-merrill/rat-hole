/********************************************************
 * This is the main entry point of our app.
 * Everything that flows from the way, flows to the way.
 ********************************************************/

// Library files
import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import styles from './styles/styles';
import './App.css';
import _ from 'lodash';

// MUI
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './styles/muiTheme';

import {getCurrentUser, setCurrentUser} from './data/users';
import Router from './lib/Router';
import routes from './lib/routes';
import Login from './screens/Login';
import SideMenu from './components/SideMenu';

/***************************************************
 * Define *additional* links for the side menu here.
 * For manual links, you must provide:
 * key
 * title
 * handleClick
 ****************************************************/
let menuItems = [
  // Any items defined here will go before the routes.
];
// Include all available routes in the menu automatically.
routes.forEach((route) => {
  menuItems.push({
    // Routes are handled automatically by the menu in a special way.
    route: route,
  });
});
// These will go after all the routes.
menuItems = menuItems.concat([
  {
    key: 'logout',
    title: 'Sign Out',
    handleClick: () => {
      setCurrentUser(null);
    },
  },
]);

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isMenuOpen: false,
    };
  }

  render() {
    let currentUser = getCurrentUser();
    const currentPath = Router.getCurrentPath();
    const currentRoute = _.find(routes, {path: currentPath});
    if (_.isNil(currentRoute)) {
      throw new Error(`${currentPath} is not a valid route. See lib/routes.js file.`);
    }

    // eslint-disable-next-line no-unused-vars
    const HeaderWithSideBar = () => {
      return (
        <div>
          <AppBar title="Know Your House"
                  onLeftIconButtonTouchTap={() => this.setState({isMenuOpen: true})}
            // Uncomment the following to add a cog to the right
            // iconClassNameRight="fa fa-cog"
          />
          <SideMenu open={this.state.isMenuOpen}
                    items={menuItems}
            // Allows the menu to style the current page for reference
                    currentItemKey={currentPath}
            // Allows the open state to be changed on touch outside of
            // menu events.
                    onRequestChange={(open) => this.setState({isMenuOpen: open})}
                    handleClose={(itemProps) => {
                      this.setState({
                        isMenuOpen: false,
                      });
                    }}/>
        </div>
      );
    };


    /**
     * Shows the login page if the user is not signed in.
     */
      // eslint-disable-next-line no-unused-vars
    let Screen;
    if (_.isNil(currentUser)) {
      Screen = () => (
        <div>
          <h3>You must log in to see {currentRoute.title}.</h3>
          <Login successCallback={() => {
            this.forceUpdate();
          }}/>
        </div>
      );
    } else {
      Screen = () => (
        <div>
          <HeaderWithSideBar />
          <currentRoute.component />
        </div>
      );
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Screen />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
