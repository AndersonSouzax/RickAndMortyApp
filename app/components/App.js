import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import Main from './Main';
import List from './List';
import Single from './Single';
import './css/App.css';

ReactDOM.render(
		<BrowserRouter>
	     	<main>
			    <Switch>
					<Route exact path='/' component={Main}/>
				    <Route exact path='/list/' component={List}/>
				    <Route path='/list/:id/' component={Single}/>
			    </Switch>
		 	</main>
	    </BrowserRouter>, 
  document.getElementById('root'));
