import React from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <h1>Emanie</h1>
        <Nav />
          {this.props.children}
        <Footer />
      </div>
    );
  }
}
