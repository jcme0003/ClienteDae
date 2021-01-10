import './assets/css/App.css';
import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Menu from './components/menu/Menu';
import Home from './components/Home';
import verCentroLogistico from './components/verCentroLogistico';
import verOficina from './components/verOficina';
import Envios from './components/Envios';

class App extends Component {
  render(){
    return(
      <div>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/envios/" component={Envios}/>
          <Route path="/oficinas/" component={verOficina}/>
          <Route path="/centroslogisticos/" component={verCentroLogistico}/>
        </Switch>
      </div>
    );
  }
}

/* -- CODIGO DE EJEMPLO --
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <section className="componentes">
          <MiComponente/>
          <MiComponenteDestructuring/>
        </section>
      </header>
    </div>
  );
}*/

export default App;
