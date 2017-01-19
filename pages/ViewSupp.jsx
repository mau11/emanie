import React from 'react';
import ReactDOM from 'react-dom';

export default class ViewSupp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allYarn: [],
      allTools: [],
      yIds: [],
      tIds: [],
      email: null,
      authId: null,
      profile: props.auth.getProfile()
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
    this.getUserYarn();
    this.getUserTools();
  }

  // Get user's yarn.
  getUserYarn(){
    return fetch('/api/yarn', {method: 'GET'})
      .then((response) => response.json())
      .then(yarn => {
        for(var i = 0; i < yarn.length; i++){
          for(var key in yarn[i]){
            if(yarn[i].email === this.state.email && yarn[i].authId === this.state.authId){
              this.setState({allYarn: yarn});
            }
          }
        }
      })
  }

  // Get user's tools.
  getUserTools(){
    return fetch('/api/tools', {method: 'GET'})
      .then((response) => response.json())
      .then(tools => {
        for(var i = 0; i < tools.length; i++){
          for(var key in tools[i]){
            if(tools[i].email === this.state.email && tools[i].authId === this.state.authId){
              this.setState({allTools: tools});
            }
          }
        }
      });
  }

  deletingYarn(e){
    var deleteYarn = e.target.id;
    var url = '/api/yarn/:'+ deleteYarn;
    fetch(url, {method: 'DELETE'})
      .then(window.location.reload());
  }

  deletingTool(e){
    var deleteTool = e.target.id;
    var url = '/api/tools/:'+ deleteTool;
    fetch(url, {method: 'DELETE'})
      .then(window.location.reload());
  }

  render () {
    return (
      <div >
        <div className="container">
          <h3>Supplies
          </h3>
          <div className="col-sm-6">
          <h4> Yarn:
          </h4>
          {this.state.allYarn.map(skein => {
            if(this.state.yIds.indexOf(skein.id) === -1){
              this.state.yIds.push(skein.id);
            }
          return [
          <div>
            <div className="addBorder">
              <h4 id={skein.id}><b>Color:</b> {skein.color}
              </h4>
              <h4><b>Weight:</b> {skein.weight}
              </h4>
              <h4><b>Brand:</b> {skein.brand}
              </h4>
              <h4><b>Amount: </b> {skein.amount}
              </h4>
              <h4><b>Notes: </b> {skein.notes}
              </h4>
            </div>
            <div className="mainTitle">
              <button type="button" className="btn btn-primary active">Edit
              </button>
              <button type="button" className="btn btn-danger btn-xs btn-center active" id={skein.id} onClick={this.deletingYarn.bind(this)}>Delete
              </button>
              <hr />
            </div>
          </div>]})}
          </div>
          <div className="col-sm-6">
          <h4> Tools:
          </h4>
          {this.state.allTools.map(item => {
            if(this.state.tIds.indexOf(item.id) === -1){
              this.state.tIds.push(item.id);
            }
          return [
          <div>
            <div className="addBorder">
              <h4 id={item.id}><b>Craft:</b> {item.craft}
              </h4>
              <h4><b>item:</b> {item.tool}
              </h4>
              <h4><b>Size:</b> {item.size}
              </h4>
              <h4><b>Material: </b> {item.material}
              </h4>
              <h4><b>Notes: </b> {item.notes}
              </h4>
            </div>
            <div className="mainTitle">
              <button type="button" className="btn btn-primary active">Edit
              </button>
              <button type="button" className="btn btn-danger btn-xs btn-center active" id={item.id} onClick={this.deletingTool.bind(this)}>Delete
              </button>
              <hr />
            </div>
          </div>]})}
          </div>
        </div>
      </div>
    );
  }
}
