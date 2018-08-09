import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'react-mdl';
import Api from './api/Api'
import './css/List.css';

class List extends Component {

  this.state = { data :  Api.getList() };

  render() {
    
    return (
        <div className="App">

            {
                this.state.data.map( char => {

                    <Route render={ ({ history }) => ( 

                        <Card shadow={0} style={{width: '256px', height: '256px', background: `url(${char.image}) center / cover`, margin: 'auto'}}>
                            <CardTitle expand />
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                                    
                                </span>
                            </CardActions>
                        </Card>

                    ) } key={char.id}/>
                });
            }
        </div>
    );
  }
}

export default List;