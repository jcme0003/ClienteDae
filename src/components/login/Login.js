import React, {Component} from 'react';

// Creacion basica de un componente para realizar el login en nuestra aplicacion
class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: null,
            login: false,
            isLoaded: false
        };
        this.checkLogin = this.checkLogin.bind(this);
    }

    checkLogin() {
        let usuario = document.getElementById("inputUsuario").value;
        let contrasena = document.getElementById("inputContrasena").value;
        if((usuario === "usuario" && contrasena === "usuario") || (usuario === "admin" && contrasena === "admin")){
            this.setState({
                login: true,
                isLoaded: true
            });
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('contrasena', contrasena);
        } else {
            this.setState({
                login: false,
                isLoaded: true
            });
        }
    }

    render(){
        const {isLoaded, login} = this.state;
        let errorLogin = <p className="p-3 mb-2 bg-danger text-white">Usuario incorrecto</p>;
        let okLogin = <p className="p-3 mb-2 bg-success text-white">Login correcto</p>;
        let formLogin =
            <div className="mt-3 text-center">
                <input type="text" id="inputUsuario" className="form-control col-lg-4 mx-auto" placeholder="Usuario" name="usuario" />
                <input type="password" id="inputContrasena" className="form-control col-lg-4 mx-auto" placeholder="Contraseña" name="contrasena" />
                <button type="button" className="btn btn-secondary mt-3 mx-auto" onClick={this.checkLogin}>Login</button>
            </div>;

        if(isLoaded && !login){
            return(
                <div className="container">
                    {errorLogin}
                    {formLogin}
                </div>
            );
        } else if(isLoaded && login){
            return(
                <div className="container">
                    {okLogin}
                    {formLogin}
                </div>
            );
        } else {
            return(
                <div className="container">
                    {formLogin}
                </div>
            );
        }
        

    }
}

export default Login;