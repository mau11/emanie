import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import AuthService from '../utils/AuthService';


export default class Login extends React.Component {
  static propTypes() {
    return {
      location: T.object,
      auth: T.instanceOf(AuthService)
    };
  }

  render () {
    const { auth } = this.props;
    return (
      <div className="root">
        <h2>Welcome to Emanie</h2><span className="userName"></span>
        <img id="userAvatar"/>
        <ButtonToolbar className="toolbar">
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    );
  }
}
