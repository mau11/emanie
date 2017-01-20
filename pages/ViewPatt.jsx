import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class ViewPatt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPatts: [],
      allUploads: [{id: 'test', src: './uploads/userFile-1484819658175.pdf', pName: 'Test Name', notes: 'my creation'}],
      email: null,
      authId: null,
      profile: props.auth.getProfile(),
      ids: []
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
    return fetch('/api/patterns', {method: 'GET'})
      .then((response) => response.json())
      .then(allPatterns => {
        for(var i = 0; i < allPatterns.length; i++){
          for(var key in allPatterns[i]){
            if(allPatterns[i].email === this.state.email && allPatterns[i].authId === this.state.authId){
              this.setState({allPatts: allPatterns});
            }
          }
        }
      });
  }

  // Sort patterns A-Z
  sortPattAZ(e){
    e.preventDefault();
    return fetch('/api/patterns/sorted/name', {method: 'GET'})
      .then((response) => response.json())
      .then(sorted => {
        for(var i = 0; i < sorted.length; i++){
          for(var key in sorted[i]){
            if(sorted[i].email === this.state.email && sorted[i].authId === this.state.authId){
              this.setState({allPatts: sorted});
            }
          }
        }
      });
  }

  // Sort by craft, then by pattern name for the same crafts
  sortCraftAZ(e){
    e.preventDefault();
    return fetch('/api/patterns/sorted/craft', {method: 'GET'})
      .then((response) => response.json())
      .then(sortedCrafts => {
        for(var i = 0; i < sortedCrafts.length; i++){
          for(var key in sortedCrafts[i]){
            if(sortedCrafts[i].email === this.state.email && sortedCrafts[i].authId === this.state.authId){
              this.setState({allPatts: sortedCrafts});
            }
          }
        }
      });
  }

  deletingPatt(e){
    var deletePatt = e.target.id;
    var url = '/api/patterns/:'+ deletePatt;
    fetch(url, {method: 'DELETE'})
      .then(window.location.reload());
  }

  render () {
    let count = this.state.allPatts.length + this.state.allUploads.length;
    return (
      <div >
        <div className="container">
          <h3>Patterns
          </h3>
          <div>
            <h4 className="col-sm-10">Sort by:
            </h4>
            <h4 className="col-sm-2">Total: {count}
            </h4>
          </div>
          <div className="btn-toolbar">
            <button className="btn btn-inverse" onClick={this.sortPattAZ.bind(this)}>Pattern Name </button>
            <button className="btn btn-inverse" onClick={this.sortCraftAZ.bind(this)}>Craft</button>
          </div>
          <div className="col-sm-12">
          {this.state.allPatts.map(patt => {
            if(this.state.ids.indexOf(patt.id) === -1){
              this.state.ids.push(patt.id);
            }
          return (
          <div>
            <div className="addBorder">
              <h4 id={patt.id}><b>Pattern Name:</b> {patt.pName}
              </h4>
              <h4><b>Craft:</b> {patt.craft}
              </h4>
              <h4><b>Supplies:</b> {patt.tools}
              </h4>
              <h4><b>Notes: </b> {patt.notes}
              </h4>
            </div>
            <div className="mainTitle">
              <button type="button" className="btn btn-danger btn-center active" id={patt.id} onClick={this.deletingPatt.bind(this)}>Delete
              </button>
              <hr />
            </div>
          </div>)})}
          <div>
            <h3>Uploaded Patterns
            </h3>{this.state.allUploads.map(file => {
              return (
                <div key={file.id}>
                  <h4 id={file.id}><b>Pattern Name:</b> {file.pName}
                  </h4>
                  <h4><b>Notes: </b> {file.notes}
                  </h4>
                    <iframe src={file.src +'#zoom=60'} className="pdfs" allowFullScreen >
                    </iframe>
                    <hr />
                </div>
              )
            })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
