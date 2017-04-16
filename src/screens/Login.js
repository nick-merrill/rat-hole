import _ from 'lodash';

import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  getUserFromEmail,
  setCurrentUser,
} from '../data/users';
import {Dialog, FlatButton} from 'material-ui';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // All we care about is the email because it tells us which user to
      // set as the current user.
      email: '',
      errorDialog: null,
    };
  }

  handleEmailUpdate(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleLogin(event) {
    event.preventDefault(); // don't submit form the old HTML way

    let user = getUserFromEmail(this.state.email);
    if (_.isNil(user)) {
      // Login failed
      this.setState({
        errorDialog: {
          title: 'No such user',
          message: 'Sorry, a user with that email does not exist.',
        }
      });
    } else {
      // Login succeeded
      setCurrentUser(user);
      this.props.successCallback();
    }
  }

  render() {
    const errorDialog = this.state.errorDialog;

    return (
      <div>
        <h1>Welcome</h1>

        <form onSubmit={this.handleLogin.bind(this)}>
          <TextField
            hintText='Email'
            floatingLabelText='Email'
            floatingLabelFixed={true}
            onChange={this.handleEmailUpdate.bind(this)}
            value={this.state.email}
          />
          <TextField
            type='password'
            hintText='Password'
            floatingLabelText='Password'
            floatingLabelFixed={true}
          />
          <div>
            <RaisedButton type='submit' label='Log In' primary={true} />
          </div>
          <div>
            <FlatButton type='submit' label='Sign Up' secondary={true} />
          </div>
        </form>

        <Dialog open={!!errorDialog}
                modal={true}
                title={errorDialog && errorDialog.title}
                actions={[
                  <FlatButton
                    label='OK'
                    primary={true}
                    onTouchTap={() => this.setState({errorDialog: null})}/>
                ]}>
          {errorDialog && errorDialog.message}
        </Dialog>
      </div>
    );
  }
}

Login.propTypes = {
  successCallback: PropTypes.func.isRequired,
};

export default Login;
