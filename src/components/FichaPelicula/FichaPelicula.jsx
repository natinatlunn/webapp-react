import "./FichaPelicula.css";
import ListadoComentarios from "../ListadoComentarios/ListadoComentarios";
import BotonFavoritos from "../botonFavoritos/BotonFavoritos";
import {
  Spinner,
  Container,
  Button,
  Stack,
  Image,
  Col,
  Row,
  Badge,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { obtenerPuntuacionMedia } from "../obtenerPuntuacionMedia";
import AutContext from "../../store/AutContext";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import ReproductorTrailer from "../ReproductorTrailer/ReproductorTrailer";

dayjs.extend(duration);

function obtenerAnio(fechaEstreno) {
  return String(fechaEstreno).slice(0, 4);
}

function formatearDuracion(minutosTotales) {
  if (!Number.isFinite(minutosTotales) || minutosTotales <= 0) {
    return "Duración sin confirmar";
  }

  const duracion = dayjs.duration(minutosTotales, "minutes");
  const horas = duracion.hours();
  const minutos = duracion.minutes();

  return horas > 0
    ? `${horas}h ${minutos > 0 ? minutos + "min" : ""}`
    : `${minutos}min`;
}
export default function FichaPeliculaDetalle({ pelicula }) {
  const [puntuacionMedia, setPuntuacionMedia] = useState(null);
  const [actualizarPuntuacion, setActualizarPuntuacion] = useState(false);
  const anio = obtenerAnio(pelicula.fechaEstreno);
  const poster = pelicula.portada.replace(".jpg", "_poster.jpg");
  const [mostrarModal, setMostrarModal] = useState(false);
  const authContext = useContext(AutContext);

  authContext.onComprobarSesionExpirada();

  const handleToggleFavorito = () => {
    if (!authContext.usuarioLogueado) {
      window.alert("Debes iniciar sesion para guardar peliculas en favoritos.");
      return;
    }

    authContext.onToggleFavorito?.(pelicula.id);
  };

  useEffect(() => {
    obtenerPuntuacionMedia(pelicula.id).then((media) => {
      setPuntuacionMedia(media);
      setActualizarPuntuacion(false);
    });
  }, [pelicula.id, actualizarPuntuacion]);

  const obtenerColorProgreso = (score) => {
    if (score >= 7) return "#21d07a";
    if (score >= 4) return "#d2d531";
    return "#db2360";
  };

  return (
    <section className="ficha-wrap">
      <div className="ficha-bg" aria-hidden="true">
        <Image
          src={`/images/portadas/${pelicula.portada}`}
          alt=""
          className="ficha-bg-imagen"
        />
      </div>

      <Container as="article" className="ficha-card">
        <div className="ficha-grid">
          <div className="ficha-boton-favoritos">
            <BotonFavoritos
              usuarioLogueado={authContext.usuarioLogueado}
              esFavorito={authContext.favoritos.includes(pelicula.id)}
              alHacerClic={handleToggleFavorito}
            />
          </div>

          <aside className="ficha-poster-col">
            <Image
              src={`/images/posters/${poster}`}
              alt={`Póster de ${pelicula.titulo}`}
              className="ficha-poster"
            />
          </aside>

          <div className="ficha-info-col">
            <p className="ficha-eyebrow">Ficha de película</p>
            <Stack
              direction="horizontal"
              gap={5}
              className="align-items-center mb-4"
            >
              <div className="d-flex flex-column">
                <h1 className="ficha-titulo mb-3">{pelicula.titulo}</h1>

                <div className="ficha-generos mb-0">
                  <Stack
                    direction="horizontal"
                    gap={2}
                    className="meta-text align-items-center flex-wrap"
                  >
                    <Badge bg="secondary" pill className="ficha-tag-fecha">
                      {anio}
                    </Badge>
                    <Badge bg="secondary" pill className="ficha-tag-fecha">
                      {formatearDuracion(pelicula.duracion)}
                    </Badge>
                    {pelicula.genero.map((item) => (
                      <div key={item} className="d-flex align-items-center">
                        <Badge pill bg="dark" className="ficha-tag">
                          {item}
                        </Badge>
                      </div>
                    ))}
                  </Stack>
                </div>
              </div>

              <div className="valoracion-circular">
                <div className="valoracion-anillo">
                  {puntuacionMedia !== null ? (
                    <>
                      <svg viewBox="0 0 36 36" className="valoracion-svg">
                        <path
                          className="anillo-fondo"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="anillo-progreso"
                          stroke={obtenerColorProgreso(puntuacionMedia)}
                          strokeDasharray={`${puntuacionMedia * 10}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="valoracion-porcentaje">
                        {Number(puntuacionMedia).toFixed(1)}
                      </div>
                    </>
                  ) : (
                    <Spinner animation="border" size="sm" variant="light" />
                  )}
                </div>
              </div>
            </Stack>

            <p className="ficha-sinopsis">{pelicula.sinopsis}</p>

            <div className="ficha-acciones">
              <Stack direction="horizontal" gap={2} className="flex-wrap">
                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={() => setMostrarModal(true)}
                >
                  <i className="bi bi-play me-2"></i>
                  Ver tráiler
                </Button>
              </Stack>
            </div>
            <ReproductorTrailer
              pelicula={pelicula}
              mostrarModal={mostrarModal}
              setMostrarModal={setMostrarModal}
            />
          </div>
        </div>

        {/* Sección de Comentarios */}
        <Row className="mt-4">
          <Col md={7}>
            <ListadoComentarios
              id={pelicula.id}
              setActualizarPuntuacion={setActualizarPuntuacion}
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </section>
  );
}
