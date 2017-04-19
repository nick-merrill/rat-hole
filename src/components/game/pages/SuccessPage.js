import React from 'react';
import PropTypes from 'prop-types';

import GameData from '../../../data/GameData';
import {greenA400} from 'material-ui/styles/colors';
import CircleProgress from '../../CircleProgress';
import {RaisedButton} from 'material-ui';

class SuccessPage extends React.Component {
  render() {
    return (
      <div>
        <h3>You're doing great!</h3>
        <p>Here's how you did that round:</p>
        <CircleProgress
          percent={this.props.circleProgressPercent}
          color={greenA400} />
        <p>Are you ready to continue?</p>
        <RaisedButton label='Bring it on!' primary={true}
                      labelStyle={{fontSize: 20}}
                      buttonStyle={{
                        height: 60,
                        minWidth: window.innerWidth / 2
                      }}
                      onTouchTap={() => this.props.handleContinue()}
        />
      </div>
    );
  }
}

SuccessPage.propTypes = {
  circleProgressPercent: PropTypes.number.isRequired,
  handleContinue: PropTypes.func.isRequired,
};

export default SuccessPage;
