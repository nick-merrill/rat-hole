import React from 'react';
import PropTypes from 'prop-types';
import {ActionCheckCircle} from 'material-ui/svg-icons';
import {brightSuccessColor} from '../../../../lib/colors';

class SuccessIcon extends React.Component {
  render() {
    return (
      <ActionCheckCircle
        color={brightSuccessColor}
        style={{
          width: this.props.size,
          height: this.props.size,
        }}
      />
    );
  }
}

SuccessIcon.propTypes = {
  size: PropTypes.number,
};

SuccessIcon.defaultProps = {
  size: 24,
};

export default SuccessIcon;
