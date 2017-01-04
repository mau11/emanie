import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile.jsx';

export default class Update extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      displayName: null,
      craftName: null,
      bio: null
    };
  }

  getProfileData() {
    return fetch('/update', {method: 'POST'})
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        for(var i = 0; i < users.length; i++){
          for(var key in users[i]){
            this.setState({displayName: users[i].displayName});
            this.setState({craftName: users[i].craftName});
            this.setState({bio: users[i].bio});
          }
        }
        console.log(this.state.displayName);
      })
      .catch((error) => {
        console.error(error);
      });

  }

  handleCheckbox() {
    if(this.state.checked){
      this.setState({checked: false});
      return false;
    } else {
      this.setState({checked: true});
      return true;
    }
  }

  updatProfileData() {
    /*var newDisplayName = $('#display').val();
    var newCraftName = $('#craft').val();
    var newBio = $('#blurb').val();
    this.setState({
      displayName: newDisplayName,
      craftName: newCraftName,
      bio: newBio
    }, function(){
      console.log(this.state.displayName);
    });*/
  }

  handleUpdate(e) {
    e.preventDefault();
    this.getProfileData();
    if(this.state.checked === true){
      console.log('CLICK');
      this.updatProfileData();
    } else {
      alert('Please confirm changes.');
    }
  }

  onDisplay(e) {
    this.setState({
      displayName: e.target.value
    });
  }

  onCraft(e) {
    this.setState({
      craftName: e.target.value
    });
  }

  onBio(e) {
    this.setState({
      bio: e.target.value
    });
  }

  render () {
    return (
      <div>
        <div>
          <h4>Update Profile below
          </h4>
          <form action="/updateForm" method="post">
            <div className="form-group">
              <label htmlFor="pic">Profile Image</label>
              <input type="file" className="form-control-file" id="pic" />
            </div>
            <div className="form-group">
              <label htmlFor="display">Display Name:</label>
              <input type="text" className="form-control" id="display" placeholder="Enter new display name" onChange={this.onDisplay.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="craft">Favorite Craft:</label>
              <input type="text" className="form-control" id="craft" placeholder="Crochet, Knitting, Sewing...Everything!" name="craftName" onChange={this.onCraft.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="blurb">Bio:</label>
              <textarea className="form-control" id="blurb" rows="3" name="bio" onChange={this.onBio.bind(this)}></textarea>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" onClick={this.handleCheckbox.bind(this)}/>
                I confirm that I have reviewed my changes.
              </label>
            </div>
            <button type="submit" className="btn btn-inverse" onClick={this.handleUpdate.bind(this)}>Update Profile</button>
          </form>
          <br />
          <p>Preview:</p>
          <div>
            <h3>Display Name: {this.state.displayName}</h3>
            <h4>Favorite Craft: {this.state.craftName}</h4>
            <h4>Bio: {this.state.bio}</h4>
          </div>
        </div>
      </div>
    );
  }
}
