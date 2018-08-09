import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'react-mdl';
import './css/Single.css';

class Single extends Component {
  render() {

    let imgSrc = '../images/rick-main-pic.jpg';
    
    return (
        <div className="App">

            <header className="App-header">
              <img src={imgSrc} className="App-logo" alt="logo" />
              <h2 className="App-title">Awsome Rick And Morty Pics Viewer!</h2>
            </header>

        </div>
    );
  }
}

export default Single;