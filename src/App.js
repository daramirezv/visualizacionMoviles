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
import GraficaCiudadDoctores from './GraficaCiudadDoctores';
import GraficaAtiendeDoctores from './GraficaAtiendeDoctores';
import UsuariosTabla from './UsuariosTabla';
import UsuariosEdad from "./UsuariosEdad";
import UsuariosGenero from "./UsuariosGenero";
import UsuariosCiudad from "./UsuariosCiudad";
import UsuariosCausa from "./UsuariosCausa";
import UsuariosClinica from "./UsuariosClinica";
import UsuariosEmpleo from "./UsuariosEmpleo";
import UsuariosProblema from "./UsuariosProblema";
import UsuariosCita from "./UsuariosCita";
import GraficaCiudadClinicas from "./GraficaCiudadClinicas";
import GraficaDoctoresClinicas from "./GraficaDoctoresClinicas";
import GraficaJornadaClinicas from "./GraficaJornadaClinicas";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { mesActual: "", cambioEstado: false, dateBuscar: "", cargoEjercicios: false, cargoSitios: false, cargoDoctores: false, cargoUsuarios: false, objetosEjercicios: [], objetosUsuarios: [], objetosSitios: [], objetosDoctores: [] };
    this.buscar = this.buscar.bind(this);
    this.refMes = React.createRef();
  }

  buscar() {
    const node = this.refMes.current;
    if (this.state.dateBuscar !== node.value) {
      this.setState({ dateBuscar: node.value, cambioEstado: true })
    }
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

    var fechaMin = "";
    var fechaMax = "";

    var temp = new Date();

    if (temp.getMonth() === 12) {
      fechaMin = "" + temp.getFullYear() + "-" + (temp.getMonth() + 1);
      fechaMax = "" + (temp.getFullYear() + 1) + "-1";
    }
    else {
      fechaMin = "" + temp.getFullYear() + "-" + (temp.getMonth() + 1);
      fechaMax = "" + temp.getFullYear() + "-" + (temp.getMonth() + 2);
    }

    var dateBot = new Date(fechaMin);
    var dateTop = new Date(fechaMax);

    var respuesta = "";
    switch (dateBot.getMonth()) {
      case 0:
        respuesta = "Enero del " + dateBot.getFullYear();
        break;
      case 1:
        respuesta = "Febrero del " + dateBot.getFullYear();
        break;
      case 2:
        respuesta = "Marzo del " + dateBot.getFullYear();
        break;
      case 3:
        respuesta = "Abril del " + dateBot.getFullYear();
        break;
      case 4:
        respuesta = "Mayo del " + dateBot.getFullYear();
        break;
      case 5:
        respuesta = "Junio del " + dateBot.getFullYear();
        break;
      case 6:
        respuesta = "Julio del " + dateBot.getFullYear();
        break;
      case 7:
        respuesta = "Agosto del " + dateBot.getFullYear();
        break;
      case 8:
        respuesta = "Septiembre del " + dateBot.getFullYear();
        break;
      case 9:
        respuesta = "Octubre del " + dateBot.getFullYear();
        break;
      case 10:
        respuesta = "Noviembre del " + dateBot.getFullYear();
        break;
      default:
        respuesta = "Diciembre del " + dateBot.getFullYear();
    }

    this.setState({ mesActual: respuesta });

    var docRefEjercicios = db.collection("ColeccionEjercicios").doc("Usuario1").collection("Ejercicios").where("creacion", ">=", dateBot.getTime()).where("creacion", "<", dateTop.getTime());
    var docRefLocalizaciones = db.collection("ColeccionLocaciones").doc("Bogota").collection("Sitios");
    var docRefDoctores = db.collection("ColecciónDoctores").doc("Bogota").collection("Doctores");
    var docRefUsuarios = db.collection("ColeccionUsuarios");

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

    docRefUsuarios
      .get()
      .then(function (querySnapshot) {
        var arregloObjetos = [];
        querySnapshot.forEach(function (doc) {
          arregloObjetos.push(doc);
          //console.log(doc.id, " => ", doc.data());
        });
        this.setState({ objetosUsuarios: arregloObjetos, cargoUsuarios: true });
      }.bind(this))
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  componentDidUpdate() {
    if (this.state.dateBuscar !== "" && this.state.cambioEstado) {

      const db = firebase.firestore();

      var dateFiltro = this.state.dateBuscar;

      var fechaMin = "";
      var fechaMax = "";

      var temp = new Date(dateFiltro);

      if (temp.getMonth === 12) {
        fechaMin = "" + temp.getFullYear() + "-" + (temp.getMonth() + 1);
        fechaMax = "" + (temp.getFullYear() + 1) + "-1";
      }
      else {
        fechaMin = "" + temp.getFullYear() + "-" + (temp.getMonth() + 2);
        fechaMax = "" + temp.getFullYear() + "-" + (temp.getMonth() + 3);
      }

      var dateBot = new Date(fechaMin);
      var dateTop = new Date(fechaMax);

      var respuesta = "";
      switch (dateBot.getMonth()) {
        case 0:
          respuesta = "Enero del " + dateBot.getFullYear();
          break;
        case 1:
          respuesta = "Febrero del " + dateBot.getFullYear();
          break;
        case 2:
          respuesta = "Marzo del " + dateBot.getFullYear();
          break;
        case 3:
          respuesta = "Abril del " + dateBot.getFullYear();
          break;
        case 4:
          respuesta = "Mayo del " + dateBot.getFullYear();
          break;
        case 5:
          respuesta = "Junio del " + dateBot.getFullYear();
          break;
        case 6:
          respuesta = "Julio del " + dateBot.getFullYear();
          break;
        case 7:
          respuesta = "Agosto del " + dateBot.getFullYear();
          break;
        case 8:
          respuesta = "Septiembre del " + dateBot.getFullYear();
          break;
        case 9:
          respuesta = "Octubre del " + dateBot.getFullYear();
          break;
        case 10:
          respuesta = "Noviembre del " + dateBot.getFullYear();
          break;
        default:
          respuesta = "Diciembre del " + dateBot.getFullYear();
      }

      var docRefEjercicios = db.collection("ColeccionEjercicios").doc("Usuario1").collection("Ejercicios").where("creacion", ">=", dateBot.getTime()).where("creacion", "<", dateTop.getTime());

      docRefEjercicios
        .get()
        .then(function (querySnapshot) {
          var arregloObjetos = [];
          querySnapshot.forEach(function (doc) {
            arregloObjetos.push(doc);
            //console.log(doc.id, " => ", doc.data());
          });
          this.setState({ objetosEjercicios: arregloObjetos, cambioEstado: false, mesActual: respuesta });
        }.bind(this))
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  }

  render() {

    return (
      <div className="col-md-12">
        {this.state.cargoUsuarios && this.state.cargoSitios && this.state.cargoEjercicios && this.state.cargoDoctores ?
          <div>
            <h1 className="jumbotron" id="titulo">FisiApp</h1>

            <h3 id="fecha" className="tituloMes" >Datos para {this.state.mesActual}</h3>

            <h3 id="mesAnalisis">Cambiar mes de análisis</h3>

            <input type="month" className="mes" ref={this.refMes} name="monthandyear" ></input>
            <button type="button" className="mes btn btn-primary" onClick={this.buscar}>Filtrar</button>

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
              <div className="col-sm">
                <GraficaCiudadClinicas objetosSitios={this.state.objetosSitios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <GraficaDoctoresClinicas objetosSitios={this.state.objetosSitios} />
              </div>
              <div className="col-sm">
                <GraficaJornadaClinicas objetosSitios={this.state.objetosSitios} />
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
                <GraficaCiudadDoctores objetosDoctores={this.state.objetosDoctores} />
              </div>
              <div className="col-sm">
                <GraficaTipoDoctores objetosDoctores={this.state.objetosDoctores} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <GraficaEdadDoctores objetosDoctores={this.state.objetosDoctores} />
              </div>
              <div className="col-sm">
                <GraficaAtiendeDoctores objetosDoctores={this.state.objetosDoctores} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <UsuariosTabla objetosUsuarios={this.state.objetosUsuarios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <UsuariosEdad objetosUsuarios={this.state.objetosUsuarios} />
              </div>
              <div className="col-sm">
                <UsuariosGenero objetosUsuarios={this.state.objetosUsuarios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <UsuariosCiudad objetosUsuarios={this.state.objetosUsuarios} />
              </div>
              <div className="col-sm">
                <UsuariosCausa objetosUsuarios={this.state.objetosUsuarios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <UsuariosClinica objetosUsuarios={this.state.objetosUsuarios} />
              </div>
              <div className="col-sm">
                <UsuariosEmpleo objetosUsuarios={this.state.objetosUsuarios} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <UsuariosProblema objetosUsuarios={this.state.objetosUsuarios} />
              </div>
              <div className="col-sm">
                <UsuariosCita objetosUsuarios={this.state.objetosUsuarios} />
              </div>
            </div>

          </div> : ''}
      </div>
    );
  }
}
export default App;