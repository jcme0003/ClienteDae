import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import {Route, Switch} from 'react-router-dom';
//import verCentrosLogisticos from '../centroslogisticos/verCentrosLogisticos';

// Creacion basica de un componente de prueba
class Menu extends Component {

    render(){
        return(
            <div className="menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/envios">Envios</Link></li>
                    <li><Link to="/oficinas">Oficinas</Link></li>
                    <li><Link to="/centroslogisticos">Centros logisticos</Link></li>
                </ul>
            </div>
        );
    }

}

export default Menu;