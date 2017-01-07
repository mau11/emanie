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

  //

  // Verify user id after login
 /* checkId() {
    fetch('/update', {method: 'GET'} );
  }*/

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
    return (
      <div>
      <h3 onClick={this.getProfileData.bind(this)}>Display Name: {this.state.displayName}</h3>
      <h4>Favorite Craft: {this.state.craftName}</h4>
      <h4>Bio: {this.state.bio}</h4>
      <h4></h4>
      </div>
    );
  }
}
