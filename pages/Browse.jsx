import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="">
      <h3>Browse Users</h3>
        <div className="col-sm-12">
          <div className="col-sm-12">
            <h1></h1>
          </div>
          <div className="col-sm-3">
            <div>
              <Link to="">
                <img className="defaultIcon" src="../img/defaultIcon.png" />
              </Link>USER
              <div className=""></div>
            </div>
          </div>
          <div className="col-sm-3">
            <div>
              <Link to="">
                <img className="defaultIcon" src="../img/defaultIcon.png" />
              </Link>USER
              <div className=""></div>
            </div>
          </div>
          <div className="col-sm-3">
            <div>
              <Link to="">
                <img className="defaultIcon" src="../img/defaultIcon.png" />
              </Link>USER
              <div className=""></div>
            </div>
          </div>
          <div className="col-sm-3">
            <div>
              <Link to="">
                <img className="defaultIcon" src="../img/defaultIcon.png" />
              </Link>USER
              <div className=""></div>
            </div>
          </div>
          <div className="col-sm-3">
            <div>
              <Link to="">
                <img className="defaultIcon" src="../img/defaultIcon.png" />
              </Link>USER
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
