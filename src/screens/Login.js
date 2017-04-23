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
import Router from '../lib/Router';
import StorageEngine from '../lib/StorageEngine';

const USER_HAS_LOGGED_IN_ONCE_KEY = 'user_has_logged_in_once';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // All we care about is the email because it tells us which user to
      // set as the current user.
      email: '',
      password: '',
      errorDialog: null,
    };
    this.storage = new StorageEngine('login');
  }

  handleEmailUpdate(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePasswordUpdate(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleLogin(event) {
    event.preventDefault(); // don't submit form the old HTML way

    let user = getUserFromEmail(this.state.email.toLowerCase());
    if (_.isNil(user)) {
      // Login failed
      this.setState({
        errorDialog: {
          title: 'No such user',
          message: 'Sorry, a user with that email does not exist.',
        }
      });
      return;
    }
    // DESIGN: We do password validation because it makes the user feel that
    //   this information is secure.
    if (this.state.password === user.password) {
      // Login succeeded
      setCurrentUser(user);
      this.props.successCallback();
      /*
      If user has logged in before, send user to the home page.
      If this is the first time the user is logging in, send user to the game
      to receive the game tutorial for instant value at fewer steps.
       */
      if (this.storage.get(USER_HAS_LOGGED_IN_ONCE_KEY)) {
        Router.goToRoute('home');
      } else {
        Router.goToRoute('game');
      }
      this.storage.set(USER_HAS_LOGGED_IN_ONCE_KEY, true);
    } else {
      this.setState({
        // TODO: Don't tell the hacker that this user even exists.
        //   This is for testing purposes currently.
        errorDialog: {
          title: 'Incorrect password',
          message: 'Sorry, that seems to be the wrong password for that user.',
        }
      });
    }
  }

  render() {
    const errorDialog = this.state.errorDialog;

    return (
      <div>
        <h1>Welcome</h1>

        <form onSubmit={this.handleLogin.bind(this)}>
          <TextField
            type='email'  // allows for no auto-correct and lower casing
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
            onChange={this.handlePasswordUpdate.bind(this)}
            floatingLabelFixed={true}
          />
          <div>
            <RaisedButton type='submit' label='Log In' primary={true}
                          style={{minWidth: 150}} />
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
                    onTouchTap={() => this.setState({errorDialog: null})} />
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
