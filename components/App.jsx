import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile.jsx';
import Browse from './Browse.jsx';
import PatGen from './PatGen.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <nav role="navigation" className="navbar navbar-inverse">
        <div className="navbar-header">
          <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a href="#" className="navbar-brand">Home</a>
        </div>
        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><a href="#">myEmanie</a></li>
            <li><a href="#">Messages</a></li>
            <li><a href="#">PatGen</a></li>
            <li><a href="#">Messages</a></li>
            <li className="dropdown">
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">More <b className="caret"></b></a>
              <ul role="menu" className="dropdown-menu">
                <li><a href="#">About Emanie</a></li>
                <li><a href="#">Report Issues</a></li>
                <li className="divider"></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </li>
          </ul>
          <form role="search" className="navbar-form navbar-left">
            <div className="form-group">
              <input type="text" placeholder="Search Patterns" className="form-control" />
            </div>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Login</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default App;

