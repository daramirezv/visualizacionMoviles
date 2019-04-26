import React, { Component } from "react";
import './App.css';
import firebase from 'firebase';
import GraficaCantidadRepeticiones from './GraficaCantidadRepeticiones';
import GraficaCompletitud from './GraficaCompletitud';
import GraficaDate from './GraficaDate';
import GraficaDuracion from './GraficaDuracion';
import GraficaTipo from './GraficaTipo';
import Localizaciones from './Localizaciones';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { cargoEjercicios: false, cargoSitios: false, objetosEjercicios: [], objetosSitios: [] };
    //this.metodo = this.metodo.bind(this);

  }

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyAmkfgl5KPLqgmpNPSrgmXb_uPk5_nENfg",
      authDomain: "fisiapp-26399.firebaseapp.com",
      databaseURL: "https://fisiapp-26399.firebaseio.com",
      projectId: "fisiapp-26399",
      storageBucket: "fisiapp-26399.appspot.com",
      messagingSenderId: "754912932866"
    };

    firebase.initializeApp(config);

    const db = firebase.firestore();

    var docRefEjercicios = db.collection("ColeccionEjercicios").doc("Usuario1").collection("Ejercicios");
    var docRefLocalizaciones = db.collection("ColeccionLocaciones").doc("Bogota").collection("Sitios");;

    docRefEjercicios
      .get()
      .then(function (querySnapshot) {
        var arregloObjetos = [];
        querySnapshot.forEach(function (doc) {
          arregloObjetos.push(doc);
          console.log("wtf");
          console.log(doc.id, " => ", doc.data());
        });
        this.setState({ objetosEjercicios: arregloObjetos, cargoEjercicios: true });
      }.bind(this))
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    docRefLocalizaciones
      .get()
      .then(function (querySnapshot) {
        console.log(querySnapshot);

        var arregloObjetos = [];
        querySnapshot.forEach(function (doc) {
          arregloObjetos.push(doc);
        });
        this.setState({ objetosSitios: arregloObjetos, cargoSitios: true });
      }.bind(this))
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {

    return (
      <div className="col-md-12">
        {this.state.cargoSitios && this.state.cargoEjercicios ?
          <div>
            <h1 className="jumbotron" id="titulo">FisiApp</h1>
            <h4 className="infoInicial">Cantidad de usuarios registrados: 1</h4>
            <h4 className="infoInicial">Cantidad de ciudades registradas: 1</h4>
            <h4 className="infoInicial">Cantidad de ejercicios registrados: {this.state.objetosEjercicios.length}</h4>
            <h4 className="infoInicial">Cantidad de sitios de fisioterapia registrados: {this.state.objetosSitios.length}</h4>

            <div className="row">
              <div className="col-sm">
                <GraficaCantidadRepeticiones objetosEjercicios={this.state.objetosEjercicios} />
              </div>
              <div className="col-sm">
                <GraficaCompletitud objetosEjercicios={this.state.objetosEjercicios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <GraficaDate objetosEjercicios={this.state.objetosEjercicios} />
              </div>
              <div class="col-sm">
                <GraficaDuracion objetosEjercicios={this.state.objetosEjercicios} />
              </div>
            </div>

            <div class="row">
              <div class="col-sm">
                <GraficaTipo objetosEjercicios={this.state.objetosEjercicios} />
              </div>
            </div>

            <div class="row">
              <div class="col-sm">
                <Localizaciones objetosSitios={this.state.objetosSitios} />
              </div>
            </div>

          </div> : ''}
      </div>
    );
  }
}
export default App;