import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
      <Nav />
        PROFILE PAGE
        <div>
          <h4>Update Profile below
          </h4>
          <form>
            <div className="form-group">
              <label htmlFor="profilePic">Profile Image</label>
              <input type="file" className="form-control-file" id="profilePic" aria-describedby="fileHelp"/>
              <small id="fileHelp" className="form-text text-muted">Select a profile image to upload.</small>
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
                <input type="checkbox" className="form-check-input"/>
                I confirm that I have reviewed my changes.
              </label>
            </div>
            <button type="submit" className="btn btn-inverse" onClick={this.handleUpdate}>Update Profile</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
