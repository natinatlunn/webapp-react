import './BarraNavegacion.css';
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../imagenes/logo.png';
import FiltroBusqueda from './FiltroBusqueda';
import InicioSesion from './InicioSesion';
import "bootstrap-icons/font/bootstrap-icons.css";


function BarraNavegacion() {
  const [textoBusqueda, setTextoBusqueda] = useState('');

  const manejarCambioBusqueda = (evento) => {
    setTextoBusqueda(evento.target.value);
  };

  const manejarEnvioBusqueda = (evento) => {
    evento.preventDefault();
    console.log('Búsqueda enviada:', textoBusqueda);
  };

 
  return (
    <>
      <Navbar className="barra-navegacion w-100">
        <div className="zona-logo">
          <img src={logo} alt="logo" className="logo-imagen" />
        </div>
        <FiltroBusqueda valor={textoBusqueda} onCambio={manejarCambioBusqueda} onEnviar={manejarEnvioBusqueda}/>
        <InicioSesion />
      </Navbar>
    </>
  )
}

export default BarraNavegacion;