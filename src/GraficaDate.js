import React, { Component } from "react";
import './App.css';
import { Line } from 'react-chartjs-2';

class GraficaDate extends Component {

    constructor(props) {
        super(props);
        this.state = { titulos: [], valores: [] }
    }

    componentWillMount() {
        var arregloTemp = [];
        this.props.objetosEjercicios.forEach(ejercicios => {

            var num = ejercicios.data().creacion;
            var dia = new Date(num);

            if (arregloTemp["mes " + (dia.getMonth() + 1)] == null) {
                arregloTemp["mes " + (dia.getMonth() + 1)] = 1;
            }
            else {
                arregloTemp["mes " + (dia.getMonth() + 1)] = arregloTemp["mes " + (dia.getMonth() + 1)] + 1;
            }
        });

        arregloTemp.sort();

        this.setState({ valores: arregloTemp });
    }

    render() {

        const data = {
            labels: Object.keys(this.state.valores),
            datasets: [{
                data: Object.values(this.state.valores),
                borderColor:
                    'rgba(255, 99, 132, 1)'
                ,
                fill: false,
                lineTension:
                    0.1
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
                text: 'Ejercicios por mes',
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
                <Line
                    data={data}
                    width={100}
                    height={500}
                    options={options}
                />
            </div>
        );
    }
}
export default GraficaDate;