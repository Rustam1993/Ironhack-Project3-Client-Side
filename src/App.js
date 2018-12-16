import React, { Component } from 'react';
import './App.css';
import Main from  './Components/Main'
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return(
      <div>
        <Route  component= {Main} />
        
      </div>
    );
  }
}

export default App;
