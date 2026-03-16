import Comentario from "../Comentario/Comentario";
import { useEffect, useState } from "react";
import { obtenerComentarios } from "./obtenerComentarios";

export default function ListadoComentarios(props) {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    obtenerComentarios(props.id).then((comentariosObtenidos) => {
      setComentarios(comentariosObtenidos);
    });
  }, [props.id]);

  // const enviarOpinion = (e) => {
  //   e.preventDefault();
  //   if (rating === 0) return alert("Por favor, selecciona una puntuación");

  //   const nuevaOpinion = {
  //     id: Date.now(),
  //     usuario: "Invitado", // Aquí podrías poner el nombre de un usuario real
  //     texto: comentario,
  //     estrellas: rating,
  //   };

  //   setOpiniones([nuevaOpinion, ...opiniones]);
  //   setComentario("");
  //   setRating(0);
  // };

  return (
    <div className="ficha-opiniones mt-5">
      <h3 className="text-white mb-4">Opiniones de usuarios</h3>

      {/*<form
        onSubmit={enviarOpinion}
        className="bg-dark p-4 rounded-3 border border-secondary mb-5"
      >
        <label className="form-label text-white-50">Tu puntuación:</label>
        <div className="mb-3">
          {[1, 2, 3, 4, 5].map((estrella) => (
            <i
              key={estrella}
              className={`bi ${estrella <= rating ? "bi-star-fill text-warning" : "bi-star text-secondary"} fs-3 me-1`}
              style={{ cursor: "pointer" }}
              onClick={() => setRating(estrella)}
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
        <button type="submit" className="btn btn-warning fw-bold">
          Publicar comentario
        </button>
      </form>*/}

      <div className="opiniones-lista">
        {comentarios.map((comentario) => (
          <Comentario comentario={comentario} />
        ))}
      </div>
    </div>
  );
}
