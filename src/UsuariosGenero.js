import React, { Component } from "react";
import './App.css';
import { Pie } from 'react-chartjs-2';

class UsuariosGenero extends Component {

    constructor(props) {
        super(props);
        this.state = { titulos: [], valores: [] }
    }

    componentWillMount() {
        var arregloTemp = [];
        arregloTemp[0] = 0;
        arregloTemp[1] = 0;
        this.props.objetosUsuarios.forEach(usuario => {

            var num = usuario.data().Género;
            if (num === "Masculino") {
                arregloTemp[1]++;
            }
            else {
                arregloTemp[0]++
            }
        });

        this.setState({ valores: arregloTemp });
    }

    render() {

        const data = {
            labels: ["Femenino", "Masculino"],
            datasets: [{
                data: this.state.valores,
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(54, 162, 235, 0.2)']
                ,
                borderColor:
                    ['rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 1)']
                ,
                borderWidth: 1

            }]
        }

        const options = {
            legend: {
                display: false
            },
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 50,
                    bottom: 50
                }
            },
            title: {
                display: true,
                text: 'Género de los Usuarios',
                fontSize: 30,
                fontColor: '#000'
            },
            maintainAspectRatio: false
        }

        return (
            <div>
                <Pie
                    data={data}
                    width={100}
                    height={500}
                    options={options}
                />
            </div>
        );
    }
}
export default UsuariosGenero;