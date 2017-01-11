import React from 'react';
import ReactDOM from 'react-dom';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="mainTitle">
        <h3>About Emanie</h3>
        <div className="container">
          <img className="aboutPic" src="../img/aboutPic.jpg"/>
          <h4>Emanie was created by crafter, designer and computer programmer, Maureen in January 2017. What began as a coding project blossomed into an interactive online community for those who love yarn crafts as much as she does. Here at Emanie, crafters have a place to store their patterns, track their supplies and meet other crafters.
          </h4>
          <h5>Feel free to look around, simply sign up for access to more features, new patterns will be added frequently!
          </h5>
          <h5>Happy crafting!
          </h5>
          <h5>~Mau
          </h5>
        </div>
      </div>
    );
  }
}

