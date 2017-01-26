import React from 'react';
import { IndexLink, Link } from 'react-router';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    // There is a bug here, function renders multiple forms, each time page is visited
    (function(d, t){
      var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
      g.src = "http://www.foxyform.com/js.php?id=845120&sec_hash=1d3572990c1&width=500px";
      s.parentNode.insertBefore(g, s);
    }(document, "script"));

    return (
      <div>
        <div className="container">
        <h3>Contact Emanie
        </h3>
          <div className="mainTitle">
            <h4>Questions, Comments, Suggestions?
            </h4>
            <h5>Please use the form below to contact Emanie.
            <br />If you'd like to report a concern or bug, please head over to the
              <Link to="report"> Report Issues
              </Link> page.
            </h5>
            <a id="foxyform_embed_link_845120" href="http://www.foxyform.com/">foxyform</a>
          </div>
        </div>
      </div>
    );
  }
}
