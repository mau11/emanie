import React from 'react';
import ReactDOM from 'react-dom';

export default class Messages extends React.Component {
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
      profile: props.auth.getProfile(),
      authID: null,
      email: null,
      pic: '../img/defaultIcon.png',
      checked: false,
      allMessages: null
    };
  }

  componentWillMount() {
    //this.getMessages
  }

  // Get auth0 ID & email from logged in user and add to state
  getAuthInfo() {
    var obj = this.state.profile;
    //var emailAndId = [];
    for(var key in obj){
      if(key === 'email_verified' && obj[key] === true){
        this.setState({email: obj.email}, function(){
        });
      }
      if(key === 'identities'){
        this.setState({authId: obj[key][0].user_id}, function(){
        });
      }
    }
    //this.getUserPatterns();
  }

  getMessages() {

  }

  //$('id or class').val()

  render () {
    return (
      <div className="container">
        <div className="form-group">
          <canvas className="form-control" >
          </canvas>
          <hr />
          <input ></input>
          <button type="submit" className="btn btn-inverse">Submit</button>
        </div>
      </div>
    );
  }
}

