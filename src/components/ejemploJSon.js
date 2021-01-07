import React, {Component} from 'react';

// Creacion basica de un componente de prueba
class ejemploJSon extends Component {

    render(){
        let receta = {
            nombre: "Pizza",
            ingredientes: ["Tomate", "Queso", "Jamón York"],
            calorias: 400
        };
        return(
            <div>
                <h1>{"Receta: " + receta.nombre}</h1>
                <h2>{"Calorías: " + receta.calorias}</h2>
                <ol>
                {
                    receta.ingredientes.map((ingrediente, i) => {
                        return(<li key={i}>{ingrediente}</li>);
                    })
                }
                </ol>
            </div>
        );
    }

}

export default ejemploJSon;