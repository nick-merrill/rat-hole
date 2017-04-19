import React from 'react';
import PropTypes from 'prop-types';

import {greenA400} from 'material-ui/styles/colors';
import CircleProgress from '../../CircleProgress';

class SuccessPage extends React.Component {
  render() {
    return (
      <div>
        <h3>You're doing great!</h3>
        <p>Here's how you did that round:</p>
        <CircleProgress
          percent={this.props.circleProgressPercent}
          color={greenA400} />
      </div>
    );
  }
}

SuccessPage.propTypes = {
  circleProgressPercent: PropTypes.number.isRequired,
};

export default SuccessPage;
