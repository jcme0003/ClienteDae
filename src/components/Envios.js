import React, {Component} from 'react';

const apiUrl = "http://localhost:8080/ujapack/envios/";

// Creacion basica de un componente para consultar datos de una oficina en concreto
class Envios extends Component {
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
            destinatario: ""
        };
        this.crearEnvio = this.crearEnvio.bind(this);
        this.buscarEnvio = this.buscarEnvio.bind(this);
        this.verRuta = this.verRuta.bind(this);
        this.notificarLlegadaCentro = this.notificarLlegadaCentro.bind(this);
        this.notificarLlegadaOficina = this.notificarLlegadaOficina.bind(this);
        this.notificarSalidaCentro = this.notificarSalidaCentro.bind(this);
        this.notificarSalidaOficina = this.notificarSalidaOficina.bind(this);
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

        console.log(JSON.stringify({
            paquetes: [
                paquete
            ],
            remitente: remitente,
            destinatario: destinatario
        }));

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paquetes: [
                    paquete
                ],
                remitente: remitente,
                destinatario: destinatario
            })
        });
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
        fetch(apiUrl + this.state.localizador + "/ruta")
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                'salida'
            )
        });

        this.verRuta();
    }

    render(){
        const {error, isLoaded, localizador, estado, fechaLlegada, horaLlegada, importe, remitente, destinatario, ruta} = this.state;

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
                    <p>Crear nuevo envío</p>
                    <form>
                        <p>Paquetes</p>
                        <label>Peso: </label>
                        <input type="text" id="fpeso" name="fpeso" />
                        <label>Anchura: </label>
                        <input type="text" id="fanchura" name="fanchura" />
                        <label>Altura: </label>
                        <input type="text" id="faltura" name="faltura" />
                        <label>Profundidad: </label>
                        <input type="text" id="fprofundidad" name="fprofundidad" />
                        <p>Datos remitente</p>
                        <label>DNI: </label>
                        <input type="text" id="fdnir" name="fdnir" />
                        <label>Nombre: </label>
                        <input type="text" id="fnombrer" name="fnombrer" />
                        <label>Apellidos: </label>
                        <input type="text" id="fapellidosr" name="fapellidosr" />
                        <label>Dirección: </label>
                        <input type="text" id="fdireccionr" name="fdireccionr" />
                        <label>Provincia: </label>
                        <input type="text" id="fprovinciar" name="fprovinciar" />
                        <label>Teléfono: </label>
                        <input type="text" id="ftelefonor" name="ftelefonor" />
                        <label>Email: </label>
                        <input type="email" id="femailr" name="femailr" />
                        <p>Datos destinatario</p>
                        <label>DNI: </label>
                        <input type="text" id="fdnid" name="fdnid" />
                        <label>Nombre: </label>
                        <input type="text" id="fnombred" name="fnombred" />
                        <label>Apellidos: </label>
                        <input type="text" id="fapellidosd" name="fapellidosd" />
                        <label>Dirección: </label>
                        <input type="text" id="fdirecciond" name="fdirecciond" />
                        <label>Provincia: </label>
                        <input type="text" id="fprovinciad" name="fprovinciad" />
                        <label>Teléfono: </label>
                        <input type="text" id="ftelefonod" name="ftelefonod" />
                        <label>Email: </label>
                        <input type="email" id="femaild" name="femaild" />

                        <input type="button" value="Crear envio" onClick={this.crearEnvio} />
                    </form>
                </div>
            );
        } else if(ruta){
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
                            <tfoot>
                                <tr>
                                    <td>Ruta</td>
                                </tr>
                                <tr>
                                    <td>Fecha llegada</td>
                                    <td></td>
                                    <td>Fecha salida</td>
                                    <td></td>
                                </tr>
                                {ruta.ruta.map((ppc, i) => {
                                    if(ppc.tipo === "OFICINA"){
                                        return(
                                            <tr key={i}>
                                                <td>{ppc.fechaLlegada}</td>
                                                <td><input type="button" value="Notificar llegada" onClick={() => this.notificarLlegadaOficina(ppc.id)} /></td>
                                                <td>{ppc.fechaSalida}</td>
                                                <td><input type="button" value="Notificar salida" onClick={() => this.notificarSalidaOficina(ppc.id)} /></td>
                                            </tr>
                                        );
                                    } else {
                                        return(
                                            <tr key={i}>
                                                <td>{ppc.fechaLlegada}</td>
                                                <td><input type="button" value="Notificar llegada" onClick={() => this.notificarLlegadaCentro(ppc.id)} /></td>
                                                <td>{ppc.fechaSalida}</td>
                                                <td><input type="button" value="Notificar salida" onClick={() => this.notificarSalidaCentro(ppc.id)} /></td>
                                            </tr>
                                        );
                                    }
                                })}
                            </tfoot>
                        </table>
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
                        <tfoot id="datosRuta">

                        </tfoot>
                    </table>

                    <p>Crear nuevo envío</p>
                    <form>
                        <p>Paquetes</p>
                        <label>Peso: </label>
                        <input type="text" id="fpeso" name="fpeso" />
                        <label>Anchura: </label>
                        <input type="text" id="fanchura" name="fanchura" />
                        <label>Altura: </label>
                        <input type="text" id="faltura" name="faltura" />
                        <label>Profundidad: </label>
                        <input type="text" id="fprofundidad" name="fprofundidad" />
                        <p>Datos remitente</p>
                        <label>DNI: </label>
                        <input type="text" id="fdnir" name="fdnir" />
                        <label>Nombre: </label>
                        <input type="text" id="fnombrer" name="fnombrer" />
                        <label>Apellidos: </label>
                        <input type="text" id="fapellidosr" name="fapellidosr" />
                        <label>Dirección: </label>
                        <input type="text" id="fdireccionr" name="fdireccionr" />
                        <label>Provincia: </label>
                        <input type="text" id="fprovinciar" name="fprovinciar" />
                        <label>Teléfono: </label>
                        <input type="text" id="ftelefonor" name="ftelefonor" />
                        <label>Email: </label>
                        <input type="email" id="femailr" name="femailr" />
                        <p>Datos destinatario</p>
                        <label>DNI: </label>
                        <input type="text" id="fdnid" name="fdnid" />
                        <label>Nombre: </label>
                        <input type="text" id="fnombred" name="fnombred" />
                        <label>Apellidos: </label>
                        <input type="text" id="fapellidosd" name="fapellidosd" />
                        <label>Dirección: </label>
                        <input type="text" id="fdirecciond" name="fdirecciond" />
                        <label>Provincia: </label>
                        <input type="text" id="fprovinciad" name="fprovinciad" />
                        <label>Teléfono: </label>
                        <input type="text" id="ftelefonod" name="ftelefonod" />
                        <label>Email: </label>
                        <input type="email" id="femaild" name="femaild" />

                        <input type="button" value="Crear envio" onClick={this.crearEnvio} />
                    </form>
                </div>
            );
        }
    }

}

export default Envios;