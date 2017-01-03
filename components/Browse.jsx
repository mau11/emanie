import React from 'react';
import ReactDOM from 'react-dom';

class Browse extends React.Component {
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
      <div>Browse Patterns on the page
        <input onChange={this.updateSearch.bind(this)} value={this.state.search}/>
      </div>
    );
  }
}

export default Browse;
/*
This page will render after submitting content in the search bar.
*/
