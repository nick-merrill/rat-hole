import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import SuccessIcon from './icons/SuccessIcon';
import FailureIcon from './icons/FailureIcon';

class SuccessIndicatorOverlay extends React.Component {
  render() {
    const {
      guessedStudent,
      studentToGuess,
      iconSize,
    } = this.props;

    if (_.isNil(guessedStudent)) {
      return <div />;
    }

    const style = _.defaults(this.props.style, {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
    });

    return (
      <div style={style}>
        {
          guessedStudent.id === studentToGuess.id ?
            <SuccessIcon size={iconSize} />
            :
            <FailureIcon size={iconSize} />
        }
      </div>
    );
  }
}

SuccessIndicatorOverlay.propTypes = {
  guessedStudent: PropTypes.object,
  studentToGuess: PropTypes.object.isRequired,
  iconSize: PropTypes.number.isRequired,
  style: PropTypes.object,
};

SuccessIndicatorOverlay.defaultProps = {
  style: {},
};

export default SuccessIndicatorOverlay;
