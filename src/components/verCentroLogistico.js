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
        let errorCodigoCentro = <p className="p-3 mb-2 bg-danger text-white">No existe el centro logístico indicado</p>;
        let buscarCentro = 
        <div className="mt-3 text-center">
            <input type="text" id="input_centro" className="form-control col-4 d-inline" placeholder="ID centro logistico" name="centro" />
            <button type="button" className="btn btn-secondary mb-1" onClick={this.buscarCentroLogistico}>Buscar</button>
        </div>;

        if(error){
            return(
                <div className="container">
                    {errorCodigoCentro}
                    {buscarCentro}
                </div>
            );
        } else if(!isLoaded){
            return(
                <div className="container">
                    {buscarCentro}
                </div>
            );
        } else {
            return(
                <div className="container">
                    <p className="p-3 mb-2 bg-success text-white">Centro logístico con nombre {nombre} y localización en {localizacion} encontrada en el sistema.</p>
                    {buscarCentro}
                </div>
            );
        }
    }

}

export default verCentroLogistico;