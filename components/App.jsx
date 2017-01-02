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
        <Nav /> TEST
      </div>
    );
  }
}

export default App;

