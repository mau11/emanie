import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import AuthService from '../utils/AuthService';

export default class Profile extends React.Component {
  static contextTypes() {
    return {
      profile: T.object
    };
  }
  static propTypes() {
    return {
      auth: T.instanceOf(AuthService)
    };
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayName: null,
      craftName: null,
      bio: null,
      profile: props.auth.getProfile(),
      authID: null,
      email: null,
      pic: null
    };
    // Once user's info has been stored locally, update state
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile});
    });
  }

  componentDidMount() {
    this.getAuthData();
  }

  // Get auth0 ID from logged in user and add to state.
  getAuthData() {
    var obj = this.state.profile;
    var emailAndId = [];
    for(var key in obj){
      if(key === 'email_verified' && obj[key] === true){
        this.setState({email: obj.email}, function(){ emailAndId.push(this.state.email);
        });
      }
      if(key === 'identities'){
        this.setState({authID: obj[key][0].user_id}, function(){
          emailAndId.push(this.state.authID);
          if(emailAndId.length === 2){
            this.sendFirstInfo(emailAndId);
          }
        });
      }
    }
  }

  // Add user's email and id from Auth0 login to DB.
  sendFirstInfo(arr) {
    fetch('/api/users/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arr)
    })
    .then(this.getProfileData())
    .catch(function(err){
      if(err){
        throw err;
      }
    });
  }

  // Get user's info from DB and render to page
  getProfileData() {
    return fetch('/api/users/all', {method: 'GET'})
      .then((response) => response.json())
      .then((users) => {
        for(var i = 0; i < users.length; i++){
          for(var key in users[i]){
            if(this.state.email === users[i].email){
              this.setState({displayName: users[i].displayName});
              this.setState({craftName: users[i].craftName});
              this.setState({bio: users[i].bio});
              this.setState({pic: users[i].pic});
            }
          }
        }
      });
  }

  render () {
    const avatarSrc = this.state.pic;
    return (
      <div className="mainTitle">
        <div className="container">
          <div className="profileView">
            <img className="avatarPics" src={avatarSrc} />
            <h3>
              <b>~{this.state.displayName}~</b>
            </h3>
            <h4>
              <b>Favorite Craft(s):</b> {this.state.craftName}
            </h4>
            <h4>
              <b>Bio: </b> {this.state.bio}
            </h4>
          </div>
        </div>
      </div>
    );
  }
}


