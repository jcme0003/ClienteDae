import React, {Component} from 'react';

const apiUrl = "http://localhost:8080/ujapack/puntoscontrol/centroslogisticos/";

// Creacion basica de un componente para consultar datos de una oficina en concreto
class verCentroLogistico extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            nombre: "",
            localizacion: ""
        };
        this.buscarCentroLogistico = this.buscarCentroLogistico.bind(this);
    }

    buscarCentroLogistico(){
        fetch(apiUrl + document.getElementById("input_centro").value)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        error: null,
                        isLoaded: true,
                        nombre: result.nombre,
                        localizacion: result.localizacion
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render(){
        const {error, isLoaded, nombre, localizacion} = this.state;
        
        if(error){
            return(
                <div>
                    <h6>El centro logistico indicado no existe</h6>
                    <input type="text" id="input_centro" name="centro" />
                    <button onClick={this.buscarCentroLogistico}>Buscar</button>
                </div>
            );
        } else if(!isLoaded){
            return(
                <div>
                    <input type="text" id="input_centro" name="centro" />
                    <button onClick={this.buscarCentroLogistico}>Buscar</button>
                </div>
            );
        } else {
            return(
                <div>
                    <div>
                        <input type="text" id="input_centro" name="centro" />
                        <button onClick={this.buscarCentroLogistico}>Buscar</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre Centro logístico</th>
                                <th>Localización</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{nombre}</td>
                                <td>{localizacion}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

}

export default verCentroLogistico;