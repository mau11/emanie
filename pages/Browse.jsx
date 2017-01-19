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
      });
  }

  // Render more user info on click.
  handleClick(e) {
    var moreInfo = e.target.id +'bio';
    $('#'+moreInfo).toggle();
  }

  render () {
    return (
      <div >
        <div className="container">
          <h3>Browse Users
          </h3>
          <small>
            <i>Click on user's avatar see view more information.</i>
          </small>
          <div className="row">{this.state.allUsers.map(user =>
            <div className="col-sm-3" key={user.displayName}>
              <hr />
              <img className="avatarPics" src={user.pic} id={user.id} onClick={this.handleClick.bind(this)}/>
              <br />
              <b>{user.displayName}</b>
              <div id={user.id+'bio'} className="tog">{user.bio}
              </div>
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}
