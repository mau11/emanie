import ReactDOM from 'react-dom';
import React, { PropTypes as T } from 'react';

import About from '../pages/About.jsx';
import AddPattern from '../pages/AddPattern.jsx';
import AddSupplies from '../pages/AddSupplies.jsx';
import Browse from '../pages/Browse.jsx';
import Contact from '../pages/Contact.jsx';
import Login from '../pages/Login.jsx';
import Logout from '../pages/Logout.jsx';
import PatGen from '../pages/PatGen.jsx';
import Profile from '../pages/Profile.jsx';
import Report from '../pages/Report.jsx';
import Search from '../pages/Search.jsx';
import Update from '../pages/Update.jsx';
import ViewPatt from '../pages/ViewPatt.jsx';
import ViewSupp from '../pages/ViewSupp.jsx';

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
    this.state = {
      searching: this.ref,
    };
  }

  logout() {
    this.props.auth.logout();
  }

  handleSearch(e){
    e.preventDefault();
    window.location = '/#/search';
  }

  render() {
    const {auth} = this.props;

    // Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-86318856-3', 'auto');
    ga('send', 'pageview');

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
            <IndexLink to="/" className="navbar-brand">Home
            </IndexLink>
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
              <li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">Patterns <b className="caret"></b></a>
                <ul role="menu" className="dropdown-menu">
                  <li><Link to="view">View All</Link></li>
                  <li><Link to="add">Add Patterns</Link></li>
                  <li><Link to="patgen">PatGen</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">Supplies <b className="caret"></b></a>
                <ul role="menu" className="dropdown-menu">
                  <li><Link to="supplies">View All</Link></li>
                  <li><Link to="addtools">Add Tools/Yarn</Link></li>
                </ul>
              </li>
              <li><Link to="browse">Browse Users</Link></li>
              <li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">More <b className="caret"></b></a>
                <ul role="menu" className="dropdown-menu">
                  <li><Link to="about">About Emanie</Link></li>
                  <li><Link to="contact">Contact Us</Link></li>
                  <li className="divider"></li>
                  <li><Link to="report">Report Issues</Link></li>
                </ul>
              </li>
            </ul>
            <form role="search" className="navbar-form navbar-left">
              <div className="form-group">
                <input type="text" placeholder="Search Patterns" id="searchInput" className="form-control"/>
                <button type="submit" className="btn btn-inverse" onClick={this.handleSearch.bind(this)}>Search</button>
              </div>
            </form>
            { this.props.auth.loggedIn() ?
            <ul className="nav navbar-nav navbar-right" id="togLogout">
              <li><Link to="logout" onClick={this.logout.bind(this)}>Logout</Link>
              </li>
            </ul> :
            <ul className="nav navbar-nav navbar-right" id="togLogin" onClick={auth.login.bind(this)}>
              <li><Link to="">Login</Link></li>
            </ul>}
          </div>
        </nav>
      </div>
    );
  }
}
