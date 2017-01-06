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
        <h3>Click below to Sign up or Login</h3>
        <ButtonToolbar className="toolbar">
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    );
  }
}
