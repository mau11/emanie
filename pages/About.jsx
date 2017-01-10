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
        <img className="avatarPics" src=""/>
        <p>Emanie was created by crafter, designer and computer programmer, Maureen in January 2017. What began as a coding project blossomed into an interactive online community for those who love yarn crafts as much as she does. Here at Emanie, crafters have a place to store their patterns, track their supplies and meet other crafters.
        </p>
        <p>Feel free to look around, new patterns will be added frequently!
        </p>
        <p>Happy crafting!
        </p>
        <p>~Mau
        </p>
      </div>
    );
  }
}

