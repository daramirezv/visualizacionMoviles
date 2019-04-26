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
      apiKey: "" + process.env.NODE_ENV.apiKey,
      authDomain: "" + process.env.authDomain,
      databaseURL: "" + process.env.databaseURL,
      projectId: "" + process.env.projectId,
      storageBucket: "" + process.env.storageBucket,
      messagingSenderId: "" + process.env.messagingSenderId
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
          //console.log(doc.id, " => ", doc.data());
        });
        this.setState({ objetosEjercicios: arregloObjetos, cargoEjercicios: true });
      }.bind(this))
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    docRefLocalizaciones
      .get()
      .then(function (querySnapshot) {
        var arregloObjetos = [];
        querySnapshot.forEach(function (doc) {
          arregloObjetos.push(doc);
          //console.log(doc.id, " => ", doc.data());
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
              <div className="col-sm">
                <GraficaDuracion objetosEjercicios={this.state.objetosEjercicios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <GraficaTipo objetosEjercicios={this.state.objetosEjercicios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <Localizaciones objetosSitios={this.state.objetosSitios} />
              </div>
            </div>

          </div> : ''}
      </div>
    );
  }
}
export default App;