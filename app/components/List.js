import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid, Cell, Card, CardTitle, CardActions, Textfield, ProgressBar } from 'react-mdl';
import Pagination from "react-js-pagination";
import Api from './api/Api';
import styles from './css/List.css';

class List extends Component {

    constructor(props){
        super(props);
        this.state = { 
            data : [], 
            activePage : 1, 
            loading : false, 
            pages: 0,
            filtered : []
        };
    }

    filterCards(){

        let self = this;
        let end = ( self.state.activePage * 10 );
        let begin = end - 10;

        self.setState({ 
            filtered : self.state.data.slice(begin, end)
        });
    }

    loadNewChars(pageNumber){

        let self = this;

        Api.getList(pageNumber).then( (resp) => { 
            self.setState({ 
                data : self.state.data.concat( resp.data.results || [] ),
                pages : self.state.pages + 1 
            });

            self.filterCards(); 
        });
    }

    componentDidMount(){

        let self = this;

        // Fetching the Characters 
        self.loadNewChars(1);
    }

    handlePageChange(pageNumber){

        let self = this;

        //Fetching new characters only when necessary
        if( pageNumber > self.state.pages ){
            self.loadNewChars(pageNumber);
            self.setState( { activePage : pageNumber });
        }else{
            self.setState({ activePage : pageNumber });
            self.filterCards();
        }
    }

    searchByName(event){

        let self = this;

        if(!event.target.value){ 
            self.setState({ filtered : self.state.data.slice() });
            return;
        }

        self.setState({ loading : true });

        let title = event.target.value.toLowerCase();
        let result = self.state.data.filter( (char) => char.name.toLowerCase().indexOf(title) > -1 );

        if( result.length > 0){
            self.setState({ filtered : result, loading : false });
        }else{
            
        }
    }

    render() {

        let self = this;
        let it = 3000;

        return (
            
            <div>

                <h3 className="list-title">Results</h3>

                <Textfield
                    onChange={ self.searchByName.bind(this) }
                    label="Filter by Name"
                    floatingLabel
                    style={{width: '400px'}}
                />
                <i className="material-icons">search</i>

                <ProgressBar indeterminate className={self.state.loading ? '' : 'hidden' } />

                <Grid className="demo-grid-1">

                    {
                        self.state.filtered.length > 0 ?

                            self.state.filtered.map( char => (

                                <Cell col={4} key={it--}>

                                    <Route render={ ({ history }) => ( 

                                        <Card shadow={0} style={{width: '256px', height: '256px', background: `url(${char.image}) center / cover`, margin: 'auto'}}
                                              onClick={ () => { history.push(`list/${char.id}/`) } }>

                                            <CardTitle expand />
                                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                                <span style={{color: '#fff', fontSize: '15px', fontWeight: '500', margin : '0 3px 0 3px'}}>
                                                    {char.id} |
                                                </span>

                                                <span style={{color: '#fff', fontSize: '15px', fontWeight: '500', margin : '0 3px 0 3px'}}>
                                                    {char.name} |
                                                </span>

                                                <span style={{color: '#fff', fontSize: '15px', fontWeight: '500', margin : '0 3px 0 3px'}}>
                                                    {char.species}
                                                </span>                                        

                                            </CardActions>
                                        </Card>

                                    )} key={char.id}/>

                                </Cell>

                            ))

                        :

                            <h5 className="list-no-result"> No results Found... </h5>
                    }
                </Grid>

                <Pagination
                    className={styles.pagination}
                    activePage={self.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={493}
                    pageRangeDisplayed={5}
                    onChange={ self.handlePageChange.bind(self) }
                />

            </div>
        );
    }
}

export default List;