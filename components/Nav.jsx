import ReactDOM from 'react-dom';
import React, { PropTypes as T } from 'react';

import About from '../pages/About.jsx';
import AddPattern from '../pages/AddPattern.jsx';
import Browse from '../pages/Browse.jsx';
import Contact from '../pages/Contact.jsx';
import Login from '../pages/Login.jsx';
import Logout from '../pages/Logout.jsx';
import Messages from '../pages/Messages.jsx';
import PatGen from '../pages/PatGen.jsx';
import Profile from '../pages/Profile.jsx';
import Report from '../pages/Report.jsx';
import Search from '../pages/Search.jsx';
import Update from '../pages/Update.jsx';
import ViewPatt from '../pages/ViewPatt.jsx';

import { IndexLink, Link } from 'react-router';
import AuthService from '../utils/AuthService';


export default class Nav extends React.Component {
  static contextTypes() {
    return {
      router: T.object
    };
  }

  static propTypes() {
    return {
      auth: T.instanceOf(AuthService)
    };
  }

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { auth } = this.props;
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
            <li className="dropdown">
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">Patterns <b className="caret"></b></a>
              <ul role="menu" className="dropdown-menu">
                <li><Link to="view">View All</Link></li>
                <li><Link to="add">Add New</Link></li>
                <li><Link to="patgen">PatGen</Link></li>
              </ul>
            </li>
            <li><Link to="browse">Browse Users</Link></li>
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
              <button type="submit" className="btn btn-inverse">Search</button>
            </div>
          </form>
          <ul className="nav navbar-nav navbar-right" id="togLogin" onClick={auth.login.bind(this)}>
            <li><Link to="">Login</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right" id="togLogout">
            <li><Link to="logout" onClick={this.logout.bind(this)}>Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
      </div>
    );
  }
}
