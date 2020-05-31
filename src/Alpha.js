import {App ,logout} from './App';
import ipfs from './ipfs';
import homepage from './homepage';
import pdf from './pdf';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
 
function Alpha(){
   return(
       <div>
           <Router>
               <div>
                   
                   <ul>
                      {/* <li><Link to='/'>App</Link></li>
                       <li><Link to='/ipfs'>ipfs</Link></li>
                       <li><Link to='/homepage'>homepage</Link></li> */}
                   </ul>
                   <Switch>
                   <Route exact path='/'  component={App} />
                   <Route  path='/ipfs'  component={ipfs} />
                   <Route  path='/homepage'  component={homepage} />
                   <Route  path='/pdf'  component={pdf} />
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
