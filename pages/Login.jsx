import React, { PropTypes as T } from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AuthService from '../utils/AuthService';


export default class Login extends React.Component {
  static propTypes() {
    return {
      //location: T.object,
      auth: T.instanceOf(AuthService)
    };
  }

  googleLogin() {
    this.props.auth.login({
      connection: 'google-oauth2'
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // on form submit, sends the credentials to auth0 api
    this.props.auth.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  render () {
    const { auth } = this.props;
    return (
      <div className="root">
        <h2>Please login to continue</h2>
        <ButtonToolbar className="toolbar">
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    );
  }
}
