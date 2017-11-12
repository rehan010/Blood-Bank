import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import SignUp from './signup';
import Login from './login';
import Welcome from './welcome';
import Registration from './Registration';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        
        
       <Route path="/welcome" component = {Welcome} />
        <Route exact path='/'  component={SignUp}/>
        <Route path='/login' component ={Login}/> 
        <Route path='/Registration' component ={Registration}/>
      </div> 
      </Router>
      
    );
  }
}

export default App;
