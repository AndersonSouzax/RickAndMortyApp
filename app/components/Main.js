import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'react-mdl';
import './css/Main.css';

class Main extends Component {
  render() {

    let imgSrc = '/images/rick-main-pic.jpg';
    
    return (
        <div className="App">

            <header className="App-header">
              <img src={imgSrc} className="App-logo" alt="logo" />
              <h2 className="App-title">Awesome Rick And Morty Pics Viewer!</h2>
            </header>

            <p className="App-intro">

                <Route render={ ({ history }) => (
                    <Button 
                        raised colored
                        onClick={ () => { history.push(`list/`)} }>
                        Start
                    </Button>
                )} />
      
              Clique iniciar para começar a utilizar!

            </p>

        </div>
    );
  }
}

export default Main;