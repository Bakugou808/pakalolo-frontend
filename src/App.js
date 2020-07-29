import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import MainPage from './components/MainPage/MainPage'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import LogRocket from 'logrocket'

import { Route } from "react-router-dom";

LogRocket.init('cvf7db/pakalolo')

function App() {
  return (
    <div className="App">
      <Route path='/' render={props => <NavBar {...props} /> } />
      <Route exact path='/' render={props => <MainPage {...props} /> } />
      <Route path='/signup' render={props => <SignUp {...props} /> } />
      <Route path='/signin' render={props => <SignIn {...props} /> } />

    </div>
  );
}

export default App;
