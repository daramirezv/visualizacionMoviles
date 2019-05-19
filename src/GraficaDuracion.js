import React, { Component } from "react";
import './App.css';
import { Bubble } from 'react-chartjs-2';

class GraficaDuracion extends Component {

    constructor(props) {
        super(props);
        this.state = { titulos: [], valores: [], propsQueLlegan: [] }
    }


    componentWillMount() {
        var arregloTemp = [];
        this.props.objetosEjercicios.forEach(ejercicios => {

            var num = ejercicios.data().duracion;

            if (arregloTemp[num] == null) {
                arregloTemp[num] = 1;
            }
            else {
                arregloTemp[num] = arregloTemp[num] + 1;
            }
        });

        var objeto = class myObject {
            constructor(x, y, r) {
                this.x = x;
                this.y = y;
                this.r = r;
            }
        }

        var solucion = [];
        var arrayValores = Object.keys(arregloTemp);

        arrayValores.forEach(element => {
            solucion.push(new objeto(element, arregloTemp[element], 15));
        });

        this.setState({ valores: solucion, propsQueLlegan: this.props.objetosEjercicios });
    }

    componentDidUpdate() {
        if (this.state.propsQueLlegan !== this.props.objetosEjercicios) {
            var arregloTemp = [];
            this.props.objetosEjercicios.forEach(ejercicios => {

                var num = ejercicios.data().duracion;

                if (arregloTemp[num] == null) {
                    arregloTemp[num] = 1;
                }
                else {
                    arregloTemp[num] = arregloTemp[num] + 1;
                }
            });

            var objeto = class myObject {
                constructor(x, y, r) {
                    this.x = x;
                    this.y = y;
                    this.r = r;
                }
            }

            var solucion = [];
            var arrayValores = Object.keys(arregloTemp);

            arrayValores.forEach(element => {
                solucion.push(new objeto(element, arregloTemp[element], 15));
            });

            this.setState({ valores: solucion, propsQueLlegan: this.props.objetosEjercicios });
        }
    }

    render() {

        const data = {
            datasets: [{
                data: Object.values(this.state.valores),
                backgroundColor: 'rgba(255, 99, 132, 1)'
                ,
                borderColor:
                    'rgba(255, 99, 132, 1)'
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
                text: 'Duración de los Ejercicios',
                fontSize: 30,
                fontColor: '#000'
            },
            maintainAspectRatio: false
            ,
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Cantidad de Ejercicios',
                        fontSize: 20
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Minutos',
                        fontSize: 20
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.xLabel + " minutos " + tooltipItem.yLabel + " veces";
                    }
                }
            }
        }

        return (
            <div>
                <Bubble
                    data={data}
                    width={100}
                    height={500}
                    options={options}
                />
            </div>
        );
    }
}
export default GraficaDuracion;