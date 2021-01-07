import React, {Component} from 'react';

const apiUrl = "http://localhost:8080/ujapack/envios/";

// Creacion basica de un componente para consultar datos de una oficina en concreto
class verCentroLogistico extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            localizador: "",
            estado: "",
            fechaLlegada: "",
            horaLlegada: "",
            importe: "",
            remitente: "",
            destinatario: ""
        };
    }

    componentDidMount(){
        fetch(apiUrl + this.props.match.params.localizador)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        localizador: result.localizador,
                        estado: result.estado,
                        fechaLlegada: result.fechaLlegada,
                        horaLlegada: result.horaLlegada,
                        importe: result.importe,
                        remitente: result.remitente,
                        destinatario: result.destinatario
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
        const {error, isLoaded, localizador, estado, fechaLlegada, horaLlegada, importe, remitente, destinatario} = this.state;
        
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
                    <h1>Envio: {localizador}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Localizador</th>
                                <th>Estado</th>
                                <th>Fecha de llegada</th>
                                <th>Hora de llegada</th>
                                <th>Importe</th>
                                <th>DNI remitente</th>
                                <th>DNI destinatario</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{localizador}</td>
                                <td>{estado}</td>
                                <td>{fechaLlegada}</td>
                                <td>{horaLlegada}</td>
                                <td>{importe}</td>
                                <td>{remitente}</td>
                                <td>{destinatario}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

}

export default verCentroLogistico;