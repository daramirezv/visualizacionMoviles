import React, { Component } from "react";
import './App.css';
import { HorizontalBar } from 'react-chartjs-2';

class UsuariosEmpleo extends Component {

    constructor(props) {
        super(props);
        this.state = { titulos: [], valores: [] }
    }

    componentWillMount() {
        var arregloTemp = [];
        this.props.objetosUsuarios.forEach(usuarios => {

            var num = usuarios.data().Empleo;
            if (arregloTemp[num] == null) {
                arregloTemp[num] = 1;
            }
            else {
                arregloTemp[num] = arregloTemp[num] + 1;
            }
        });

        this.setState({ valores: arregloTemp });
    }

    render() {

        const data = {
            labels: Object.keys(this.state.valores),
            datasets: [{
                data: Object.values(this.state.valores),
                backgroundColor:
                    'rgba(100, 159, 64, 0.2)'
                ,
                borderColor:
                    'rgba(100, 159, 64, 1)'
                ,
                hoverBackgroundColor:
                    'rgba(54, 162, 235, 0.2)'
                ,
                hoverBorderColor:
                    'rgba(54, 162, 235, 1)'
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
                text: 'Profesión de los Usuarios',
                fontSize: 30,
                fontColor: '#000'
            },
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        return (
            <div>
                <HorizontalBar
                    data={data}
                    width={100}
                    height={500}
                    options={options}
                />
            </div>
        );
    }
}
export default UsuariosEmpleo;