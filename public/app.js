import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Layout from '../components/Layout.jsx';
import App from '../components/App.jsx';
import Nav from '../components/Nav.jsx';
import Profile from '../components/Profile.jsx';
import Browse from '../components/Browse.jsx';
import PatGen from '../components/PatGen.jsx';
import Messages from '../components/Messages.jsx';
import About from '../components/About.jsx';
import Report from '../components/Report.jsx';
import Contact from '../components/Contact.jsx';

/*ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
     <IndexRoute component = { Nav } />
      <Route path="profile" component={ Profile } />
      <Route path="patgen" component={ PatGen } />
      <Route path="messages" component={ Messages } />
      <Route path="about" component={ About } />
      <Route path="report" component={ Report } />
      <Route path="contact" component={ Contact } />
    </Route>
  </Router>
), document.getElementById('app'));*/

ReactDOM.render(<Profile />, document.getElementById('app'));
