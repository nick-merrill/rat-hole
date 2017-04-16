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
    key: 'logout',
    title: 'Sign Out',
    labelPosition: 'left',
    icon: <i className='fa fa-sign-out' />,
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

    const appBarStyle = {
      position: 'fixed',
      width: '100%',
      top: 0,
    };
    const HomeAppBar = () => (
      <div>
        <AppBar title="Know Your House"
                onLeftIconButtonTouchTap={() => this.setState({isMenuOpen: true})}
                style={appBarStyle}/>
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
    const ScreenAppBar = () => (
      <AppBar title={currentRoute.title}
              onLeftIconButtonTouchTap={() => Router.goToPath('/')}
              iconClassNameLeft='fa fa-chevron-left'
              style={appBarStyle}/>
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
          <div style={{...styles.container, paddingTop: 60}}>
            <currentRoute.component />
          </div>
        </div>
      );
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="main-container">
          <Screen />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
