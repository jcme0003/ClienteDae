import React, {Component} from 'react';

class Home extends Component {

    render(){
        return(
            <div className="container text-center">
                <h1>Bienvenido al cliente de UjaPack</h1>
                <h2>Usuario</h2>
                <p>El usuario podrá consultar oficina, consultar centros logisticos y envios</p>
                <h2>Admin</h2>
                <p>El administrador podrá hacer de todos, desde consultar oficinas hasta crear envios y notificar pasos por puntos de control</p>
                <h4>Si no te logueas en el sistema no podrás pasar de la página de inicio</h4>
            </div>
        );
    }

}

export default Home;