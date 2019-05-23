import React, { Component } from "react";
import './App.css';

class UsuarioTabla extends Component {

    constructor(props) {
        super(props);
        this.state = { titulos: [], valores: [] }
        this.darUsuarios = this.darUsuarios.bind(this);
    }

    componentWillMount() {
        var arregloTemp = [];
        this.props.objetosUsuarios.forEach(usuario => {

            var nombre = usuario.data().Nombre;
            var cedula = usuario.data().Cédula;
            var ciudad = usuario.data().Ciudad;

            arregloTemp.push({ "nombre": nombre, "cedula": cedula, "ciudad": ciudad })

        });
        this.setState({ valores: arregloTemp });
    }

    darUsuarios() {
        let temp = this.state.valores;

        return temp.map((aplicacion, i) => {
            return (
                <tr key={i}>
                    <td>{aplicacion.nombre}</td>
                    <td>{aplicacion.cedula}</td>
                    <td>{aplicacion.ciudad}</td>
                </tr>
            );
        });
    }

    render() {

        return (
            <div>
                <h3 className="infoInicial">Usuarios Registrados</h3>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cedula</th>
                            <th scope="col">Ciudad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.darUsuarios()}
                    </tbody>
                </table>

            </div>
        );
    }
}
export default UsuarioTabla;