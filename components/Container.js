import React, { PropTypes as T } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Nav from './Nav.jsx';

export default class Container extends React.Component {

  render () {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      });
    }
    return (
      <div>
        <h1>Emanie</h1>
          <Nav />
          {children}
      </div>
    );
  }
}

