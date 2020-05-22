import App from './App';

import ipfs from './ipfs';

import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
 
function Alpha(){
   return(
       <div>
           <Router>
               <div>
                   
                   <ul>
                      <li><Link to='/'>App</Link></li>
                       <li><Link to='/ipfs'>ipfs</Link></li>
                   </ul>
                   <Switch>
                   <Route exact path='/'  component={App} />
                   <Route  path='/ipfs'  component={ipfs} />
                   <Route component={NoMatch}/>
                   </Switch>
               </div>
           </Router>
       </div>
   )
}
function NoMatch(){
   return(
       <div>
           NoMatch
       </div>
   )
}
 
export default Alpha;
