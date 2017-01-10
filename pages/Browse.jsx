import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [1,2,3,4],
      avatarSrc: '../img/defaultIcon.png'
    };
  }

  getAllProfiles(){

  }

  render () {
    const avatarSrc = this.state.avatarSrc;
    return (
      <div >
        <h3>Browse Users</h3>
        <div className="container">
          <div className="row">{this.state.allUsers.map(user => { return (
            <div className="col-sm-3">
              <Link to="">
                <img className="avatarPics" src={avatarSrc} />
              </Link>USER
            </div>)})}
          </div>
        </div>
      </div>
    );
  }
}
