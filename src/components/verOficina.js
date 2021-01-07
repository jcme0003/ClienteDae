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

        if(error) {
            return(
                <div>
                    <h6>No existe la provincia indicada</h6>
                    <input type="text" id="input_oficina" name="oficina" />
                    <button onClick={this.buscarOficina}>Buscar</button>
                </div>
            );
        } else if(!isLoaded) {
            return(
                <div>
                    <input type="text" id="input_oficina" name="oficina" />
                    <button onClick={this.buscarOficina}>Buscar</button>
                </div>
            );
        } else {
            return(
                <div>
                    <div>
                        <input type="text" id="input_oficina" name="oficina" />
                        <button onClick={this.buscarOficina}>Buscar</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre Oficina</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{provincia}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

}

export default verOficina;