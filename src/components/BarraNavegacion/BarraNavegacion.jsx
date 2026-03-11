import "./BarraNavegacion.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../imagenes/logo_principal.png";
import FiltroBusqueda from "../FiltroBusqueda/FiltroBusqueda";
import InicioSesion from "../InicioSesion/InicioSesion";
import "bootstrap-icons/font/bootstrap-icons.css";

function BarraNavegacion() {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const navigate = useNavigate();

  const navegarACategoria = (categoria) => {
    const categoriaLimpia = categoria.trim();
    if (!categoriaLimpia) return;
    navigate(`/categoria/${encodeURIComponent(categoriaLimpia)}`);
  };

  const manejarCambioBusqueda = (evento) => {
    setTextoBusqueda(evento.target.value);
  };

  const manejarEnvioBusqueda = (evento) => {
    evento.preventDefault();
    navegarACategoria(textoBusqueda);
  };

  const manejarSugerenciaClick = (categoria) => {
    setTextoBusqueda(categoria);
    navegarACategoria(categoria);
  };

  return (
    <>
      <Navbar className="barra-navegacion w-100">
        <div className="zona-logo">
          <img src={logo} alt="logo" className="logo-imagen" />
        </div>
        <FiltroBusqueda
          valor={textoBusqueda}
          onCambio={manejarCambioBusqueda}
          onEnviar={manejarEnvioBusqueda}
          onSugerenciaClick={manejarSugerenciaClick}
        />
        <InicioSesion />
      </Navbar>
    </>
  );
}

export default BarraNavegacion;
