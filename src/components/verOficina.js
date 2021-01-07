import React, {Component} from 'react';

const apiUrl = "http://localhost:8080/ujapack/puntoscontrol/oficinas/";

// Creacion basica de un componente para consultar datos de una oficina en concreto
class verOficina extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            nombreProvincia: ""
        };
    }

    componentDidMount(){
        fetch(apiUrl + this.props.match.params.provincia)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        nombreProvincia: result.nombreProvincia
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
        const {error, isLoaded, nombreProvincia} = this.state;
        
        if(error){
            return(
                <div>Error: {error.message}</div>
            );
        } else if(!isLoaded){
            return(
                <div>Cargando...</div>
            );
        } else {
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
                                <td>{nombreProvincia}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

}

export default verOficina;