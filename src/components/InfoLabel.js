/**
 * Greyed-out label with an InfoDialogIcon for more information.
 */
import React from 'react';
import PropTypes from 'prop-types';
import InfoDialogIcon from './InfoDialogIcon';
import muiTheme from '../styles/muiTheme';

class InfoLabel extends React.Component {
  render() {
    return (
      <span
        style={{
          color: muiTheme.palette.verySoftTextColor,
        }}
      >
        <i className={this.props.iconClassName} />
        {' '}
        {this.props.label}
        <InfoDialogIcon
          iconStyle={{
            color: muiTheme.palette.verySoftTextColor,
          }}
        >
          {this.props.children}
        </InfoDialogIcon>
      </span>
    );
  }
}

InfoLabel.propTypes = {
  label: PropTypes.string,
};

export default InfoLabel;
