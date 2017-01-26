import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import AuthService from '../utils/AuthService';

export default class Logout extends React.Component {
  static propTypes() {
    return {
      /*location: T.object,*/
      auth: T.instanceOf(AuthService)
    };
  }

  render () {
    const { auth } = this.props;
    return (
      <div className="root">
        <h2>Thanks for stopping by, come back soon!</h2>
        <ButtonToolbar className="toolbar">
          <button className="btn btn-primary active" onClick={auth.login.bind(this)}>Login</button>
        </ButtonToolbar>
      </div>
    );
  }
}
