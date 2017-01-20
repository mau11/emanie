import React from 'react';
import ReactDOM from 'react-dom';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allResults: [],
      ids: [],
      prompt: null,
      word: null
    };
  }

  componentWillMount() {
    this.searchPatterns();
  }

  searchPatterns() {
    var searching = $('#searchInput').val();
    $('#searchInput').val('');
    if(searching){
      this.setState({word: '"'+searching+'"'});
      return fetch('/api/patterns/:' + searching, {method: 'GET'})
      .then((response) => response.json())
      .then(searchResults => {
        for(var i = 0; i < searchResults.length; i++){
          if(searchResults.length > 0){
            this.setState({allResults: searchResults});
          }
        }
      });
    }
  }

  render () {
    let total = this.state.allResults.length;
    let prompt = null;
    if(total === 0){
      prompt = 'No Matches Found';
    }
    return (
      <div >
        <div className="container">
          <h3>Search Results for {this.state.word}:
          </h3>
          <div>
            <h4 className="col-sm-10">{prompt}
            </h4>
            <h4 className="col-sm-2">Total: {total}
            </h4>
          </div>
          <div className="col-sm-12">
          {this.state.allResults.map(patt => {
            if(this.state.ids.indexOf(patt.id) === -1){
              this.state.ids.push(patt.id);
            }
          return (
          <div>
            <div className="addBorder">
              <h4 key={patt.id} id={patt.id}><b>Pattern Name:</b> {patt.pName}
              </h4>
              <h4><b>Craft:</b> {patt.craft}
              </h4>
              <h4><b>Supplies:</b> {patt.tools}
              </h4>
              <h4><b>Notes: </b> {patt.notes}
              </h4>
            </div>
            <div><hr /></div>
          </div>)})}
          </div>
        </div>
      </div>
    );
  }
}
