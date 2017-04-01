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

/**********************************
 * Import any pages you need here.
 **********************************/
import RatTabScreen from './tabScreens/RatTabScreen';
import SideMenu from "./components/SideMenu";

/******************************
 * Define available pages here.
 * You must set the three properties:
   * key
   * title
   * component
 ******************************/
const pages = [
  // Simple tab screen
  {
    key: 'friends',
    title: 'My Friends',
    component: <div style={{fontSize: '2em'}}>My Friends</div>,
  },
  // A tab screen that's a component
  {
    key: 'rats',
    title: 'Rats',
    component: <RatTabScreen />,
  },
];

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isMenuOpen: false,
      /*************************************************
       * This is the initial page the app will start on.
       *************************************************/
      currentPageKey: 'friends',
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          {/* Header */}
          <AppBar title="REConnect"
                  onLeftIconButtonTouchTap={() => this.setState({isMenuOpen: true})}
                  // iconClassNameRight="fa fa-cog"
          />
          <SideMenu open={this.state.isMenuOpen}
                    pages={pages}
                    // Allows the menu to style the current page for reference
                    currentPageKey={this.state.currentPageKey}
                    // Allows the open state to be changed on touch outside of
                    // menu events.
                    onRequestChange={(open) => this.setState({isMenuOpen: open})}
                    handleClose={(item) => {
                      this.setState({
                        currentPageKey: item.key,
                        isMenuOpen: false,
                      });
                    }}
          />

          {/*
            Our main screens live inside of here. To define a new page,
            just add your new component to `pages`.
          */}
          <div>
            {
              _.find(
                pages,
                ['key', this.state.currentPageKey]
              ).component
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
