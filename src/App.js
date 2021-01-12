import './assets/css/App.css';
import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Menu from './components/menu/Menu';
import Home from './components/Home';
import verCentroLogistico from './components/verCentroLogistico';
import verOficina from './components/verOficina';
import CrearEnvio from './components/envio/CrearEnvio';
import NotificarEnvio from './components/envio/NotificarEnvio';
import Login from './components/login/Login';
import Logout from './components/login/Logout';

class App extends Component {
  render(){
    return(
      <div>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/crear-envio/" component={CrearEnvio}/>
          <Route path="/notificar-envio/" component={NotificarEnvio}/>
          <Route path="/oficinas/" component={verOficina}/>
          <Route path="/centroslogisticos/" component={verCentroLogistico}/>
          <Route path="/login/" component={Login}/>
          <Route path="/logout/" component={Logout}/>
        </Switch>
      </div>
    );
  }
}

export default App;
