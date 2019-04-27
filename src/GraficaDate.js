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

        var arregloMes = [];
        arregloMes["Enero"] = 0;
        arregloMes["Febrero"] = 0;
        arregloMes["Marzo"] = 0;
        arregloMes["Abril"] = 0;
        arregloMes["Mayo"] = 0;
        arregloMes["Junio"] = 0;
        arregloMes["Julio"] = 0;
        arregloMes["Agosto"] = 0;
        arregloMes["Septiembre"] = 0;
        arregloMes["Octubre"] = 0;
        arregloMes["Noviembre"] = 0;
        arregloMes["Diciembre"] = 0;

        for (var x = 1; x < 13; x++) {
            if (arregloTemp["mes " + x] != null) {
                switch ("mes " + x) {
                    case "mes 1":
                        arregloMes["Enero"] = arregloTemp["mes " + x];
                        break;
                    case "mes 2":
                        arregloMes["Febrero"] = arregloTemp["mes " + x];
                        break;
                    case "mes 3":
                        arregloMes["Marzo"] = arregloTemp["mes " + x];
                        break;
                    case "mes 4":
                        arregloMes["Abril"] = arregloTemp["mes " + x];
                        break;
                    case "mes 5":
                        arregloMes["Mayo"] = arregloTemp["mes " + x];
                        break;
                    case "mes 6":
                        arregloMes["Junio"] = arregloTemp["mes " + x];
                        break;
                    case "mes 7":
                        arregloMes["Julio"] = arregloTemp["mes " + x];
                        break;
                    case "mes 8":
                        arregloMes["Agosto"] = arregloTemp["mes " + x];
                        break;
                    case "mes 9":
                        arregloMes["Septiembre"] = arregloTemp["mes " + x];
                        break;
                    case "mes 10":
                        arregloMes["Octubre"] = arregloTemp["mes " + x];
                        break;
                    case "mes 11":
                        arregloMes["Noviembre"] = arregloTemp["mes " + x];
                        break;
                    default:
                        arregloMes["Diciembre"] = arregloTemp["mes " + x];
                }
            }
        }

        arregloTemp.sort();

        this.setState({ valores: arregloMes });
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
                text: 'Ejercicios Publicados por Mes',
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