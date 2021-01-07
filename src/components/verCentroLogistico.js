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
    }

    componentDidMount(){
        fetch(apiUrl + this.props.match.params.id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
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