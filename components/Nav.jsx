import React from 'react';
import ReactDOM from 'react-dom';

import About from '../pages/About.jsx';
import Browse from '../pages/Browse.jsx';
import Contact from '../pages/Contact.jsx';
import Messages from '../pages/Messages.jsx';
import PatGen from '../pages/PatGen.jsx';
import Profile from '../pages/Profile.jsx';
import Report from '../pages/Report.jsx';
import Search from '../pages/Search.jsx';
import Update from '../pages/Update.jsx';

import { IndexLink, Link } from 'react-router';


export default class Nav extends React.Component {
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
            <li className="dropdown">
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">myEmanie <b className="caret"></b></a>
              <ul role="menu" className="dropdown-menu">
                <li><Link to="profile">View Profile</Link></li>
                <li><Link to="update">Update Profile</Link></li>
              </ul>
            </li>
            <li><Link to="messages">Messages</Link></li>
            <li><Link to="patgen">PatGen</Link></li>
            <li><Link to="browse">Browse</Link></li>
            <li className="dropdown">
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">More <b className="caret"></b></a>
              <ul role="menu" className="dropdown-menu">
                <li><Link to="about">About Emanie</Link></li>
                <li><Link to="report">Report Issues</Link></li>
                <li className="divider"></li>
                <li><Link to="contact">Contact Us</Link></li>
              </ul>
            </li>
          </ul>
          <form role="search" className="navbar-form navbar-left">
            <div className="form-group">
              <input type="text" placeholder="Search Patterns" className="form-control" />
            </div>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="login">Login</Link></li>
          </ul>
        </div>
      </nav>
      </div>
    );
  }
}
