import React from 'react';
import ReactDOM from 'react-dom';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  handleCheckbox() {
    if(this.state.checked === false){
      this.setState({checked: true});
      return true;
    } else {
      this.setState({checked: false});
      return false;
    }
  }

  handleUpdate(e) {
    e.preventDefault();
    console.log('CLICK');
  }

  getProfileData() {
  }

  render () {
    return (
      <div>
        PROFILE PAGE
        <div>
          <h4>Update Profile below
          </h4>
          <form>
            <div className="form-group">
              <label htmlFor="profilePic">Profile Image</label>
              <input type="file" className="form-control-file" id="profilePic"/>
            </div>
            <div className="form-group">
              <label htmlFor="displayName">Display Name:</label>
              <input type="email" className="form-control" id="displayName" placeholder="WILL DISPLAY CURRENT NAME"/>
            </div>
            <div className="form-group">
              <label htmlFor="craftName">Favorite Craft:</label>
              <input type="email" className="form-control" id="craftName"placeholder="Crochet, Knitting, Sewing, Everything!"/>
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio:</label>
              <textarea className="form-control" id="bio" rows="3"></textarea>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" onClick={this.handleCheckbox.bind(this)}/>
                I confirm that I have reviewed my changes.
              </label>
            </div>
            <button type="submit" className="btn btn-inverse" onClick={this.handleUpdate.bind(this)}>Update Profile</button>
          </form>
        </div>
      </div>
    );
  }
}
