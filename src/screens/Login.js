import _ from 'lodash';

import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  getUserFromEmail,
  setCurrentUser,
} from '../data/users';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // All we care about is the email because it tells us which user to
      // set as the current user.
      email: '',
    };
  }

  handleEmailUpdate(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleLogin() {
    let user = getUserFromEmail(this.state.email);
    console.log(user);
    if (_.isNil(user)) {
      // Login failed
      alert('No such user :(');
    } else {
      // Login succeeded
      setCurrentUser(user);
      this.props.successCallback();
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome</h1>

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
        <RaisedButton type='submit' label='Log In' fullWidth={true}
                      primary={true} onClick={this.handleLogin.bind(this)} />
        <RaisedButton label='Sign Up' fullWidth={true} secondary={true}
                      href='/'/>
      </div>
    );
  }
}

Login.propTypes = {
  successCallback: PropTypes.func.isRequired,
};

export default Login;
