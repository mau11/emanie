import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    let avatarSrc ='https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png';
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
                <img className="avatarPics" src={avatarSrc} />
              </Link>USER
              <div className=""></div>
            </div>
          </div>
          <div className="col-sm-3">
            <div>
              <Link to="">
                <img className="avatarPics" src={avatarSrc} />
              </Link>USER
              <div className=""></div>
            </div>
          </div>
          <div className="col-sm-3">
            <div>
              <Link to="">
                <img className="avatarPics" src={avatarSrc} />
              </Link>USER
              <div className=""></div>
            </div>
          </div>
          <div className="col-sm-3">
            <div>
              <Link to="">
                <img className="avatarPics" src={avatarSrc} />
              </Link>USER
              <div className=""></div>
            </div>
          </div>
          <div className="col-sm-3">
            <div>
              <Link to="">
                <img className="avatarPics" src={avatarSrc} />
              </Link>USER
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
