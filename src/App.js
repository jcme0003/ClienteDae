import React, { Component } from 'react';
import './assets/css/App.css';
import Menu from './components/menu/menu';
import {Route, Switch} from 'react-router-dom';
import verCentrosLogisticos from './components/centroslogisticos/verCentrosLogisticos';
import verOficina from './components/oficinas/verOficina';

class App extends Component {
  render(){
    return(
      <div className="App">
        <Menu/>
        <Switch>
          <Route path='/oficinas/' component={verOficina}/>
          <Route path="/centroslogisticos" component={verCentrosLogisticos}/>
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
