import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid, Cell, Card, CardTitle, CardActions, Textfield, ProgressBar, Snackbar } from 'react-mdl';
import Pagination from "react-js-pagination";
import Api from './api/Api';
import styles from './css/List.css';

class List extends Component {

    constructor(props){
        super(props);
        this.state = { 
            data : [], 
            activePage : 1,
            pages: [],
            filtered : [],
            isSnackbarActive : false
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

            let arr = self.state.pages;
            arr.push(pageNumber);

            self.setState({ 
                data : self.state.data.concat( resp.data.results || [] ),
                pages : arr
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
        if( !self.state.pages.includes(pageNumber) ){
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
            self.filterCards();
            return;
        }

        self.setState({ loading : true });

        let title = event.target.value.toLowerCase();
        let result = self.state.data.filter( (char) => char.name.toLowerCase().indexOf(title) > -1 );

        if( result.length > 0){
            self.setState({ filtered : result, loading : false });
        }else{
            self.setState( { isSnackbarActive : true });
        }
    }

    saveChosenChar(char){
        let obj = char || {};
        localStorage.setItem('chosenChar', JSON.stringify(obj));
    }

    hideSnack(){
        this.setState({ isSnackbarActive : false });
    }

    render() {

        let self = this;
        let it = 3000;

        return (
            
            <div>

                <h3 className="list-title">Results</h3>

                <Textfield
                    className={ styles.textInput}
                    onChange={ self.searchByName.bind(this) }
                    label="Filter by Name"
                    floatingLabel
                    style={{width: '400px'}}
                />
                <i className="material-icons">search</i>

                <Grid className="demo-grid-1">

                    {
                        self.state.filtered.length > 0 ?

                            self.state.filtered.map( char => (

                                <Cell col={4} key={it--}>

                                    <Route render={ ({ history }) => ( 

                                        <Card shadow={0} 

                                            style={{ 
                                                    background: `url(${char.image}) center / cover`,
                                                    width: '256px',
                                                    height: '256px',
                                                    margin: 'auto',
                                                    cursor: 'pointer'
                                                    }}

                                            onClick={ () => { 
                                                self.saveChosenChar(char);
                                                history.push(`${char.id}/`);
                                            }}>

                                            <CardTitle expand />
                                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                                <span className={styles.infoSpan}>
                                                    {char.id} |
                                                </span>

                                                <span className={styles.infoSpan}>
                                                    {char.name} |
                                                </span>

                                                <span className={styles.infoSpan}>
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

                <Snackbar
                    active={self.state.isSnackbarActive}
                    onTimeout={self.hideSnack.bind(self)}>
                    No results here... try the next page
                </Snackbar>

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