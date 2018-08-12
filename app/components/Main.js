import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'react-mdl';
import './css/Main.css';

class Main extends Component {
  
  render() {
    
    return (
        <div className="App">

            <header className="App-header">
              <img src='/images/new-rick-and-morty.jpg' className="App-logo" alt="logo" />
              <h2 className="App-title">Awesome Rick And Morty Pictures Viewer!</h2>
            </header>

            <p className="App-intro">

                <Route render={ ({ history }) => (
                    <Button 
                        raised colored
                        onClick={ () => { history.push(`list/`)} }>
                        Start
                    </Button>
                )} /><br/><br/><br/>
      
              Click to start using!

            </p>

        </div>
    );
  }
}

export default Main;