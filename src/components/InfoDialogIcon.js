import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, FlatButton, IconButton} from 'material-ui';

class InfoDialogIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <span>
        <IconButton
          iconClassName='fa fa-info-circle'
          iconStyle={this.props.iconStyle}
          onTouchTap={() => this.setState({open: true})}
        />
        <Dialog
          title={this.props.title}
          actions={[
            <FlatButton
              label='OK'
              primary={true}
              onTouchTap={() => this.setState({open: false})}
            />
          ]}
          open={this.state.open}
        >
          {this.props.children}
        </Dialog>
      </span>
    );
  }
}

InfoDialogIcon.propTypes = {
  iconStyle: PropTypes.object,
};

InfoDialogIcon.defaultProps = {
  iconStyle: {},
};

export default InfoDialogIcon;
