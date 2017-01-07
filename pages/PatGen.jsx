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
                    <input type="text" className="form-control" id="patt" placeholder="Enter pattern name"  name="pattName"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="patCra">Craft:</label>
                    <input type="text" className="form-control" id="patCra" placeholder="Crochet, Knitting, Sewing, etc" name="pattCraft"  />
                  </div>
                  <div className="form-group">
                    <label htmlFor="supp">Supplies:</label>
                    <input type="text" className="form-control" id="supp" placeholder="Hooks, Needles, Sizes, etc" name="suppName"  />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gau">Gauge:</label>
                    <input type="text" className="form-control" id="gau" placeholder="Hooks, Needles, Yarn, Gauge..." name="gauge"  />
                  </div>
                  <div className="form-group">
                    <label htmlFor="notes">Notes/Details:</label>
                    <textarea className="form-control" id="notes" rows="2" name="notesDetails" ></textarea>
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
          </div>
        </div>
      </div>
    );
  }
}
