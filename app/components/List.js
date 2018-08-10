import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid, Cell, Card, CardTitle, CardActions, Textfield } from 'react-mdl';
import Pagination from "react-js-pagination";
import Api from './api/Api'
import './css/List.css';

class List extends Component {

    constructor(){
        super();
        this.state = { data : [], activePage : 1 };
    }

    componentDidMount(){

        let self = this;

        // Fetching the Characters 
        Api.getList(1).then( (resp) =>  { self.setState({ data : resp.data.results || [] }) } );
    }

    handlePageChange(pageNumber){

        let self = this;
        Api.getList(pageNumber).then( (resp) => { self.setState({ data : resp.data.results || [] , activePage: pageNumber }) } );
    }

    render() {

        let self = this;
        let it = 3000;

        return (
            
            <div className="App">

                <h3 className="list-title">Results</h3>

                <Textfield
                    onChange={() => {}}
                    label="Filter by Name"
                    floatingLabel
                    style={{width: '400px'}}
                />

                <Grid className="demo-grid-1">

                    {
                        self.state.data.map( char => (

                            <Cell col={4} key={it--}>

                                <Route render={ ({ history }) => ( 

                                    <Card shadow={0} style={{width: '256px', height: '256px', background: `url(${char.image}) center / cover`, margin: 'auto'}}
                                          onClick={ () => { history.push(`list/${char.id}/`) } }>

                                        <CardTitle expand />
                                        <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                            <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                                                {char.id}
                                            </span>

                                            <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                                                {char.name}
                                            </span>

                                            <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                                                {char.species}
                                            </span>                                        

                                        </CardActions>
                                    </Card>

                                )} key={char.id}/>

                            </Cell>

                        ))
                    }
                </Grid>

                <Pagination
                  activePage={self.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={493}
                  pageRangeDisplayed={5}
                  onChange={ self.handlePageChange }
                />

            </div>
        );
    }
}

export default List;