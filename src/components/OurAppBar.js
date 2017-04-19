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
import {AppBar, Avatar} from 'material-ui';

export const APP_BAR_HEIGHT = muiTheme.appBar.height;

const menuItems = [
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
    icon: <i className='fa fa-sign-out' />,
    color: muiTheme.palette.dangerColor,
    handleClick: () => {
      setCurrentUser(null);
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
    const appBarStyle = {
      position: 'fixed',
      width: '100%',
      left: 0,
      right: 0,
      top: 0,
      margin: 0,
      height: APP_BAR_HEIGHT,
    };
    const appBarTitleStyle = {
      position: 'absolute',
      textAlign: 'center',
      margin: 0,
      left: 0,
      right: 0,
      top: 0,
      fontSize: 20,
    };
    const currentPath = this.props.currentRoute.path;
    const currentUser = getCurrentUser();
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
            <Avatar src={currentUser.imageURL}
                    size={APP_BAR_HEIGHT - 4}
                    style={{margin: 2}}
            />
          </div>
        </AppBar>
      </div>
    );
    const ScreenAppBar = () => (
      <AppBar title={this.props.currentRoute.title}
              iconClassNameLeft='ion ion-chevron-left'
              onLeftIconButtonTouchTap={() => Router.goToPath('/')}
              style={appBarStyle}
              titleStyle={appBarTitleStyle} />
    );
    // Returns the appropriate App Bar
    const isHome = this.props.currentRoute.key === 'home';
    const appBar = isHome ? <HomeAppBar /> : <ScreenAppBar />;
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
