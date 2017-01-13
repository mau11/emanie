import React from 'react';
import ReactDOM from 'react-dom';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: null
    };
  }

  updateSearch() {
    this.setState({search});
  }

  rendor () {
    return (
      <div>Search Patterns on the page
        <input onChange={this.updateSearch.bind(this)} value={this.state.search}/>
      </div>
    );
  }
}

/*
This page will render after submitting content in the search bar.
*/
