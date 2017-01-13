import React from 'react';
import ReactDOM from 'react-dom';


export default class ViewPatt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPatts: []
    };
  }


  render () {
    let count = this.state.allPatts.length;
    let identifier = 0;
    return (
      <div >
        <div className="col-sm-12">
          <div className="addBorder">
            <h4><b>Pattern Name:</b> {patt.pName}
            </h4>
            <h4><b>Craft:</b> {patt.craft}
            </h4>
            <h4><b>Supplies:</b> {patt.tools}
            </h4>
            <h4><b>Notes: </b> {patt.notes}
            </h4>
          </div>
          <div className="mainTitle">
            <button type="button" className="btn btn-primary active">Edit
            </button>
            <button type="button" id={identifier} className="btn btn-danger btn-xs btn-center active" onClick={this.deletePatt.bind(this)}>Delete
            </button>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}
