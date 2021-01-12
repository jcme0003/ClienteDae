import React, {Component} from 'react';
import base64 from 'react-native-base64';

const apiUrl = "http://localhost:8080/ujapack/envios/";
var usuario = localStorage.getItem('usuario');
var contrasena = localStorage.getItem('contrasena');
var headers = new Headers();
headers.append("Authorization", "Basic " + base64.encode(usuario + ":" + contrasena));

// Creacion basica de un componente para crear envios
class CrearEnvio extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            creado: false,
            localizador: "",
            estado: "",
            fechaLlegada: "",
            horaLlegada: "",
            importe: "",
            remitente: "",
            destinatario: "",
            usuario: usuario
        };
        this.crearEnvio = this.crearEnvio.bind(this);
        this.buscarEnvio = this.buscarEnvio.bind(this);
    }

    crearEnvio(){
        var paquete = {
            peso: document.getElementById("fpeso").value,
            anchura: document.getElementById("fanchura").value,
            altura: document.getElementById("faltura").value,
            profundidad: document.getElementById("fprofundidad").value
        };

        var remitente = {
            dni: document.getElementById("fdnir").value,
            nombre: document.getElementById("fnombrer").value,
            apellidos: document.getElementById("fapellidosr").value,
            direccion: document.getElementById("fdireccionr").value,
            provincia: document.getElementById("fprovinciar").value,
            telefono: document.getElementById("ftelefonor").value,
            email: document.getElementById("femailr").value
        }

        var destinatario = {
            dni: document.getElementById("fdnid").value,
            nombre: document.getElementById("fnombred").value,
            apellidos: document.getElementById("fapellidosd").value,
            direccion: document.getElementById("fdirecciond").value,
            provincia: document.getElementById("fprovinciad").value,
            telefono: document.getElementById("ftelefonod").value,
            email: document.getElementById("femaild").value
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(usuario + ':' + contrasena)
            },
            body: JSON.stringify({
                paquetes: [
                    paquete
                ],
                remitente: remitente,
                destinatario: destinatario
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    error: null,
                    isLoaded: true,
                    creado: true,
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
        );
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
                        creado: false,
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
        const {error, isLoaded, creado, localizador, estado, fechaLlegada, horaLlegada, importe, remitente, destinatario} = this.state;
        let accesoDenegado = <p className="p-3 mb-2 bg-danger text-white text-center">ACCESO DENEGADO</p>;
        let errorCodigoEnvio = <p className="p-3 mb-2 bg-danger text-white">Se ha producido un error inexperado</p>;
        let buscarEnvio =
        <div className="mt-3 text-center">
            <input type="text" id="input_envio" className="form-control col-6 d-inline" placeholder="Localizador de envío" name="envio" />
            <button type="button" className="btn btn-secondary mb-1" onClick={this.buscarEnvio}>Buscar</button>
        </div>;
        let textCrearEnvio = <h2 className="text-center">Crear nuevo envío</h2>;
        let formCrearEnvio =
            <div>
                <div className="border border-1 p-3 col-lg-4 float-left">
                <h3>Datos remitente</h3>
                <label className="form-label mr-3">DNI: </label>
                <input type="text" id="fdnir" className="form-control" name="fdnir" />
                <label className="form-label mr-3">Nombre: </label>
                <input type="text" id="fnombrer" className="form-control" name="fnombrer" />
                <label className="form-label mr-3">Apellidos: </label>
                <input type="text" id="fapellidosr" className="form-control" name="fapellidosr" />
                <label className="form-label mr-3">Dirección: </label>
                <input type="text" id="fdireccionr" className="form-control" name="fdireccionr" />
                <label className="form-label mr-3">Provincia: </label>
                <input type="text" id="fprovinciar" className="form-control" name="fprovinciar" />
                <label className="form-label mr-3">Teléfono: </label>
                <input type="text" id="ftelefonor" className="form-control" name="ftelefonor" />
                <label className="form-label mr-3">Email: </label>
                <input type="email" id="femailr" className="form-control" name="femailr" />
                </div>
                
                <div className="border border-1 p-3 col-lg-4 float-left">
                <h3>Datos destinatario</h3>
                <label className="form-label mr-3">DNI: </label>
                <input type="text" id="fdnid" className="form-control" name="fdnid" />
                <label className="form-label mr-3">Nombre: </label>
                <input type="text" id="fnombred" className="form-control" name="fnombred" />
                <label className="form-label mr-3">Apellidos: </label>
                <input type="text" id="fapellidosd" className="form-control" name="fapellidosd" />
                <label className="form-label mr-3">Dirección: </label>
                <input type="text" id="fdirecciond" className="form-control" name="fdirecciond" />
                <label className="form-label mr-3">Provincia: </label>
                <input type="text" id="fprovinciad" className="form-control" name="fprovinciad" />
                <label className="form-label mr-3">Teléfono: </label>
                <input type="text" id="ftelefonod" className="form-control" name="ftelefonod" />
                <label className="form-label mr-3">Email: </label>
                <input type="email" id="femaild" className="form-control" name="femaild" />
                </div>

                <div className="border border-1 p-3 col-lg-4 float-left">
                <h3>Paquete</h3>
                <label className="form-label mr-3">Peso</label>
                <input type="text" id="fpeso" className="form-control" name="fpeso" />
                <label className="form-label mr-3">Anchura: </label>
                <input type="text" id="fanchura" className="form-control" name="fanchura" />
                <label className="form-label mr-3">Altura: </label>
                <input type="text" id="faltura" className="form-control" name="faltura" />
                <label className="form-label mr-3">Profundidad: </label>
                <input type="text" id="fprofundidad" className="form-control" name="fprofundidad" />
                </div>

                <button type="button" className="btn btn-secondary" onClick={this.crearEnvio}>Crear envío</button>
            </div>;
        let datosEnvio =
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
                    </tr>
                </tbody>
            </table>;
        
        if(usuario !== "admin"){
            return(
                <div className="container">
                    {accesoDenegado}
                </div>
            );
        } else if(!isLoaded){
            return(
                <div className="container">
                    {buscarEnvio}
                    {textCrearEnvio}
                    {formCrearEnvio}
                </div>
            );
        } else if(creado){
            return(
                <div className="container">
                    <p className="p-3 mb-2 bg-success text-white">Envío creado con éxito, con localizador #{localizador}</p>
                    {buscarEnvio}
                    {textCrearEnvio}
                    {formCrearEnvio}
                </div>
            );
        } else if(error){
            return(
                <div className="container">
                    {errorCodigoEnvio}
                    {buscarEnvio}
                    {textCrearEnvio}
                    {formCrearEnvio}
                </div>
            );
        } else if(!error) {
            return(
                <div className="container">
                    {buscarEnvio}
                    {datosEnvio}
                    {textCrearEnvio}
                    {formCrearEnvio}
                </div>
            );
        } else {
            return(
                <div className="container">
                    {buscarEnvio}
                    {textCrearEnvio}
                    {formCrearEnvio}
                </div>
            );
        }
    }

}

export default CrearEnvio;