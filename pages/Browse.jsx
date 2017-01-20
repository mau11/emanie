import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class Browse extends React.Component {
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
  constructor(props) {
    super(props);
    this.state = {
      profile: props.auth.getProfile(),
      allUsers: [],
      email: null,
      authID: null
    };
  }

  componentWillMount() {
    this.getAuthData();
  }

  // Get auth0 ID from logged in user and add to state
  getAuthData() {
    console.log('1');
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

  // Add user's email and id from Auth0 login to DB
  sendFirstInfo(arr) {
    console.log('2');
    fetch('/api/users/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arr)
    })
    .then(this.getAllProfiles())
    .catch(function(err){
      if(err){
        throw err;
      }
    });
  }

  // Get all users' avatar and display name.
  getAllProfiles() {
    console.log('3');
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
            <i>Click on user's image to view more information.</i>
          </small>
          <div className="row">{this.state.allUsers.map(user =>
            <div className="col-sm-3" key={user.id}>
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
