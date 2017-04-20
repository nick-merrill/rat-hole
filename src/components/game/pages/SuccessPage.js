import React from 'react';
import PropTypes from 'prop-types';

import * as colors from 'material-ui/styles/colors';
import CircleProgress from '../../CircleProgress';

class SuccessPage extends React.Component {
  render() {
    let smallMessage = 'Good work!';
    if (this.props.circleProgressPercent > 75) {
      smallMessage = 'Great work!';
    }
    const encouragement = (
      <p>
        Don't worry. The more you play, the more you'll learn!
      </p>
    );
    return (
      <div>
        <h3>{smallMessage}</h3>
        <p>Here's how you did that round:</p>
        <CircleProgress
          size={100}
          percent={this.props.circleProgressPercent}
          color={colors.greenA400} />
        {this.props.circleProgressPercent < 40 && encouragement}
      </div>
    );
  }
}

SuccessPage.propTypes = {
  circleProgressPercent: PropTypes.number.isRequired,
};

export default SuccessPage;
