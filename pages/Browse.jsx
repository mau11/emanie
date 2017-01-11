import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      avatarSrc: '../img/defaultIcon.png'
    };
  }

  componentWillMount() {
    this.getAllProfiles();
  }

  // Get all users' avatar and display name.
  getAllProfiles(){
    return fetch('/browse', {method: 'GET'})
      .then((response) => response.json())
      .then(allProfiles => {
        this.setState({allUsers: allProfiles})
      });
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
              </Link>{user.displayName}
            </div>)})}
          </div>
        </div>
      </div>
    );
  }
}
