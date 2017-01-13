import React from 'react';
import ReactDOM from 'react-dom';

export default class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <div className="container">
        <h3>Report Issues</h3>
        <h5>Please report any issues with Emanie below
        </h5>
        <h5>Web developers looking to contribute or have a bug fix? Please visit the git repository here: <a href="https://github.com/mau11/emanie">Emanie on GitHub</a>
        </h5>
        </div>
      </div>
    );
  }
}


