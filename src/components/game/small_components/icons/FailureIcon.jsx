import React from 'react';
import PropTypes from 'prop-types';

class FailureIcon extends React.Component {
  render() {
    return (
      <img
        src='/img/icons/material_close.svg'
        alt='failure'
        style={{
          width: this.props.size,
          height: this.props.size,
        }}
      />
    );
  }
}

FailureIcon.propTypes = {
  size: PropTypes.number,
};

FailureIcon.defaultProps = {
  size: 24,
};

export default FailureIcon;
