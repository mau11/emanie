import React from 'react';
import ReactDOM from 'react-dom';
import Update from './Update.jsx';

export default class Profile extends React.Component {
/*  constructor() {
    super();
    this.state = {};
  }*/

  render () {
    let displayName = this.props.displayName;
    let craftName = this.props.craftName;
    let bio = this.props.bio;
    return (
      <div>
      <h3>Display Name: {displayName}</h3>
      <h4>Favorite Craft: {craftName}</h4>
      <h4>Bio: {bio}</h4>
      <h4></h4>
      </div>
    );
  }
}
