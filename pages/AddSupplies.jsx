import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class AddSupplies extends React.Component {
  static propTypes() {
    return {
      auth: T.instanceOf(AuthService),
      profile: T.object
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      authId: null,
      checkY: false,
      weight: null,
      brand: null,
      colors: null,
      listOfWeights: ['Lace', 'Super Fine/Baby', 'Fine/Sport', 'Light-Worsted', 'Medium/Worsted', 'Bulky/Chunky', 'Super Bulky', 'Jumbo', 'Other'],
      yNotes: null,
      yarnDetails: [],
      checkT: false,
      size: null,
      listOfSizesC: ['2.00mm', '2.25mm  B/1', '2.50mm', '2.75mm  C/2', '3.00mm', '3.25mm  D/3', '3.50mm  E/4', '3.75mm  F/5', '4.0mm  G/6', '4.50mm  7','5.00mm  H/8', '5.50mm  I/9','6.00mm  J/10', '6.5mm  K/10.5','7.00mm', '8.00mm  L/11', '9.00mm  M/13','10.00mm  N/15'],
      listOfSizesK: ['2.00mm  0', '2.25mm  1', '2.75mm  2', '3.00mm', '3.25mm  3', '3.50mm  4', '3.75mm  5', '4.00mm  6', '4.50mm  7', '5.00mm  8', '5.5mm  9', '6.00mm  10', '6.50mm  10.5', '7.00mm', '7.50mm', '8.00mm  11', '9.00mm  13', '10.00mm  15', '12.00mm  17', '16.00mm  19', '19.00mm  35', '25.00mm  50'],
      craft : null,
      tNotes: null,
      toolDetails: [],
      profile: props.auth.getProfile()
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
          this.state.yarnDetails.push(this.state.email);
          this.state.toolDetails.push(this.state.email);
        });
      }
      if(key === 'identities'){
        this.setState({authId: obj[key][0].user_id}, function(){
          this.state.yarnDetails.push(this.state.authId);
          this.state.toolDetails.push(this.state.authId);
        });
      }
    }
  }

  // Handle adding yarn
  handleCheckboxY() {
    if(this.state.checkY){
      this.setState({checkY: false});
      return false;
    } else {
      this.setState({checkY: true});
      return true;
    }
  }

  handleAddYarn(e) {
    e.preventDefault();
    if(this.state.checkY === true){
      this.addYarn(this.submitYarn);
    } else {
      alert('Please confirm changes.');
    }
  }

  // Add user input to state
  addYarn(cb) {
    if(!$('#color').val() && !$('#weight').val() && !$('#brand').val() && !$('#amount').val() && $('#notesY').val()){
      alert('One field must be filled to submit.');
    } else {
      if($('#color').val()){
        this.state.yarnDetails.push($('#color').val());
      } else {
        this.state.yarnDetails.push('');
      }
      if($('#weight').val()){
        this.state.yarnDetails.push($('#weight').val());
      } else {
        this.state.yarnDetails.push('');
      }
      if($('#brand').val()){
        this.state.yarnDetails.push($('#brand').val());
      } else {
        this.state.yarnDetails.push('');
      }
      if($('#amount').val()){
        this.state.yarnDetails.push($('#amount').val());
      } else {
        this.state.yarnDetails.push('');
      }
      if($('#notesY').val()){
        this.state.yarnDetails.push($('#notesY').val());
      } else {
        this.state.yarnDetails.push('');
      }
      cb(this.state.yarnDetails);
      this.clearFieldsY();
    }
  }

  submitYarn(arr) {
    fetch('/api/yarn/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arr)
    });
    alert('Yarn added!');
  }

  clearFieldsY(){
    this.setState({toolDetails: [this.state.email, this.state.authId]});
    $('#color').val('');
    $('#weight').val('');
    $('#brand').val('');
    $('#amount').val('');
    $('#notesY').val('');
    document.getElementById('yarnBox').checked = false;
  }

  // Handle adding tools
  handleCheckboxT() {
    if(this.state.checkT){
      this.setState({checkT: false});
      return false;
    } else {
      this.setState({checkT: true});
      return true;
    }
  }

  handleAddTools(e) {
    e.preventDefault();
    if(this.state.checkT === true){
      this.addTools(this.submitTools);
    } else {
      alert('Please confirm changes.');
    }
  }

  // Add user input to state
  addTools(cb) {
    if(!$('#craft').val() && !$('#size').val() && !$('#material').val() && !$('#notesT').val() ){
      alert('One field must be filled to submit.');
    } else {
      if($('#craft').val()){
        this.state.toolDetails.push($('#craft').val());
        if($('#craft').val() === 'knit'){
          this.state.toolDetails.push('needle');
        } else if($('#craft').val() === 'crochet'){
          this.state.toolDetails.push('hook');
        } else {
          this.state.toolDetails.push('');
        }
      } else {
        this.state.toolDetails.push('');
      }
      if($('#size').val()){
        this.state.toolDetails.push($('#size').val());
      } else {
        this.state.toolDetails.push('');
      }
      if($('#material').val()){
        this.state.toolDetails.push($('#material').val());
      } else {
        this.state.toolDetails.push('');
      }
      if($('#notesT').val()){
        this.state.toolDetails.push($('#amount').val());
      } else {
        this.state.toolDetails.push('');
      }
      cb(this.state.toolDetails);
      this.clearFieldsT();
    }
  }

  submitTools(arr) {
    fetch('/api/tools/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arr)
    });
    alert('Tool added');
  }

  clearFieldsT(){
    this.setState({toolDetails: [this.state.email, this.state.authId]});
    $('#craft').val('');
    $('#size').val('');
    $('#material').val('');
    $('#notesT').val('');
    document.getElementById('toolBox').checked = false;
  }

  render () {
    return (
      <div>
        <h3>Supplies</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div>
                <h4> Add Yarn:
                </h4>
                <form>
                  <div className="form-group">
                    <label>Color:</label>
                    <input type="text" className="form-control" id="color" placeholder="Enter Yarn Color"  name="colorName"/>
                  </div>
                  <div className="form-group">
                    <label>Weight:</label>
                    <input type="text" className="form-control" id="weight" placeholder="Lace, Medium/Worsted, Bulky/Chunky etc" name="weightName"  />
                  </div>
                  <div className="form-group">
                    <label>Brand:</label>
                    <input type="text" className="form-control" id="brand" placeholder="Enter yarn's brand name" name="brandName" />
                  </div>
                  <div className="form-group">
                    <label>Amount:</label>
                    <input type="text" className="form-control" id="amount" placeholder="1 Skein" name="amountName" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="notes">Notes/Details:</label>
                    <textarea className="form-control" id="notesY" rows="2" name="notesDetails" ></textarea>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" id="yarnBox" className="form-check-input" onClick={this.handleCheckboxY.bind(this)}/> I confirm that I have reviewed my changes.
                    </label>
                  </div>
                  <button type="submit" className="btn btn-inverse" onClick={this.handleAddYarn.bind(this)}>Add Yarn</button>
                </form>
              </div>
            </div>
            <div className="col-sm-6">
              <div>
                <h4> Add Tools:
                </h4>
                <form>
                  <div className="form-group">
                    <label>Craft:</label>
                    <input type="text" className="form-control" id="craft" placeholder="Knit or Crochet"  name="craft"/>
                  </div>
                  <div className="form-group">
                    <label>Size:</label>
                    <input type="text" className="form-control" id="size" placeholder="Needle or Hook Size" name="size"  />
                  </div>
                  <div className="form-group">
                    <label>Material:</label>
                    <input type="text" className="form-control" id="material" placeholder="Aluminum, Wooden, Bamboo etc" name="material"  />
                  </div>
                  <div className="form-group">
                    <label>Notes/Details:</label>
                    <textarea className="form-control" id="notesT" rows="3" name="notesT" ></textarea>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" id="toolBox" className="form-check-input" onClick={this.handleCheckboxT.bind(this)}/> I confirm that I have reviewed my changes.
                    </label>
                  </div>
                  <button type="submit" className="btn btn-inverse" onClick={this.handleAddTools.bind(this)}>Add Tool</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


/*

$scope.listOfSizesC = ['2.00mm', '2.25mm  B/1', '2.50mm', '2.75mm  C/2', '3.00mm', '3.25mm  D/3', '3.50mm  E/4', '3.75mm  F/5', '4.0mm  G/6', '4.50mm  7','5.00mm  H/8', '5.50mm  I/9','6.00mm  J/10', '6.5mm  K/10.5','7.00mm', '8.00mm  L/11', '9.00mm  M/13','10.00mm  N/15'];

$scope.listOfSizesK = ['2.00mm  0', '2.25mm  1', '2.75mm  2', '3.00mm', '3.25mm  3', '3.50mm  4', '3.75mm  5', '4.00mm  6', '4.50mm  7', '5.00mm  8', '5.5mm  9', '6.00mm  10', '6.50mm  10.5', '7.00mm', '7.50mm', '8.00mm  11', '9.00mm  13', '10.00mm  15', '12.00mm  17', '16.00mm  19', '19.00mm  35', '25.00mm  50'];


YARN

$scope.listOfWeights = ['Lace', 'Super Fine/Baby', 'Fine/Sport', 'Light-Worsted', 'Medium/Worsted', 'Bulky/Chunky', 'Super Bulky', 'Jumbo', 'Other'];



*/
