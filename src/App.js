import React, { Component } from 'react';
import './App.css';
import Main from  './Components/Main'
import MainRachel from  './Components/MainRachel'
// import {Switch, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
    return(
      <div>
        <Main />
        <MainRachel />

      </div>
    );
  }
}

export default App;
