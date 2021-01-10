import React, {Component} from 'react';

const apiUrl = "http://localhost:8080/ujapack/puntoscontrol/oficinas/";

// Creacion basica de un componente para consultar datos de una oficina en concreto
class verOficina extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            provincia: ""
        };
        this.buscarOficina = this.buscarOficina.bind(this);
    }

    buscarOficina() {
        let oficina = document.getElementById("input_oficina").value;
        fetch(apiUrl + oficina)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        error: null,
                        provincia: result.nombreProvincia,
                        isLoaded: true
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
        const {error, isLoaded, provincia} = this.state;
        let errorCodigoOficina = <p className="p-3 mb-2 bg-danger text-white">No existe oficina en la provincia indicada</p>;
        let buscarOficina = 
        <div className="mt-3 text-center">
            <input type="text" id="input_oficina" className="form-control col-4 d-inline" placeholder="Nombre de provincia" name="oficina" />
            <button type="button" className="btn btn-secondary mb-1" onClick={this.buscarOficina}>Buscar</button>
        </div>;

        if(error) {
            return(
                <div className="container">
                    {errorCodigoOficina}
                    {buscarOficina}
                </div>
            );
        } else if(!isLoaded) {
            return(
                <div className="container">
                    {buscarOficina}
                </div>
            );
        } else {
            return(
                <div className="container">
                    <p className="p-3 mb-2 bg-success text-white">Oficina con nombre {provincia} encontrada en el sistema.</p>
                    {buscarOficina}
                </div>
            );
        }
    }

}

export default verOficina;