import React, { Component } from "react";
import './App.css';
import { Bar } from 'react-chartjs-2';

class GraficaParteCuerpo extends Component {

    constructor(props) {
        super(props);
        this.state = { titulos: [], valores: [] }
    }

    componentWillMount() {
        var arregloTemp = [];
        this.props.objetosEjercicios.forEach(ejercicios => {

            var num = ejercicios.data().parteCuerpo;

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
                    'rgba(255, 99, 132, 0.2)'
                ,
                borderColor:
                    'rgba(255, 99, 132, 1)'
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
                text: 'Parte del Cuerpo Tratada por los Ejercicios',
                fontSize: 30,
                fontColor: '#000'
            },
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        return (
            <div>
                <Bar
                    data={data}
                    width={100}
                    height={500}
                    options={options}
                />
            </div>
        );
    }
}
export default GraficaParteCuerpo;