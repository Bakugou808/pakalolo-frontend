import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Route path='/' render={props => <NavBar {...props} /> } />
      <Route exact path='/' render={props => <MainPage {...props} /> } />
    </div>
  );
}

export default App;
