import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { IconButton, Grid, Cell, Card, CardTitle, CardText } from 'react-mdl';
import Api from './api/Api';
import './css/Single.css';

class Single extends Component {

  constructor(props){
    super(props);

    this.state = {
      char : {},
      episodes :[]
    };
  }

  loadEpisodes(){

    let self = this;
    let episodes = self.state.char.episode;

    //Handling the episodes promisses array
    Api.getCharEpisodes(episodes).then( (eps) => {

        let arr = [];

        eps.forEach( (ep) => {
            arr.push(ep.data);
        });

        self.setState({ episodes : arr.slice() });

    }, (err) => { console.log(err); });
  }

  componentDidMount(){

    this.setState({
      char : JSON.parse( localStorage.getItem('chosenChar') ) || { image : '' }
    }, this.loadEpisodes);

    localStorage.clear();
  }

  render() {
    
    let char = this.state.char;
    let it = 3000;

    return (
        <div>
            <section>

                <Route render={ ({ history }) => (
                    <IconButton 
                        name="arrow_back" 
                        className='backIcon'
                        onClick={ () => history.goBack() }
                    />
                )}/>

                <Grid className="demo-grid-1">
                    <Cell col={6} tablet={4}>
                        <Card shadow={0} 
                            style={{ height : '256px', background: `url(${char.image}) center / cover`, margin: 'auto'}}>
                            <CardTitle expand />
                        </Card>
                    </Cell>

                    <Cell col={6} tablet={4}>

                        <Card shadow={2} style={{ height : '256px', background: '#fff' }}>
                            <CardTitle expand style={{alignItems: 'flex-start', color: '#000'}}>
                                <h4 style={{marginTop: '0'}}>
                                    Basic Information:
                                </h4>
                            </CardTitle>

                            <CardText style={{fontSize : '22px', color : '#000', lineHeight : '1.7em' }}>
                                <span>
                                   <span className='title'>ID</span> : {char.id}
                                </span><br/>
                                <span>
                                   <span className='title'>Name</span> : {char.name}
                                </span><br/>
                                <span>
                                    <span className='title'>Status</span> : {char.status}
                                </span><br/>
                                <span>
                                    <span className='title'>Species</span> : {char.species}
                                </span>
                            </CardText>

                        </Card>
                    </Cell>

                </Grid>

            </section>

            <h4>Participations:</h4>

            <article className='episodes'>

                <Grid className="demo-grid-1">

                    {
                        this.state.episodes.map( e => (

                            <Cell col={3} key={it--}>

                                <span className='title'>Number </span>:<span> {e.episode}</span><br/>
                                <span className='title'>Air Date </span>:<span> {e.air_date}</span><br/>
                                <span className='title'>Name </span>:<span> {e.name}</span>

                            </Cell>
                        ))

                    }
                    
                </Grid>

            </article>
        </div>
    );
  }
}

export default Single;