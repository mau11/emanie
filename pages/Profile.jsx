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
      pattCt: 0,
      bio: null,
      profile: props.auth.getProfile(),
      authID: null,
      email: null,
      pic: '../img/defaultIcon.png',
      prompt: null
    };
    // Once user's info has been stored locally, update state
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile});
    });
  }

  // Get user's initial data from DB
  componentWillMount() {
    if(this.state.displayName !== null || this.state.craftName !== null || this.state.bio !== null){
      this.setState({prompt: "Looks like you haven't updated your profile yet..."});
      this.getProfileData();
    } else {
      this.setState({prompt: null});
      this.getAuthData();
    }
  }

  // Get auth0 ID from logged in user and add to state
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
          this.sendFirstInfo(emailAndId);
        });
      }
    }
  }

  // Add user's email and id from Auth0 login to DB
  sendFirstInfo(arr) {
    fetch('/addNew', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arr)
    });
    //this.setState({prompt: "Looks like you haven't updated your profile yet..."});
    this.getProfileData();
  }

  // Remove prompt after user set's up initial profile
 /* componentDidUpdate() {
    if(this.state.displayName !== null || this.state.craftName !== null || this.state.bio !== null){
      this.setState({prompt: null});
    }
  }*/

  // Get user's info from DB and render to page
  getProfileData(cb) {
    var test;
    var holder;
    fetch('/update', {method: 'GET'})
      .then((response) => response.json())
      .then((users) => {
        console.log('FROM SERVER', users);
        for(var i = 0; i < users.length; i++){
          for(var key in users[i]){
            if(this.state.email === users[i].email){
              this.setState({displayName: users[i].displayName});
              this.setState({craftName: users[i].craftName});
              this.setState({bio: users[i].bio});
              /*this.setState({pic: users[i].pic});*/
            }
          }
        }
      });
  }

  render () {
    const avatarSrc = this.state.pic;
    return (
      <div className="profileView">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
            <h3><b><i>{this.state.prompt}</i></b></h3>
              <img className="avatarPics" src={avatarSrc} />
              <h3><b>~{this.state.displayName}~</b></h3>
              <h4><b>Favorite Craft(s):</b> {this.state.craftName}</h4>
              <h4><b>Patterns:</b> {this.state.pattCt}</h4>
              <h4><b>Bio: </b> {this.state.bio}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


