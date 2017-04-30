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
      wasJustSuccessful,
      wasJustUnsuccessful,
    } = this.props;

    // Don't display anything if a guess did not just occur.
    if (!(wasJustSuccessful || wasJustUnsuccessful)) {
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
          wasJustSuccessful ?
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
  wasJustSuccessful: PropTypes.bool.isRequired,
  wasJustUnsuccessful: PropTypes.bool.isRequired,
  style: PropTypes.object,
};

SuccessIndicatorOverlay.defaultProps = {
  style: {},
};

export default SuccessIndicatorOverlay;
