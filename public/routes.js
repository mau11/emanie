import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';


import About from '../pages/About.jsx';
import App from '../components/App.jsx';
import Browse from '../pages/Browse.jsx';
import Contact from '../pages/Contact.jsx';
import Layout from '../components/Layout.jsx';
import Messages from '../pages/Messages.jsx';
import Nav from '../components/Nav.jsx';
import PatGen from '../pages/PatGen.jsx';
import Profile from '../pages/Profile.jsx';
import Report from '../pages/Report.jsx';
import Search from '../pages/Search.jsx';
import Update from '../pages/Update.jsx';


ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={ Layout }>
      <IndexRoute component={ App } />
      <Route path="profile" component={ Profile } />
      <Route path="update" component={ Update } />
      <Route path="browse" component={ Browse } />
      <Route path="messages" component={ Messages } />
      <Route path="patgen" component={ PatGen } />
      <Route path="about" component={ About } />
      <Route path="report" component={ Report } />
      <Route path="contact" component={ Contact } />
      <Route path="search" component={ Search } />
    </Route>
  </Router>,
  document.getElementById('app'));
