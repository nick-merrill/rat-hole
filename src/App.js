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
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './styles/muiTheme';

// Our Files
import styles from './styles/styles';
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
  {
    route: _.find(routes, {key: 'studentList'}),
  },
  {
    route: _.find(routes, {key: 'settings'}),
  },
  {
    key: 'logout',
    title: 'Sign Out',
    labelPosition: 'left',
    icon: <i className='fa fa-sign-out'/>,
    color: muiTheme.palette.dangerColor,
    handleClick: () => {
      setCurrentUser(null);
    },
  },
];

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isMenuOpen: false,
    };
  }

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

    const appBarHeight = muiTheme.appBar.height;
    const appBarStyle = {
      position: 'fixed',
      width: '100%',
      left: 0,
      right: 0,
      top: 0,
      margin: 0,
      height: appBarHeight,
    };
    const appBarTitleStyle = {
      position: 'absolute',
      textAlign: 'center',
      margin: 0,
      left: 0,
      right: 0,
      top: 0,
    };
    const HomeAppBar = () => (
      <div>
        <AppBar title=""
                iconClassNameLeft='fa fa-bars'
                onLeftIconButtonTouchTap={() => this.setState({isMenuOpen: true})}
                style={appBarStyle}
                titleStyle={appBarTitleStyle}/>
        <SideMenu
          open={this.state.isMenuOpen}
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
    const ScreenAppBar = () => (
      <AppBar title={currentRoute.title}
              iconClassNameLeft='fa fa-chevron-left'
              onLeftIconButtonTouchTap={() => Router.goToPath('/')}
              style={appBarStyle}
              titleStyle={appBarTitleStyle}/>
    );
    // Returns the appropriate App Bar
    const MainAppBar = () => {
      if (currentRoute.key === 'home') {
        return <HomeAppBar/>;
      } else {
        return <ScreenAppBar/>;
      }
    };

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
          <MainAppBar />
          <div style={{...styles.container, paddingTop: appBarHeight}}>
            <currentRoute.component />
          </div>
        </div>
      );
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="main-container"
             style={{color: muiTheme.palette.textColor}}>
          <Screen className='container' />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
