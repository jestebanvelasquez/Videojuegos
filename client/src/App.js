import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandigPage';
import {Route } from 'react-router-dom'
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import ByName from './components/ByName/ByName';
import Create from './components/createdGame/Create';
import Detail from './components/Detail/Detail';
import DataBase from './components/DataBase/DataBase.jsx'
import Footer from './components/Footer/Footer';



function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={NavBar} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/create" component={Create} />
      <Route exact path="/home/name" component={ByName} />
      <Route exact path="/home/detail/:id" component={Detail} />
      <Route exact path="/home/database" component={DataBase} />
      <Route path="/home" component={Footer} />

    </div>
  );
}

export default App;