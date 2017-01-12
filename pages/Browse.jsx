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
    return fetch('/browse', {method: 'GET', mode: 'no-cors'})
      .then((response) => response.json())
      .then(allProfiles => {
        this.setState({allUsers: allProfiles})
      });
  }

  render () {
    const avatarSrc = this.state.avatarSrc;
    return (
      <div >
        <div className="container">
          <h3>Browse Users</h3>
          <div className="row">{this.state.allUsers.map(user =>
            <div className="col-sm-3" key={user.displayName}>
              <img className="avatarPics" src={user.pic}/>
              {user.displayName}
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}
