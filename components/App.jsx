import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="container">
        <div className="mainTitle">
          <h2>Welcome to Emanie!</h2>
          <h5>
            <i>A community for knitters and crocheters to store and share their crafts.
            </i>
          </h5>
          <img className="mainPics" src="../img/home2.jpg" alt="Basket of Yarn"/>
        </div>
      </div>
    );
  }
}
