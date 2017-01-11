import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import AuthService from '../utils/AuthService';

export default class Update extends React.Component {
  static propTypes() {
    return {
      auth: T.instanceOf(AuthService),
      profile: T.object
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      craftName: null,
      pattCt: 0,
      bio: null,
      profile: props.auth.getProfile(),
      authID: null,
      email: null,
      pic: '../img/defaultIcon.png',
      prompt: null,
      checked: false,
      allUsers: null
    };
  }

  componentWillMount() {
    this.getAuthData();
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
  }

  // Get user's info from DB
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
            //console.log('EMAIL--->', users[i].email);
              holder = i;
              this.setState({displayName: users[i].displayName});
              if($('#display').val()){
                var dis = $('#display').val();
                this.setState({displayName: dis});
              }
              this.setState({craftName: users[i].craftName});
              if($('#craft').val()){
                var newCraftName = $('#craft').val();
                this.setState({craftName:newCraftName});
              }
              this.setState({bio: users[i].bio});
              if($('#blurb').val()){
                var newBio = $('#blurb').val();
                this.setState({bio: newBio});
              }
              //this.setState({})
              /*this.setState({pic: users[i].pic});
              if($('#pic').val()){
                var newBio = $('#pic').val();
                this.setState({pic: newBio});
              }*/
            }
          }
          if(holder !== undefined){
            //users[i].pic = this.state.pic;
            users[holder].displayName = this.state.displayName;
            users[holder].craftName = this.state.craftName;
            users[holder].bio = this.state.bio;
            users[holder].pattCt = this.state.pattCt;
            this.setState({allUsers: users});
            test = users[holder];
            console.log('TO SERVER modified', users);
            cb(test);
          }
        }
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

  updateProfileData(param) {
    console.log('PARAM', param);
    fetch('/update', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param)
    });
    console.log('sending');
    //this.getProfileData(function(val){console.log('SENT UPDATED TO DB:', val);}).bind(this);
  }

  handleUpdate(e) {
    e.preventDefault();
    if(this.state.checked === true){
      this.getProfileData(this.updateProfileData);
      console.log('CLICK');
      //this.updateProfileData();
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
      const avatarSrc = this.state.pic;
    return (
      <div>
        <h3>Edit Profile
        </h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div>
                <form /*action="/updateForm" method="post"*/>
                <label>Select profile image:</label>
                <div className="form-group">
                  <div className="col-xs-3" >
                    <img src={avatarSrc} className="avatarSmPics"/>
                    <input type="radio"/>
                  </div>
                  <div className="col-xs-3" >
                    <img src={avatarSrc} className="avatarSmPics"/>
                    <input type="radio"/>
                  </div>
                  <div className="col-xs-3" >
                    <img src={avatarSrc} className="avatarSmPics"/>
                    <input type="radio" value="Default"/>
                </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="display">Display Name:</label>
                    <input type="text" className="form-control" id="display" placeholder="Enter new display name" onChange={this.onDisplay.bind(this)} name="display"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="craft">Favorite Craft(s):</label>
                    <input type="text" className="form-control" id="craft" placeholder="Crochet, Knitting, Sewing...Everything!" name="craft" onChange={this.onCraft.bind(this)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="blurb">Bio:</label>
                    <textarea className="form-control" id="blurb" rows="3" name="bio" onChange={this.onBio.bind(this)}></textarea>
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
            <div className="mainTitle">
              <img className="avatarPics" src={avatarSrc} />
              <h3><b>~{this.state.displayName}~</b></h3>
              <h4><b>Favorite Craft(s):</b> {this.state.craftName}</h4>
              <h4><b>Patterns:</b> {this.state.pattCt}</h4>
              <h4><b>Bio: </b> {this.state.bio}</h4>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

