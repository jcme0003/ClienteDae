import React, {Component} from 'react';

// Creacion basica de un componente para realizar el logout en nuestra aplicacion
class Logout extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoaded: false
        };
        
        this.logout = this.logout.bind(this);
    }

    logout(){
        localStorage.clear();
        this.setState({
            isLoaded: true
        });
    }

    render(){
        const {isLoaded} = this.state;
        let logout = <p className="p-3 mb-2 bg-warning text-white">Logout correcto</p>;
        let buttonLogout = <button type="button" className="btn btn-danger mt-3 mx-auto" onClick={this.logout}>Logout</button>;
        
        if(isLoaded){
            return(
                <div className="container text-center">
                    {logout}
                    {buttonLogout}
                </div>
            );
        } else {
            return(
                <div className="container text-center">
                    {buttonLogout}
                </div>
            );
        }
    }
}

export default Logout;