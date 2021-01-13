import Login from './login';
import homepage from './homepage';
import React from 'react';
import pdf from './pdf';
import NoMatch from './noMatch';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
 
function App(){
   return(
       <div>
           <Router>
               <div>
                   <Switch>
                   <Route exact path='/'  component={Login} />
                   <Route  path='/homepage'  component={homepage} />
                   <Route path='/pdf' component={pdf} />
                   <Route component={NoMatch}/>
                   </Switch>
               </div>
          
            </Router>
       </div>
   )
}
// function NoMatch(){
//    return(
//        <div>
//            NoMatch
//        </div>
//    )
// }
 
export default App;
