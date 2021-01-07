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
        this.buscarEnvio = this.buscarEnvio.bind(this);
        this.verRuta = this.verRuta.bind(this);
    }

    buscarEnvio(){
        fetch(apiUrl + document.getElementById("input_envio").value)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        error: null,
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

    verRuta(){
        console.log("RUTA");
    }

    render(){
        const {error, isLoaded, localizador, estado, fechaLlegada, horaLlegada, importe, remitente, destinatario} = this.state;
        
        if(error){
            return(
                <div>
                    <h6>No existe ningun envio con el codigo indicado</h6>
                    <input type="text" id="input_envio" name="envio" />
                    <button onClick={this.buscarEnvio}>Buscar</button>
                </div>
            );
        } else if(!isLoaded){
            return(
                <div>
                    <input type="text" id="input_envio" name="envio" />
                    <button onClick={this.buscarEnvio}>Buscar</button>
                </div>
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
                                <th></th>
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
                                <td><button onClick={this.verRuta}>Ver ruta</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

}

export default verCentroLogistico;