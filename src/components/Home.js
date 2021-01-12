import React, {Component} from 'react';

class Home extends Component {
    render(){
        return(
            <div className="container text-center">
                <h1>Bienvenido al cliente de UjaPack</h1>
                <h2>Admin</h2>
                <p>El admin (admin, admin) podrá consultar oficinas, crear envios y crear un nuevo envío</p>
                <h2>Operario</h2>
                <p>El operario (operario, operario) podrá consultar oficina, consultar centros logisticos y notificar paso por puntos de control de un envio</p>
                <h4>Si no te logueas en el sistema podrás visitar la página de inicio</h4>
            </div>
        );
    }
}

export default Home;