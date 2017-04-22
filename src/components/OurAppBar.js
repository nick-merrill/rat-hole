/***************************************************
 * Define *additional* links for the side menu here.
 * For manual links, you must provide:
 * key
 * title
 * handleClick
 ****************************************************/
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import muiTheme from '../styles/muiTheme';
import SideMenu from '../components/SideMenu';
import Router from '../lib/Router';
import routes from '../lib/routes';
import {getCurrentUser, setCurrentUser} from '../data/users';
import {
  AppBar, Avatar, DropDownMenu, MenuItem,
  MuiThemeProvider
} from 'material-ui';
import gameMuiTheme from '../styles/gameMuiTheme';
import GameData, {FILTER_MODES} from '../data/GameData';

export const APP_BAR_HEIGHT = muiTheme.appBar.height;

const menuItems = [
  {
    route: _.find(routes, {key: 'studentList'}),
  },
  // {
  //   route: _.find(routes, {key: 'stats'}),
  // },
  {
    route: _.find(routes, {key: 'settings'}),
  },
  {
    key: 'logout',
    title: 'Sign Out',
    labelPosition: 'left',
    icon: <i className='fa fa-sign-out' />,
    color: muiTheme.palette.dangerColor,
    handleClick: () => {
      setCurrentUser(null);
      Router.informOfChangeManually();
    },
  },
];

class OurAppBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isMenuOpen: false,
    };
  }

  render() {
    const currentRoute = this.props.currentRoute;
    const currentPath = currentRoute.path;
    const currentUser = getCurrentUser();
    let appBarStyle = {
      position: 'fixed',
      width: '100%',
      left: 0,
      right: 0,
      top: 0,
      margin: 0,
      height: APP_BAR_HEIGHT,
    };
    const gameAppBarStyle = _.merge({}, appBarStyle, {
      backgroundColor: gameMuiTheme.appBar.color,
      color: gameMuiTheme.appBar.textColor,
    });
    if (currentRoute.key === 'game') {
      _.merge(appBarStyle, gameAppBarStyle);
    }
    const appBarTitleStyle = {
      position: 'absolute',
      textAlign: 'center',
      margin: 0,
      left: 0,
      right: 0,
      top: 0,
      fontSize: 20,
    };
    const HomeAppBar = () => (
      <div>
        <AppBar
          title={`Welcome, ${currentUser.firstName}`}
          iconClassNameLeft='ion ion-android-menu'
          onLeftIconButtonTouchTap={() => this.setState({isMenuOpen: true})}
          style={appBarStyle}
          titleStyle={appBarTitleStyle}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            marginRight: 16,
          }}>
            {
              currentUser.imageURL &&
              <Avatar src={currentUser.imageURL}
                      size={APP_BAR_HEIGHT - 4}
                      style={{margin: 2}}
              />
            }
          </div>
        </AppBar>
      </div>
    );
    const ScreenAppBar = () => (
      <MuiThemeProvider
        muiTheme={currentRoute.key === 'game' ? gameMuiTheme : muiTheme}>
        <AppBar title={currentRoute.key !== 'game' && currentRoute.title}
                iconClassNameLeft='ion ion-chevron-left'
                onLeftIconButtonTouchTap={() => Router.goToPath('/')}
                iconElementRight={
                  currentRoute.key === 'game' ?
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      left: 0,
                      height: APP_BAR_HEIGHT - 4,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                      <DropDownMenu
                        value={GameData.getFilterMode()}
                        maxHeight={window.innerHeight / 2}
                        onChange={(event, index, value) => {
                          GameData.setFilterMode(value);
                          // HACK: Should update the game properly, through a
                          //   Redux store, perhaps. These two lines are bad.
                          this.forceUpdate();
                          Router.informOfChangeManually();
                        }}>
                        {
                          Object.entries(FILTER_MODES).map(([key, props]) => (
                            <MenuItem key={key}
                                      value={key}
                                      primaryText={`Filter: ${props.getTitle()}`} />
                          ))
                        }
                      </DropDownMenu>
                    </div> : <span />
                }
                style={appBarStyle}
                titleStyle={appBarTitleStyle} />
      </MuiThemeProvider>
    );
    // Returns the appropriate App Bar
    const isHome = this.props.currentRoute.key === 'home';
    let appBar;
    if (currentUser) {
      appBar = isHome ? <HomeAppBar /> : <ScreenAppBar />;
    } else {
      appBar = null;
    }
    return (
      <div>
        {appBar}
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
          }}
          disableSwipeToOpen={!isHome}
        />
      </div>
    );
  }
}

OurAppBar.propTypes = {
  currentRoute: PropTypes.object.isRequired,
};

export default OurAppBar;
