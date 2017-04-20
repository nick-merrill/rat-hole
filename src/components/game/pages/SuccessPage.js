import React from 'react';
import PropTypes from 'prop-types';

import * as colors from 'material-ui/styles/colors';
import CircleProgress from '../../CircleProgress';

class SuccessPage extends React.Component {
  render() {
    return (
      <div>
        <h3>You're doing great!</h3>
        <p>Here's how you did that round:</p>
        <CircleProgress
          size={100}
          percent={this.props.circleProgressPercent}
          color={colors.greenA400} />
      </div>
    );
  }
}

SuccessPage.propTypes = {
  circleProgressPercent: PropTypes.number.isRequired,
};

export default SuccessPage;
