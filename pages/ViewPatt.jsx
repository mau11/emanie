import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class ViewPatt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPatts: [],
      email: null,
      authId: null,
      profile: props.auth.getProfile(),
      prompt: null,
    };
  }

  componentWillMount() {
    this.getAuthInfo();
  }

  // Get auth0 ID & email from logged in user and add to state
  getAuthInfo() {
    var obj = this.state.profile;
    var emailAndId = [];
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
    this.getUserPatterns();
  }

  // Get all users' avatar and display name.
  getUserPatterns(){
    return fetch('/viewPatt', {method: 'GET'})
      .then((response) => response.json())
      .then(allPatterns => {
        for(var i = 0; i < allPatterns.length; i++){
          for(var key in allPatterns[i]){
            if(allPatterns[i].email === this.state.email && allPatterns[i].authId === this.state.authId){
              this.setState({allPatts: allPatterns});
            } else {
              this.setState({prompt: "Looks like you don't have any patterns yet, add some above!"})
            }
          }
        }
      });
  }

  render () {
    return (
      <div >
        <h3>Patterns</h3>
        <div className="container">
          <div className="row">
          <div className="container">
            <h4> Sort by:
            </h4>
          <div className="btn-toolbar">

            <button className="btn btn-inverse">Pattern Name A-Z</button>
            <button className="btn btn-inverse">Craft </button>
            <button className="btn btn-inverse">Craft </button>
            <button className="btn btn-inverse">Craft </button>
          </div>
        </div>
        </div>
         {this.state.prompt}{this.state.allPatts.map(patt => {
          return [
          <div>
            <h4><b>Pattern Name:</b> {patt.pName}</h4>
            <h4><b>Craft:</b> {patt.craft}</h4>
            <h4><b>Supplies:</b> {patt.tools}</h4>
            <h4><b>Notes: </b> {patt.notes}</h4>
            <hr />
          </div>]})}
        </div>
      </div>
    );
  }
}
