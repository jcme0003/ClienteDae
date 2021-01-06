import React, {Component} from 'react';

const apiUrl = "http://localhost:8080/ujapack/puntoscontrol/oficinas/madrid";

// Creacion basica de un componente para consultar datos de una oficina en concreto
class verOficina extends Component {
    constructor(props){
        super(props);

        this.state = {
            nombreOficina: "",
        };
    }

    componentDidMount(){
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data => this.setState({nombreOficina: data.nombreProvincia})));
    }

    render(){
        return(
            <div>
                <h1>PRUEBA</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre Oficina</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.nombreOficina}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default verOficina;