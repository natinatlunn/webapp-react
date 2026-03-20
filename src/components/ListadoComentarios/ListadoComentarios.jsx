import Comentario from "../Comentario/Comentario";
import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { obtenerComentarios } from "./obtenerComentarios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import NuevoComentario from "../NuevoComentario/nuevoComentario";

dayjs.extend(relativeTime);
dayjs.locale("es");

export default function ListadoComentarios(props) {
  const [comentarios, setComentarios] = useState([]);
  const [actualizarComentarios, setActualizarComentarios] = useState(false);

  const [paginaActual, setPaginaActual] = useState(1);
  const comentariosPorPagina = 7;

  const obtenerTiempoRelativo = (fechaRaw) => {
    if (!fechaRaw) return "";
    const fecha = fechaRaw.toDate ? fechaRaw.toDate() : fechaRaw;
    const fechaRelativa = dayjs(fecha).fromNow();
    return fechaRelativa.charAt(0).toUpperCase() + fechaRelativa.slice(1);
  };

  useEffect(() => {
    obtenerComentarios(props.id).then((comentariosObtenidos) => {
      const comentariosConTiempoFormateadoOrdenado = Object.keys(
        comentariosObtenidos,
      )
        .map((id) => {
          return {
            id: id,
            ...comentariosObtenidos[id],
          };
        })
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .map((comentario) => ({
          ...comentario,
          fecha: obtenerTiempoRelativo(comentario.fecha),
        }));
      setComentarios(comentariosConTiempoFormateadoOrdenado);
      setActualizarComentarios(false);
    });
  }, [props.id, actualizarComentarios]);

  const indiceUltimo = paginaActual * comentariosPorPagina;
  const indicePrimero = indiceUltimo - comentariosPorPagina;
  const comentariosPaginados = comentarios.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(comentarios.length / comentariosPorPagina);

  return (
    <div className="ficha-opiniones mt-5">
      <h3 className="text-white mb-4">Opiniones de usuarios</h3>
      <NuevoComentario
        idPelicula={props.id}
        comentarios={comentarios}
        setActualizarComentarios={setActualizarComentarios}
        setActualizarComentariosPuntuacion={props.setActualizarPuntuacion}
      />

      <div className="opiniones-lista">
        {comentarios.length > 0 ? (
          <>
            {comentariosPaginados.map((comentario) => (
              <Comentario key={comentario.id} comentario={comentario} />
            ))}

            {comentarios.length > comentariosPorPagina && (
              <Pagination className="mt-4 justify-content-center custom-pagination">
                <Pagination.First
                  onClick={() => setPaginaActual(1)}
                  disabled={paginaActual === 1}
                />

                {[...Array(totalPaginas)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === paginaActual}
                    onClick={() => setPaginaActual(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Last
                  onClick={() => setPaginaActual(totalPaginas)}
                  disabled={paginaActual === totalPaginas}
                />
              </Pagination>
            )}
          </>
        ) : (
          <p className="text-white">
            <em>Aún no hay comentarios para esta película.</em>
          </p>
        )}
      </div>
    </div>
  );
}
