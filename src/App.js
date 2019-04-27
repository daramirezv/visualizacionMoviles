import React, { Component } from "react";
import './App.css';
import firebase from 'firebase';
import GraficaCantidadRepeticiones from './GraficaCantidadRepeticiones';
import GraficaCompletitud from './GraficaCompletitud';
import GraficaDate from './GraficaDate';
import GraficaDuracion from './GraficaDuracion';
import GraficaTipo from './GraficaTipo';
import Localizaciones from './Localizaciones';
import GraficaParteCuerpo from './GraficaParteCuerpo';
import GraficaPrecioClinicas from './GraficaPrecioClinicas';
import GraficaTamanoClinicas from './GraficaTamanoClinicas';
import GraficaTipoClinicas from './GraficaTipoClinicas';
import Doctores from './Doctores';
import GraficaEspecializacionDoctores from './GraficaEspecializacionDoctores';
import GraficaGeneroDoctores from './GraficaGeneroDoctores';
import GraficaEdadDoctores from './GraficaEdadDoctores';
import GraficaTipoDoctores from './GraficaTipoDoctores';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { cargoEjercicios: false, cargoSitios: false, cargoDoctores: false, objetosEjercicios: [], objetosSitios: [], objetosDoctores: [] };
  }

  componentDidMount() {
    const config = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      databaseURL: process.env.REACT_APP_databaseURL,
      projectId: process.env.REACT_APP_projectId,
      storageBucket: process.env.REACT_APP_storageBucket,
      messagingSenderId: process.env.REACT_APP_messagingSenderId
    };

    firebase.initializeApp(config);

    const db = firebase.firestore();

    var docRefEjercicios = db.collection("ColeccionEjercicios").doc("Usuario1").collection("Ejercicios");
    var docRefLocalizaciones = db.collection("ColeccionLocaciones").doc("Bogota").collection("Sitios");;
    var docRefDoctores = db.collection("ColecciónDoctores").doc("Bogota").collection("Doctores");;

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

    docRefDoctores
      .get()
      .then(function (querySnapshot) {
        var arregloObjetos = [];
        querySnapshot.forEach(function (doc) {
          arregloObjetos.push(doc);
          //console.log(doc.id, " => ", doc.data());
        });
        this.setState({ objetosDoctores: arregloObjetos, cargoDoctores: true });
      }.bind(this))
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {

    return (
      <div className="col-md-12">
        {this.state.cargoSitios && this.state.cargoEjercicios && this.state.cargoDoctores ?
          <div>
            <h1 className="jumbotron" id="titulo">FisiApp</h1>
            <div className="row">
              <div className="col-sm">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Cantidad de usuarios con ejercicios registrados</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Cantidad de ciudades registradas</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Cantidad de ejercicios registrados</td>
                      <td>{this.state.objetosEjercicios.length}</td>
                    </tr>
                    <tr>
                      <td>Cantidad de sitios de fisioterapia registrados</td>
                      <td>{this.state.objetosSitios.length}</td>
                    </tr>
                    <tr>
                      <td>Cantidad de doctores de fisioterapia registrados</td>
                      <td>{this.state.objetosDoctores.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

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
              <div className="col-sm">
                <GraficaParteCuerpo objetosEjercicios={this.state.objetosEjercicios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <Localizaciones objetosSitios={this.state.objetosSitios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <GraficaPrecioClinicas objetosSitios={this.state.objetosSitios} />
              </div>
              <div className="col-sm">
                <GraficaTamanoClinicas objetosSitios={this.state.objetosSitios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <GraficaTipoClinicas objetosSitios={this.state.objetosSitios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <Doctores objetosDoctores={this.state.objetosDoctores} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <GraficaEspecializacionDoctores objetosDoctores={this.state.objetosDoctores} />
              </div>
              <div className="col-sm">
                <GraficaGeneroDoctores objetosDoctores={this.state.objetosDoctores} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <GraficaEdadDoctores objetosDoctores={this.state.objetosDoctores} />
              </div>
              <div className="col-sm">
                <GraficaTipoDoctores objetosDoctores={this.state.objetosDoctores} />
              </div>
            </div>

          </div> : ''}
      </div>
    );
  }
}
export default App;