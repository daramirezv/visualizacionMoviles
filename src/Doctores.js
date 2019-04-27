import React, { Component } from "react";
import './App.css';

class Doctores extends Component {

    constructor(props) {
        super(props);
        this.state = { titulos: [], valores: [] }
        this.darDoctores = this.darDoctores.bind(this);
    }

    componentWillMount() {
        var arregloTemp = [];
        this.props.objetosDoctores.forEach(doctor => {

            var nombre = doctor.data().Nombre;
            var cedula = doctor.data().Cedula;
            var localizacion = doctor.data().Localizacion;

            arregloTemp.push({ "nombre": nombre, "cedula": cedula, "localizacion": localizacion })

        });
        this.setState({ valores: arregloTemp });
    }

    darDoctores() {
        let localizacionesTemp = this.state.valores;

        return localizacionesTemp.map((aplicacion) => {
            return (
                <tr key={aplicacion.cedula}>
                    <td>{aplicacion.nombre}</td>
                    <td>{aplicacion.cedula}</td>
                    <td>{aplicacion.localizacion}</td>
                </tr>
            );
        });
    }

    render() {

        return (
            <div>
                <h3 className="infoInicial">Doctores Registrados</h3>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cedula</th>
                            <th scope="col">Localizacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.darDoctores()}
                    </tbody>
                </table>

            </div>
        );
    }
}
export default Doctores;