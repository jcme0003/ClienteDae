import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MenuDatos from './MenuDatos';

// Creacion basica de un componente de prueba
class Menu extends Component {
    render(){
        return(
            <div className="menu">
                <ul>
                {MenuDatos.map((item, i) => {
                    return(
                        <li key={i}>
                            <Link to={item.path}>{item.titulo}</Link>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
}

export default Menu;