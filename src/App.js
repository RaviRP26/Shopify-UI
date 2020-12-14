import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import Encrypt from './component/EncryptUI/encrypt';
import Footer from './component/footer/footer';
import Sidebar from './component/sidebar/sidebar';
import { Router, Switch, Route } from 'react-router-dom';
export const history = createBrowserHistory();

class App extends Component {
  render() {
  return ( 
    <>
    <Router history={history}>
      <Sidebar/>  
      <Switch>
       <Route exact path="/" component={Sidebar} />
       <Route path="/encrypt" component={Encrypt} />
       </Switch>
      <Footer/>
      </Router>
    </>
  );
}
}

export default App;
