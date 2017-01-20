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
        this.setState({email: obj.email}, function(){
          emailAndId.push(this.state.email);
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
    fetch('/api/users/add', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(arr)
    });
  }

  // Get user's info from DB
  getProfileData(cb) {
    var test;
    var holder;
    fetch('/api/users/all', {method: 'GET'})
      .then((response) => response.json())
      .then((users) => {
        for(var i = 0; i < users.length; i++){
          for(var key in users[i]){
            if(this.state.email === users[i].email){
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
              this.setState({pic: users[i].pic});
              var selected = $("input[name='pics']:checked").val();
              if(selected === 'pic1'){
                this.setState({pic: '../img/lightGrey.JPG'});
              } else if(selected === 'pic2'){
                this.setState({pic: '../img/perfectPink.jpg'});
              } else if(selected === 'pic3'){
                this.setState({pic: '../img/lightBlue.JPG'});
              } else if(selected === 'pic4'){
                this.setState({pic: '../img/realTeal.JPG'});
              } else if(selected === 'pic5'){
                this.setState({pic: '../img/paleYellow.JPG'});
              } else if(selected === 'pic6'){
                this.setState({pic: '../img/defaultIcon.png'});
              }
            }
          }
        }
        if(holder !== undefined){
          users[holder].pic = this.state.pic;
          users[holder].displayName = this.state.displayName;
          users[holder].craftName = this.state.craftName;
          users[holder].bio = this.state.bio;
          this.setState({allUsers: users});
          test = users[holder];
          console.log('TO SERVER modified', test);
          cb(test);
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
    fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param)
    });
    console.log('sending');
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

  handlePic1() {
    this.setState({pic: '../img/lightGrey.JPG'});
  }

  handlePic2() {
    this.setState({pic: '../img/perfectPink.jpg'});
  }

  handlePic3() {
    this.setState({pic: '../img/lightBlue.JPG'});
  }

  handlePic4() {
    this.setState({pic: '../img/realTeal.JPG'});
  }

  handlePic5() {
    this.setState({pic: '../img/paleYellow.JPG'});
  }

  handlePic6() {
    this.setState({pic: '../img/defaultIcon.png'});
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
        <h3>Edit Profile
        </h3>
        <div className="container">
        <h6>
          <i>Leave fields blank where no changes are desired.</i>
        </h6>
          <div className="row">
            <div className="col-sm-6">
              <div>
                <form>
                <label>Select profile image:</label>
                <div className="form-group">
                  <div className="col-xs-2" >
                    <img src='../img/lightGrey.JPG' className="avatarSmPics"/>
                    <input type="radio" value="pic1" onClick={this.handlePic1.bind(this)} name="pics"/>
                  </div>
                  <div className="col-xs-2" >
                    <img src='../img/perfectPink.jpg' className="avatarSmPics"/>
                    <input type="radio" value="pic2" onClick={this.handlePic2.bind(this)} name="pics"/>
                  </div>
                  <div className="col-xs-2" >
                    <img src='../img/lightBlue.JPG' className="avatarSmPics"/>
                    <input type="radio" value="pic3" onClick={this.handlePic3.bind(this)} name="pics"/>
                  </div>
                  <div className="col-xs-2" >
                    <img src='../img/realTeal.JPG' className="avatarSmPics"/>
                    <input type="radio" value="pic4" onClick={this.handlePic4.bind(this)} name="pics"/>
                  </div>
                  <div className="col-xs-2" >
                    <img src='../img/paleYellow.JPG' className="avatarSmPics"/>
                    <input type="radio" value="pic5" onClick={this.handlePic5.bind(this)} name="pics"/>
                  </div>
                  <div className="col-xs-2" >
                    <img src='../img/defaultIcon.png' className="avatarSmPics"/>
                    <input type="radio" value="pic6" onClick={this.handlePic6.bind(this)} name="pics"/>
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
              <h5><i>Preview:</i>
              </h5>
              <div className="mainTitle">
                <img className="avatarPics" src={this.state.pic} />
                <h3><b>~{this.state.displayName}~</b></h3>
                <h4><b>Favorite Craft(s):</b> {this.state.craftName}</h4>
                <h4><b>Bio: </b> {this.state.bio}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

