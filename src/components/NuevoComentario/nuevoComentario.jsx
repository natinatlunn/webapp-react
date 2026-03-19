import { useState } from "react";
import { guardarComentario } from "./guardarComentario";

export default function NuevoComentario(props) {
  const [puntuacion, setPuntuacion] = useState(0);
  const [comentario, setComentario] = useState("");

  const enviarComentario = (event) => {
    event.preventDefault();
    if (puntuacion === 0) return alert("Por favor, selecciona una puntuación");

    const nuevoComentario = {
      usuario: props.usuarioAutenticado.nombre_usuario,
      fecha: new Date(),
      descripcion: comentario,
      puntuacion: puntuacion,
    };

    guardarComentario(
      props.idPelicula,
      nuevoComentario,
      props.usuarioAutenticado,
    ).then(() => {
      setComentario("");
      setPuntuacion(0);
      props.setActualizarComentarios(true);
    });
  };

  return (
    <form
      onSubmit={enviarComentario}
      className="bg-dark p-4 rounded-3 border border-secondary mb-5"
    >
      <div className="mb-3">
        {[1, 2, 3, 4, 5].map((estrella) => (
          <i
            key={estrella}
            className={`bi ${estrella <= puntuacion ? "bi-star-fill text-warning" : "bi-star text-secondary"} fs-3 me-1`}
            style={{ cursor: "pointer" }}
            onClick={() => setPuntuacion(estrella)}
          />
        ))}
      </div>

      <div className="mb-3">
        <textarea
          className="form-control bg-dark text-white border-secondary"
          placeholder="Escribe tu opinión aquí..."
          rows="3"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-warning fw-bold"
          disabled={!props.usuarioAutenticado}
        >
          Comentar
        </button>
      </div>
    </form>
  );
}
