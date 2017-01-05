import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <h2>Welcome to Emanie!</h2>
        <h5><i>A community for crafters to store and share their passion.</i></h5>
      </div>
    );
  }
}
