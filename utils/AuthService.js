// From Auth0
import React from 'react';
import ReactDOM from 'react-dom';
import Auth0 from 'auth0-js';
import { browserHistory } from 'react-router';
import { isTokenExpired } from './jwtHelper';
import { EventEmitter } from 'events';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
    this.domain = domain; // setting domain parameter as an instance attribute
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: '',
        responseType: 'token'
      }
    });

     // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // Add callback for lock `authorization_error` event
    //this.lock.on('authorization_error', this._authorizationError.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

    // the new updateProfile
    updateProfile(userId, data) {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken() //setting authorization header
      };
      // making the PATCH http request to auth0 api
      return fetch(`https://${this.domain}/api/v2/users/${userId}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(newProfile => this.setProfile(newProfile)); //updating current profile
    }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
    // navigate to the home route
    browserHistory.replace('/#');
    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        this.setProfile(profile);
      }
    });
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token');
  }

  setProfile(profile) {
    // Saves profile data to local storage
    localStorage.setItem('profile', JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile);
  }

  getProfile() {
    // Retrieves the profile data from local storage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }

  signup(params, onError) {
    //redirects the call to auth0 instance
    this.auth0.signup(params, onError);
  }

  parseHash(hash) {
    // uses auth0 parseHash method to extract data from url hash
    const authResult = this.auth0.parseHash(hash);
    if (authResult && authResult.idToken) {
      this.setToken(authResult.idToken);
    }
  }
}
