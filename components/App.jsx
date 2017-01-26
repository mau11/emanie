import React from 'react';
import ReactDOM from 'react-dom';

// This is the homepage of the application.
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updates: []
    };
  }

  componentWillMount() {
    this.getUpdates();
  }

  // Gets data from db to be displayed under new & updates.
  getUpdates() {
    return fetch('/api/updates', {method: 'GET'})
      .then((response) => response.json())
      .then(weeklyUpdates => {
        this.setState({updates: weeklyUpdates});
    });
  }

  render () {
    return (
      <div className="container">
        <div className="mainTitle">
          <div className="col-sm-9">
            <h2>Welcome to Emanie!
            </h2>
            <h5>
              <em>A community for knitters and crocheters to store and share their crafts.</em>
            </h5>
            <img className="mainPics" src="../img/home2.jpg" alt="Basket of Yarn"/>
          </div>
          <div className="col-sm-3">
            <h4>
              <u><em>News & Updates:</em></u>
            </h4>
            <div className="box">
              {this.state.updates.map(item =>
              <div className="news" key={item.id}><strong>{'"'+item.notes+'"'}</strong><br/>
                <small ><em>{item["DATE_FORMAT(date, '%b %d, %Y')"]}</em></small>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
