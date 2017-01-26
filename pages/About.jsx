import React from 'react';

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
          <h4><i>Emanie was created by crafter, designer and software engineer, Maureen in January 2017. What started as a coding project, transformed into an interactive online community for those who love yarn crafts as much as she does. Here at Emanie, crafters have a place to store their patterns, track their supplies and discover new designs.</i>
          </h4>
          <h5>Feel free to look around, simply sign up for access to more features. New patterns will be added frequently (all updates will be posted on the homepage).
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

