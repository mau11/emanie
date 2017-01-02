import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <Nav />
        <h2>Welcome to Emanie!</h2>
        <h4><i>A community for crafters....</i></h4>
      </div>
    );
  }
}

export default App;

