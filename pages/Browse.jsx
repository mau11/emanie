import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      hidden: [true]
    };
  }

  componentWillMount() {
    this.getAllProfiles();
  }

  // Get all users' avatar and display name.
  getAllProfiles() {
    return fetch('/api/users', {method: 'GET', mode: 'no-cors'})
      .then((response) => response.json())
      .then(allProfiles => {
        this.setState({allUsers: allProfiles})
        console.log(allProfiles);
      });
  }

  // Render more user info on click
  handleHover(e) {
    console.log('HOVER', e.target.id);
    $('div.toggle').show();
  }

  handleLeave(e) {
    $('div.toggle').hide();
  }

  render () {
    let find;
    return (
      <div >
        <div className="container">
          <h3>Browse Users</h3>
          <div className="row">{this.state.allUsers.map(user =>
            <div className="col-sm-3" key={user.displayName}>
              <img className="avatarPics" src={user.pic} id={user.id} onMouseOver={this.handleHover.bind(this)} onMouseOut={this.handleLeave.bind(this)}/><b>
              {user.displayName}</b>
              <div id={user.id} className="toggle">{user.bio}</div>
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}
