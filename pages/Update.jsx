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
      bio: null,
      id: 1
    };
  }

  // Gets all data in db
  getProfileData() {
    return fetch('/update', {method: 'GET'})
      .then((response) => response.json())
      .then((users) => {
        for(var i = 0; i < users.length; i++){
          for(var key in users[i]){
            if(this.state.id === users[i].id){
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

  handleCheckbox() {
    if(this.state.checked){
      this.setState({checked: false});
      return false;
    } else {
      this.setState({checked: true});
      return true;
    }
  }

  updateProfileData() {
    console.log('running');
    // Create new table if does not exist
    fetch('/updates/', {method: 'POST'})
      .then((response) => console.log(response))
      .then((info) => {
        console.log('INFO', info);
      })
    // Check if user is already in table
    // Save new data to db
    fetch('/update', {method: 'PUT'})
      .then((response) => console.log('PUT', response))
      .then((users) => {
        console.log(users);
        for(var a = 0; a < users.length; a++){
          console.log('hiiiiiiiii');
          for(var key2 in users[a]){
            console.log('hi');
            if(this.state.id === users[a].id){
              console.log('TEXT TYPED', $('#display').val());
              if($('#display').val()){
                var dis = $('#display').val();
                this.setState({displayName: dis});
              }
              if($('#craft').val()){
                var newCraftName = $('#craft').val();
                this.setState({craftName:newCraftName});
              }
              if($('#blurb').val()){
                var newBio = $('#blurb').val();
                this.setState({bio: newBio});
              }
              users[a].displayName = this.state.displayName;
              users[a].craftName = this.state.craftName;
              users[a].bio = this.state.bio;
            }
          }
        }
        //call getProfileData again to update page
        this.getProfileData();
        console.log(this.state.displayName);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleUpdate(e) {
    e.preventDefault();
    if(this.state.checked === true){
      console.log('CLICK');
      this.updateProfileData();
    } else {
      alert('Please confirm changes.');
    }
  }

  // Allows user to preview changes as they type
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
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div>
                <h5>Update Profile below
                </h5>
                <form action="/updateForm" method="post">
                  <div className="form-group">
                    <label htmlFor="pic">Profile Image</label>
                    <input type="file" className="form-control-file" id="pic" name="picName"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="display">Display Name:</label>
                    <input type="text" className="form-control" id="display" placeholder="Enter new display name" onChange={this.onDisplay.bind(this)} name="display"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="craft">Favorite Craft:</label>
                    <input type="text" className="form-control" id="craft" placeholder="Crochet, Knitting, Sewing...Everything!" name="craft" onChange={this.onCraft.bind(this)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="blurb">Bio:</label>
                    <textarea className="form-control" id="bio" rows="3" name="bio" onChange={this.onBio.bind(this)}></textarea>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" onClick={this.handleCheckbox.bind(this)}/> I confirm that I have reviewed my changes.
                    </label>
                  </div>
                  <button type="submit" className="btn btn-inverse" onClick={this.handleUpdate.bind(this)}>Update Profile</button>
                </form>
              </div>
            </div>
            <div className="col-sm-6">
            <h5><i>Preview:</i></h5>
            <div>
              <h3>Display Name: {this.state.displayName}</h3>
              <h4>Favorite Craft: {this.state.craftName}</h4>
              <h4>Bio: {this.state.bio}</h4>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
