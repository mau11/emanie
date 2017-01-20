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
        <h3>Report Issues
        </h3>
          <div className="mainTitle">
            <img className="aboutPic" src="../img/home3.JPG"/>
            <h4>Developers, looking for a way to contribute or have a bug fix?
              <br />Please visit the Emanie github repository at: <a href="https://github.com/mau11/emanie">https://github.com/mau11/emanie</a> and create an issue.
            </h4>
          </div>
        </div>
      </div>
    );
  }
}


