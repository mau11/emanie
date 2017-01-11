import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';
import AuthService from '../utils/AuthService';

export default class AddPattern extends React.Component {
  static propTypes() {
    return {
      auth: T.instanceOf(AuthService),
      profile: T.object
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      pattCt: 0,
      pName: null,
      pCraft: null,
      pTools: null,
      pNotes: null,
      email: null,
      authId: null,
      profile: props.auth.getProfile(),
      pattDetails: []
    };
  }

  componentWillMount() {
    this.getAuthInfo();
  }

  // Get auth0 ID & email from logged in user and add to state
  getAuthInfo() {
    var obj = this.state.profile;
    for(var key in obj){
      if(key === 'email_verified' && obj[key] === true){
        this.setState({email: obj.email}, function(){
          this.state.pattDetails.push(this.state.email);
        });
      }
      if(key === 'identities'){
        this.setState({authID: obj[key][0].user_id}, function(){
          this.state.pattDetails.push(this.state.authID);
        });
      }
    }
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

  handleAddPattern(e) {
    e.preventDefault();
    if(this.state.checked === true){
      this.addPartsToPatt(this.submitPatt);
      console.log('CLICK');
    } else {
      alert('Please confirm changes.');
    }
  }

  // Add user input to state
  addPartsToPatt(cb) {
    if(!$('#pattName').val() && !$('#pattCraft').val() && !$('#pattTools').val() && !$('#pattNotes').val()){
      alert('One field must be filled to submit.');
    } else {
      if($('#pattName').val()){
        this.state.pattDetails.push($('#pattName').val());
      } else {
        this.state.pattDetails.push('');
      }
      if($('#pattCraft').val()){
        this.state.pattDetails.push($('#pattCraft').val());
      } else {
        this.state.pattDetails.push('');
      }
      if($('#pattTools').val()){
        this.state.pattDetails.push($('#pattTools').val());
      } else {
        this.state.pattDetails.push('');
      }
      if($('#pattNotes').val()){
        this.state.pattDetails.push($('#pattNotes').val());
      } else {
        this.state.pattDetails.push('');
      }
      console.log(this.state.pattDetails);
      this.clearFields();
      cb(this.state.pattDetails);
    }
  }

  /*

  size 10 needles

Cast on 30sts
Row 1- K1P1
Row 2- P1K1
Repeat rows 1-2 until desired length.

  */

  // Add user's email and id to pattern's table in DB
  submitPatt(arr) {
    console.log('sending');
    fetch('/addPatt', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arr)
    });
  }

  clearFields(){
    this.setState({pattDetails: []});
    $('#pattName').val('');
    $('#pattCraft').val('');
    $('#pattTools').val('');
    $('#pattNotes').val('');
  }

  render () {
    return (
      <div>
        <h3>Patterns</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div>
                <h4>Add a New Pattern
                </h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="patFile">Import PDF</label>
                    <input type="file" className="form-control-file" id="patFile" name="pattPdf"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="patt">Pattern Name:</label>
                    <input type="text" className="form-control" id="pattName" placeholder="Enter pattern name"  name="pattName"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="patCra">Craft:</label>
                    <input type="text" className="form-control" id="pattCraft" placeholder="Crochet, Knitting, Sewing, etc" name="pattCraft"  />
                  </div>
                  <div className="form-group">
                    <label htmlFor="supp">Supplies:</label>
                    <input type="text" className="form-control" id="pattTools" placeholder="Hooks, Needles, Sizes, etc" name="suppName"  />
                  </div>
                  <div className="form-group">
                    <label htmlFor="notes">Notes/Details:</label>
                    <textarea className="form-control" id="pattNotes" rows="5" name="notesDetails" ></textarea>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" onClick={this.handleCheckbox.bind(this)}/> I confirm that I have reviewed my changes.
                    </label>
                  </div>
                  <button type="submit" className="btn btn-inverse" onClick={this.handleAddPattern.bind(this)}>Add Pattern</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
