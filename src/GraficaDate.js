import React, { Component } from "react";
import './App.css';
import { Line } from 'react-chartjs-2';

class GraficaDate extends Component {

    constructor(props) {
        super(props);
        this.state = { valores: [], propsQueLlegan: [] }
    }

    componentWillMount() {

        var arregloMes = [];
        arregloMes["0-5"] = 0;
        arregloMes["6-10"] = 0;
        arregloMes["11-15"] = 0;
        arregloMes["16-20"] = 0;
        arregloMes["21-25"] = 0;
        arregloMes["25+"] = 0;

        this.props.objetosEjercicios.forEach(ejercicios => {

            var num = ejercicios.data().creacion;
            var dia = new Date(num);

            if (dia.getDate() < 6) {
                arregloMes["0-5"]++;
            }
            else if (dia.getDate() < 11) {
                arregloMes["6-10"]++;
            }
            else if (dia.getDate() < 16) {
                arregloMes["11-15"]++;
            }
            else if (dia.getDate() < 21) {
                arregloMes["16-20"]++;
            }
            else if (dia.getDate() < 26) {
                arregloMes["21-25"]++;
            }
            else {
                arregloMes["25+"]++;
            }
        });

        arregloMes.sort();

        this.setState({ valores: arregloMes, propsQueLlegan: this.props.objetosEjercicios });
    }

    componentDidUpdate() {
        if (this.state.propsQueLlegan !== this.props.objetosEjercicios) {
            var arregloMes = [];
            arregloMes["0-5"] = 0;
            arregloMes["6-10"] = 0;
            arregloMes["11-15"] = 0;
            arregloMes["16-20"] = 0;
            arregloMes["21-25"] = 0;
            arregloMes["25+"] = 0;

            this.props.objetosEjercicios.forEach(ejercicios => {

                var num = ejercicios.data().creacion;
                var dia = new Date(num);

                if (dia.getDate() < 6) {
                    arregloMes["0-5"]++;
                }
                else if (dia.getDate() < 11) {
                    arregloMes["6-10"]++;
                }
                else if (dia.getDate() < 16) {
                    arregloMes["11-15"]++;
                }
                else if (dia.getDate() < 21) {
                    arregloMes["16-20"]++;
                }
                else if (dia.getDate() < 26) {
                    arregloMes["21-25"]++;
                }
                else {
                    arregloMes["25+"]++;
                }
            });

            arregloMes.sort();

            this.setState({ valores: arregloMes, propsQueLlegan: this.props.objetosEjercicios });
        }
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
                text: 'Ejercicios en los días del mes',
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