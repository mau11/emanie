import React from 'react';
import ReactDOM from 'react-dom';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      displayName: null,
      craftName: null,
      bio: null,
      id: null,
      authoID: null
    };
  }

 checkId() {
    fetch('/callback', {method: 'GET'})
    .then((response) => response.json())
    .then((users) => {
      for(var i = 0; i < users.length; i++){
        for(var key in users[i]){
          if(users[i].identities[0].user_ID === this.state.id){
            console.log('YES!');
          }
        }
      }
    });
  }

  // Retrieve profile information from database
  getProfileData() {
    return fetch('/update', {method: 'GET'})
      .then((response) => response.json())
      .then((users) => {
        for(var i = 0; i < users.length; i++){
          for(var key in users[i]){
            if('knit/crochet' === users[i].craftName){
              this.setState({displayName: users[i].displayName});
              this.setState({craftName: users[i].craftName});
              this.setState({bio: users[i].bio});
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.getProfileData();
  }

  render () {
    // temporary until image is pulled from db or autho0
    let avatarSrc ='https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png';
    return (
      <div className="profileView">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <img className="avatarPics" src={avatarSrc}/>
              <h3>Display Name: {this.state.displayName}</h3>
              <h4>Favorite Craft: {this.state.craftName}</h4>
              <h4>Bio: {this.state.bio}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


