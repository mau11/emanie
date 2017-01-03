import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile.jsx';
import Messages from './Messages.jsx';
import PatGen from './PatGen.jsx';
import About from './About.jsx';
import Report from './Report.jsx';
import Contact from './Contact.jsx';
import Browse from './Browse.jsx';
import { IndexLink, Link } from 'react-router';


class Nav extends React.Component {
    constructor() {
    super();
    this.state = {};
  }

  render() {

    return (
      <div>
      <nav role="navigation" className="navbar navbar-inverse">
        <div className="navbar-header">
          <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <IndexLink to="/" className="navbar-brand">Home</IndexLink>
        </div>
        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/profile">myEmanie</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/patgen">PatGen</Link></li>
            <li className="dropdown">
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">More <b className="caret"></b></a>
              <ul role="menu" className="dropdown-menu">
                <li><Link to="/about">About Emanie</Link></li>
                <li><Link to="/report">Report Issues</Link></li>
                <li className="divider"></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </li>
          </ul>
          <form role="search" className="navbar-form navbar-left">
            <div className="form-group">
              <input type="text" placeholder="Search Patterns" className="form-control" />
            </div>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </nav>
      <div>
      </div>
      </div>
    );
  }
}

export default Nav;
