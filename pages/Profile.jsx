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

  componentWillMount() {
    this.getAuthData();
  }

  // Get auth0 ID from logged in user and add to state
  getAuthData() {
    console.log(this.state.profile);
    var obj = this.state.profile;
    var emailAndId = [];
    for(var key in obj){
      if(key === 'email_verified' && obj[key] === true){
        this.setState({email: obj['email']}, function(){ emailAndId.push(this.state.email);
        });
      }
      if(obj['user_id'].indexOf('google') !== -1){
        if(key === 'identities'){
          this.setState({authID: obj[key][0].user_id}, function(){
            emailAndId.push(this.state.authID);
            this.sendFirstInfo(emailAndId);
          });
        }
      }
    }
  }

  // Add user's email and id to DB
  sendFirstInfo(arr) {
    fetch('/addNew', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arr)
    });
    this.setState({prompt: "Looks like you haven't updated your profile yet..."});
  }


  // Get profile info from DB and render to page
  initializeProfile() {
    var emailAndId = [this.state.authID, this.state.email];
    //cb(emailAndId);
    console.log(emailAndId);

    /*return fetch('/profile', {method: 'GET'})
      .then((response) => response.json())
      .then((profiles) => {
        for(var i = 0; i < profiles.length; i++){
          for(var key in profiles[i]){
            console.log('HERE', profiles[i][key]);
            if(profiles[i][identities][user_id] === this.state.authID){
              this.setState({authID: profiles[i][key].authID});
              this.setState({email: profiles[i][key].email});
              this.setState({pic: profiles[i][key].picture});
            }
          }
        }
      })
      .catch((err) => {
        console.log('Error initializing profile ---> ', err);
      });*/
    }

/*  // Check if auth0 ID matches ID in database
  checkId() {
    fetch('/callback', {method: 'GET'})
    .then((response) => response.json())
    .then((users) => {
      for(var i = 0; i < users.length; i++){
        for(var key in users[i]){
          if(users[i].identities[0].user_ID === this.state.authID){
            console.log('YES!');
          }
        }
      }
    });
  }*/


  render () {
    const avatarSrc = this.state.pic;
    return (
      <div className="profileView">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
            <h3><b><i>{this.state.prompt}</i></b></h3>
              <img className="avatarPics" src={avatarSrc} />
              <h3>Display Name: {this.state.displayName}</h3>
              <h4>Favorite Craft: {this.state.craftName}</h4>
              <h4>Pattern Count: {this.state.pattCt}</h4>
              <h4>Bio: {this.state.bio}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


