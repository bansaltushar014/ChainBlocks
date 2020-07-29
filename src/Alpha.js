import {App ,logout} from './App';
import homepage from './homepage';
import React from 'react';
import pdf from './pdf';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
 
function Alpha(){
   return(
       <div>
           <Router>
               <div>
                   <Switch>
                   <Route exact path='/'  component={App} />
                   <Route  path='/homepage'  component={homepage} />
                   <Route path='/pdf' component={pdf} />
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
