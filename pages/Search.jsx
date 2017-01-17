import React from 'react';
import ReactDOM from 'react-dom';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  rendor() {
    return (
      <div>
        <form role="search" className="navbar-form navbar-left">
            <div className="form-group">
              <input type="text" placeholder="Search Patterns" className="form-control" />
              <button type="submit" className="btn btn-inverse">Search</button>
            </div>
          </form>
      </div>
    );
  }
}

/*
This page will render after submitting content in the search bar.
*/
