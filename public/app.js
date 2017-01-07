import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';
import AuthService from '../utils/AuthService';


import About from '../pages/About.jsx';
import App from '../components/App.jsx';
import Browse from '../pages/Browse.jsx';
import Contact from '../pages/Contact.jsx';
import Container from '../components/Container.js';
import Layout from '../components/Layout.jsx';
import Login from '../pages/Login.jsx';
import Logout from '../pages/Logout.jsx';
import Messages from '../pages/Messages.jsx';
import Nav from '../components/Nav.jsx';
import PatGen from '../pages/PatGen.jsx';
import Profile from '../pages/Profile.jsx';
import Report from '../pages/Report.jsx';
import Search from '../pages/Search.jsx';
import Update from '../pages/Update.jsx';

const auth = new AuthService('S068sKA2j8Jn3mYTZJSbMQf5siOn1iJn', 'mau11.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={ Container } auth={auth}>
      <IndexRoute component={ App } auth={auth}/>
      <Route path="profile" component={ Profile } onEnter={requireAuth}/>
      <Route path="update" component={ Update } onEnter={requireAuth}/>
      <Route path="browse" component={ Browse } onEnter={requireAuth}/>
      <Route path="messages" component={ Messages } onEnter={requireAuth}/>
      <Route path="patgen" component={ PatGen } onEnter={requireAuth}/>
      <Route path="about" component={ About } auth={auth}/>
      <Route path="report" component={ Report } auth={auth}/>
      <Route path="contact" component={ Contact } auth={auth}/>
      <Route path="search" component={ Search } onEnter={requireAuth}/>
      <Route path="login" component={ Login } auth={auth}/>
      <Route path="logout" component={ Logout } auth={auth}/>
    </Route>
  </Router>,
  document.getElementById('app'));
