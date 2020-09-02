import React from 'react';
import { Route } from "react-router-dom";

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import MainPage from './components/MainPage/MainPage'
import SignIn from './components/NavBar/SignIn'
import SignUp from './components/NavBar/SignUp'
import HomePage from './components/HomePage/HomePage'
import LogRocket from 'logrocket'
import Collection from './components/Collection/Collection'
import Lists from './components/Lists/Lists'
import EntriesContainer from './components/Entries/EntriesContainer'
import Vendors from './components/Vendors/Vendors'


LogRocket.init('cvf7db/pakalolo')

function App() {
  return (
    <div className="App">
      <Route path='/' render={props => <NavBar {...props} /> } />
      <Route exact path='/' render={props => <MainPage {...props} /> } />
      <Route path='/signup' render={props => <SignUp {...props} /> } />
      <Route path='/signin' render={props => <SignIn {...props} /> } />
      <Route path='/home' render={props => <HomePage {...props} /> } />
      {/* left drawer paths */}
      <Route path='/collection' render={props => <Collection {...props} /> } />
      <Route path='/lists' render={props => <Lists {...props} /> } />
      <Route path='/entries' render={props => <EntriesContainer {...props} entriesPage={true} /> } />
      <Route path='/vendors' render={props => <Vendors {...props} /> } />



    </div>
  );
}

export default App;
