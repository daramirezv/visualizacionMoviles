import React, { Component } from "react";
import './App.css';
import { Polar } from 'react-chartjs-2';

class GraficaGeneroDoctores extends Component {

  constructor(props) {
    super(props);
    this.state = { titulos: [], valores: [] }
  }

  componentWillMount() {
    var arregloTemp = [];
    arregloTemp[0] = 0;
    arregloTemp[1] = 0;
    arregloTemp[2] = 0;

    this.props.objetosDoctores.forEach(doctor => {

      var num = doctor.data().Edad;
      if (num < 35) {
        arregloTemp[0]++;
      }
      else if (num < 50) {
        arregloTemp[1]++
      }
      else
        arregloTemp[2]++
    });

    this.setState({ valores: arregloTemp });
  }

  render() {

    const data = {
      labels: ["20-35 años", "36-50 años", "51+ años"],
      datasets: [{
        data: this.state.valores,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)']
        ,
        borderColor:
          ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)']
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
        text: 'Edad de los Doctores',
        fontSize: 30,
        fontColor: '#000'
      },
      maintainAspectRatio: false
    }

    return (
      <div>
        <Polar
          data={data}
          width={100}
          height={500}
          options={options}
        />
      </div>
    );
  }
}
export default GraficaGeneroDoctores;