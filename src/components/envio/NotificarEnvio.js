import React, {Component} from 'react';
import base64 from 'react-native-base64';

const apiUrl = "http://localhost:8080/ujapack/envios/";
var usuario = localStorage.getItem('usuario');
var contrasena = localStorage.getItem('contrasena');
var headers = new Headers();
headers.append("Authorization", "Basic " + base64.encode(usuario + ":" + contrasena));

// Creacion basica de un componente para notificar pasos por puntos de control de envios
class NotificarEnvio extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            ruta: null,
            localizador: "",
            estado: "",
            fechaLlegada: "",
            horaLlegada: "",
            importe: "",
            remitente: "",
            destinatario: "",
            usuario: usuario
        };
        this.buscarEnvio = this.buscarEnvio.bind(this);
        this.verRuta = this.verRuta.bind(this);
        this.notificarLlegadaCentro = this.notificarLlegadaCentro.bind(this);
        this.notificarLlegadaOficina = this.notificarLlegadaOficina.bind(this);
        this.notificarSalidaCentro = this.notificarSalidaCentro.bind(this);
        this.notificarSalidaOficina = this.notificarSalidaOficina.bind(this);
    }

    buscarEnvio(){
        fetch(apiUrl + document.getElementById("input_envio").value, {
            headers: headers
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        error: null,
                        isLoaded: true,
                        ruta: null,
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
        fetch(apiUrl + this.state.localizador + "/ruta", {
            headers: headers
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        error: null,
                        isLoaded: true,
                        ruta: result
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

    notificarLlegadaCentro(id){
        fetch(apiUrl + this.state.localizador + "/notificarcentrologistico/" + id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(usuario + ':' + contrasena)
            },
            body: JSON.stringify(
                'llegada'
            )
        });

        this.verRuta();
    }

    notificarLlegadaOficina(id){
        fetch(apiUrl + this.state.localizador + "/notificaroficina/" + id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(usuario + ':' + contrasena)
            },
            body: JSON.stringify(
                'llegada'
            )
        });

        this.verRuta();
    }

    notificarSalidaCentro(id){
        fetch(apiUrl + this.state.localizador + "/notificarcentrologistico/" + id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(usuario + ':' + contrasena)
            },
            body: JSON.stringify(
                'salida'
            )
        });

        this.verRuta();
    }
    
    notificarSalidaOficina(id){
        fetch(apiUrl + this.state.localizador + "/notificaroficina/" + id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(usuario + ':' + contrasena)
            },
            body: JSON.stringify(
                'salida'
            )
        });

        this.verRuta();
    }

    render(){
        const {error, isLoaded, localizador, estado, fechaLlegada, horaLlegada, importe, remitente, destinatario, ruta} = this.state;
        let accesoDenegado = <p className="p-3 mb-2 bg-danger text-white text-center">ACCESO DENEGADO</p>;
        let errorCodigoEnvio = <p className="p-3 mb-2 bg-danger text-white">No existe ningun envio con el codigo indicado</p>;
        let buscarEnvio =
        <div className="mt-3 text-center">
            <input type="text" id="input_envio" className="form-control col-6 d-inline" placeholder="Localizador de envío" name="envio" />
            <button type="button" className="btn btn-secondary mb-1" onClick={this.buscarEnvio}>Buscar</button>
        </div>;
        let datosEnvioRuta =
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Localizador</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha de llegada</th>
                        <th scope="col">Hora de llegada</th>
                        <th scope="col">Importe</th>
                        <th scope="col">DNI remitente</th>
                        <th scope="col">DNI destinatario</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{localizador}</td>
                        <td>{estado}</td>
                        <td>{fechaLlegada}</td>
                        <td>{horaLlegada}</td>
                        <td>{importe} €</td>
                        <td>{remitente}</td>
                        <td>{destinatario}</td>
                        <td><button type="button" className="btn btn-secondary" onClick={this.verRuta}>Ver ruta</button></td>
                    </tr>
                </tbody>
            </table>;
        
        if(usuario !== "operario"){
            return(
                <div className="container">
                    {accesoDenegado}
                </div>
            );
        } else if(!isLoaded){
            return(
                <div className="container">
                    {buscarEnvio}
                </div>
            );
        } else if(error){
            return(
                <div className="container">
                    {errorCodigoEnvio}
                    {buscarEnvio}
                </div>
            );
        } else if(!ruta){
            return(
                <div className="container">
                    {buscarEnvio}
                    {datosEnvioRuta}
                </div>
            );
        } else if(!error && ruta) {
            return(
                <div className="container">
                    {buscarEnvio}
                    {datosEnvioRuta}
                    <div className="text-center">
                        <h3>Ruta envío #{localizador}</h3>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td className="font-weight-bold" colSpan="2">Fecha llegada</td>
                                    <td className="font-weight-bold" colSpan="2">Fecha salida</td>
                                </tr>
                                {ruta.ruta.map((ppc, i) => {
                                    if(ppc.tipo === "OFICINA"){
                                        return(
                                            <tr key={i}>
                                                <td>Oficina: {ppc.id}</td>
                                                <td>{ppc.fechaLlegada}</td>
                                                <td><button type="button" className="btn btn-secondary" onClick={() => this.notificarLlegadaOficina(ppc.id)}>Notificar llegada</button></td>
                                                <td>{ppc.fechaSalida}</td>
                                                <td><button type="button" className="btn btn-secondary" onClick={() => this.notificarSalidaOficina(ppc.id)}>Notificar salida</button></td>
                                            </tr>
                                        );
                                    } else {
                                        return(
                                            <tr key={i}>
                                                <td>ID centro logístico: {ppc.id}</td>
                                                <td>{ppc.fechaLlegada}</td>
                                                <td><button type="button" className="btn btn-secondary" onClick={() => this.notificarLlegadaCentro(ppc.id)}>Notificar llegada</button></td>
                                                <td>{ppc.fechaSalida}</td>
                                                <td><button type="button" className="btn btn-secondary" onClick={() => this.notificarSalidaCentro(ppc.id)}>Notificar salida</button></td>
                                            </tr>
                                        );
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="container">
                    {buscarEnvio}
                </div>
            );
        }
    }

}

export default NotificarEnvio;