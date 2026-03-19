import { Link } from "react-router-dom";
import "./FichaPelicula.css";
import ListadoComentarios from "../ListadoComentarios/ListadoComentarios";
import BotonFavoritos from "../botonFavoritos/BotonFavoritos";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { obtenerPuntuacionMedia } from "../obtenerPuntuacionMedia";

function obtenerAnio(fechaEstreno) {
  return String(fechaEstreno).slice(0, 4);
}

function formatearFecha(fechaEstreno) {
  const valor = String(fechaEstreno);
  if (valor.length !== 8) return "Fecha sin confirmar";

  const anio = Number(valor.slice(0, 4));
  const mes = Number(valor.slice(4, 6)) - 1;
  const dia = Number(valor.slice(6, 8));
  const fecha = new Date(anio, mes, dia);

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(fecha);
}

function formatearDuracion(duracion) {
  if (!Number.isFinite(duracion)) return "Duración sin confirmar";
  return `${duracion} min`;
}

export default function FichaPeliculaDetalle({
  pelicula,
  usuarioActual,
  esFavorito = false,
  onToggleFavorito,
}) {
  const [puntuacionMedia, setPuntuacionMedia] = useState(null);
  const [actualizarPuntuacion, setActualizarPuntuacion] = useState(false);
  const anio = obtenerAnio(pelicula.fechaEstreno);
  const poster = pelicula.portada.replace(".jpg", "_poster.jpg");

  const handleToggleFavorito = () => {
    if (!usuarioActual) {
      window.alert("Debes iniciar sesion para guardar peliculas en favoritos.");
      return;
    }

    onToggleFavorito?.(pelicula.id);
  };

  useEffect(() => {
    obtenerPuntuacionMedia(pelicula.id).then((media) => {
      setPuntuacionMedia(media);
      setActualizarPuntuacion(false);
    });
  }, [pelicula.id, actualizarPuntuacion]);

  return (
    <section className="ficha-wrap">
      <div className="ficha-bg" aria-hidden="true">
        <img
          src={`/images/${pelicula.portada}`}
          alt=""
          className="ficha-bg-imagen"
        />
      </div>

      <article className="ficha-card container">
        <div className="ficha-grid">
          <div className="ficha-boton-favoritos">
            <BotonFavoritos
              favorito={esFavorito}
              alHacerClic={handleToggleFavorito}
              bloqueado={!usuarioActual}
            />
          </div>
          <aside className="ficha-poster-col">
            <img
              src={`/images/posters/${poster}`}
              alt={`Póster de ${pelicula.titulo}`}
              className="ficha-poster"
            />
          </aside>

          <div className="ficha-info-col">
            <p className="ficha-eyebrow">Ficha de película</p>
            <h1 className="ficha-titulo">{pelicula.titulo}</h1>

            <div className="ficha-meta">
              <span className="badge rounded-pill text-bg-dark">{anio}</span>
              <span className="badge rounded-pill text-bg-secondary">
                {formatearFecha(pelicula.fechaEstreno)}
              </span>
              <span className="badge rounded-pill text-bg-secondary">
                {formatearDuracion(pelicula.duracion)}
              </span>
            </div>

            <div className="ficha-generos">
              {pelicula.genero.map((item) => (
                <span key={item} className="ficha-tag">
                  {item}
                </span>
              ))}
            </div>

            <p className="ficha-sinopsis">{pelicula.sinopsis}</p>

            <div className="ficha-acciones">
              <Link to="/" className="btn btn-light btn-lg">
                Volver al catálogo
              </Link>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  pelicula.titulo,
                )}+tráiler`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light btn-lg"
              >
                Ver tráiler
              </a>
              <span className="badge text-bg-dark border">
                {Number(puntuacionMedia).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <Row>
          <Col md={7}>
            <ListadoComentarios
              id={pelicula.id}
              usuarioAutenticado={usuarioActual}
              setActualizarPuntuacion={setActualizarPuntuacion}
            />
          </Col>
          <Col></Col>
        </Row>
      </article>
    </section>
  );
}
