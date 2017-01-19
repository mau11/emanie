import React from 'react';
import ReactDOM from 'react-dom';

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

  getUpdates() {
    return fetch('/api/updates', {method: 'GET'})
      .then((response) => response.json())
      .then(weeklyUpdates => {
        this.setState({updates: weeklyUpdates});
        console.log('UPDATES', this.state.updates);
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
              <i>A community for knitters and crocheters to store and share their crafts.
              </i>
            </h5>
            <img className="mainPics" src="../img/home2.jpg" alt="Basket of Yarn"/>
          </div>
          <div className="col-sm-3">
            <hr />
            <h4> <u>Weekly Updates:</u>
            </h4>
              <div className="textbox">
                {this.state.updates.map(item =>
                  <div key={item.id}><b>{item.notes}</b><br/>
                    <small><i>{item["DATE_FORMAT(date, '%b-%d-%Y')"]
}
                    </i></small>
                    <hr />
                  </div>
                  )}
              </div>
          </div>
        </div>
      </div>
    );
  }
}
