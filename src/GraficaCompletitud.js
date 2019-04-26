import React, { Component } from "react";
import './App.css';
import { Pie } from 'react-chartjs-2';

class GraficaCompletitud extends Component {

  constructor(props) {
    super(props);
    this.state = { titulos: [], valores: [] }
  }

  componentWillMount() {
    var arregloTemp = [];
    arregloTemp[0] = 0;
    arregloTemp[1] = 0;
    this.props.objetosEjercicios.forEach(ejercicios => {

      var num = ejercicios.data().completitud;
      console.log(arregloTemp[num]);
      if (num === false) {
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
      labels: ["True", "False"],
      datasets: [{
        data: this.state.valores,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)']
        ,
        borderColor:
          ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)']
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
        text: 'Ejercicios completados',
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
export default GraficaCompletitud;