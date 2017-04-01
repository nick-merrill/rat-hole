import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

import styles from '../styles/styles';

// Taken from Material UI DrawerUndockedExample at
// http://www.material-ui.com/#/components/drawer
class SideMenu extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <Drawer
          docked={false}
          width={200}
          open={this.props.open}
          onRequestChange={this.props.onRequestChange}
        >
          {this.props.pages.map((item) => {
            return (
              <MenuItem
                style={
                  _.defaults(
                    this.props.currentPageKey === item.key ? styles.selectedMenuItem : {}
                  )
                }
                key={item.key}
                onTouchTap={() => this.props.handleClose(item)}
              >
                {item.title}
              </MenuItem>
            );
          })}
        </Drawer>
      </div>
    );
  }
}

/*
 * These are the props allowed to be passed to this component.
 */
SideMenu.propTypes = {
  open: React.PropTypes.bool.isRequired,
  pages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  currentPageKey: React.PropTypes.string,
  handleClose: React.PropTypes.func,
  onRequestChange: React.PropTypes.func,
};

export default SideMenu;
