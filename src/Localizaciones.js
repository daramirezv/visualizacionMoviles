import React, { Component } from "react";
import './App.css';

class Localizaciones extends Component {

    constructor(props) {
        super(props);
        this.state = { titulos: [], valores: [] }
        this.darSitios = this.darSitios.bind(this);
    }

    componentWillMount() {
        var arregloTemp = [];
        this.props.objetosSitios.forEach(localizacion => {

            var nombre = localizacion.data().nombre;
            var latitud = localizacion.data().latitud;
            var longitud = localizacion.data().longitud;

            arregloTemp.push({ "nombre": nombre, "latitud": latitud, "longitud": longitud })

        });
        this.setState({ valores: arregloTemp });
    }

    darSitios() {
        let localizacionesTemp = this.state.valores;

        return localizacionesTemp.map((aplicacion) => {
            return (
                <tr>
                    <td>{aplicacion.nombre}</td>
                    <td>{aplicacion.latitud}</td>
                    <td>{aplicacion.longitud}</td>
                </tr>
            );
        });
    }

    render() {

        return (
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Latitud</th>
                            <th scope="col">Longitud</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.darSitios()}
                    </tbody>
                </table>

            </div>
        );
    }
}
export default Localizaciones;