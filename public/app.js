import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';
import AuthService from '../utils/AuthService';

import About from '../pages/About.jsx';
import AddPattern from '../pages/AddPattern.jsx';
import AddSupplies from '../pages/AddSupplies.jsx';
import App from '../components/App.jsx';
import Browse from '../pages/Browse.jsx';
import Contact from '../pages/Contact.jsx';
import Container from '../components/Container.js';
import Login from '../pages/Login.jsx';
import Logout from '../pages/Logout.jsx';
import Messages from '../pages/Messages.jsx';
import Nav from '../components/Nav.jsx';
import PatGen from '../pages/PatGen.jsx';
import Profile from '../pages/Profile.jsx';
import Report from '../pages/Report.jsx';
import Search from '../pages/Search.jsx';
import Update from '../pages/Update.jsx';
import ViewPatt from '../pages/ViewPatt.jsx';
import ViewSupp from '../pages/ViewSupp.jsx';

const auth = new AuthService('S068sKA2j8Jn3mYTZJSbMQf5siOn1iJn', 'mau11.auth0.com');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

// OnEnter for callback url to parse access_token
const parseAuthHash = (nextState, replace) => {
  if (nextState.location.hash) {
    auth.parseHash(nextState.location.hash);
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
      <Route path="add" component={ AddPattern } onEnter={requireAuth}/>
      <Route path="patgen" component={ PatGen } onEnter={requireAuth}/>
      <Route path="view" component={ ViewPatt } onEnter={requireAuth}/>
      <Route path="addtools" component={ AddSupplies } onEnter={requireAuth}/>
      <Route path="supplies" component={ ViewSupp } onEnter={requireAuth}/>
      <Route path="about" component={ About } auth={auth}/>
      <Route path="report" component={ Report } auth={auth}/>
      <Route path="contact" component={ Contact } auth={auth}/>
      <Route path="search" component={ Search } onEnter={requireAuth}/>
      <Route path="login" component={ Login } auth={auth}/>
      <Route path="login" onEnter={parseAuthHash}/>
      <Route path="logout" component={ Logout } auth={auth}/>
    </Route>
  </Router>,
  document.getElementById('app'));
