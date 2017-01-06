import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class PatGen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
      {/*<h3>View Patterns</h3>
        <div className="col-sm-12">
          <div className="col-sm-12">
            <h1></h1>
          </div>
          <div className="col-sm-4">
            <div>
              <Link to="">
                <img className="defaultPatIcon" src="../img/defaultPatIcon.png" />
              </Link>Pattern
              <div className="defaultPatIcon">
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div>
              <Link to="">
                <img className="defaultPatIcon" src="../img/defaultPatIcon.png" />
              </Link>Pattern
              <div className="defaultPatIcon">
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div>
              <Link to="">
                <img className="defaultPatIcon" src="../img/defaultPatIcon.png" />
              </Link>Pattern
              <div className="defaultPatIcon">
              </div>
            </div>
          </div>
        </div>
        <hr/>*/}
        <h3>Pattern Generator</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div>
                <h4>Add a New Pattern
                </h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="pic">Import PDF</label>
                    <input type="file" className="form-control-file" id="pic" name="picName"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="display">Pattern Name:</label>
                    <input type="text" className="form-control" id="display" placeholder="Enter pattern name" onChange="" name="display"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="craft">Craft:</label>
                    <input type="text" className="form-control" id="craft" placeholder="Crochet, Knitting, Sewing...Everything!" name="craft" onChange="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="craft">Supplies:</label>
                    <input type="text" className="form-control" id="craft" placeholder="Hooks, Needles, Yarn, Gauge..." name="craft" onChange="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="blurb">Notes/Details:</label>
                    <textarea className="form-control" id="bio" rows="2" name="bio" onChange=""></textarea>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" onClick=""/> I confirm that I have reviewed my changes.
                    </label>
                  </div>
                  <button type="submit" className="btn btn-inverse">Add Pattern</button>
                </form>
              </div>
            </div>
            <div className="col-sm-6">
            <h4>Generator:</h4>
            <div>
              <h3></h3>
              <h4> </h4>
              <h4></h4>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
