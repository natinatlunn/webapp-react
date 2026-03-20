import axios from "axios";

export async function guardarComentarioYActualizarPuntuacionMedia(
  idPelicula,
  comentarios,
  nuevoComentario,
  idToken,
) {
  const url = `https://webapp-9f2e2-default-rtdb.europe-west1.firebasedatabase.app/peliculas/${idPelicula}`;

  const todosLosComentarios = Object.values(comentarios);
  todosLosComentarios.push(nuevoComentario);

  const suma = todosLosComentarios.reduce(
    (acc, c) => acc + Number(c.puntuacion),
    0,
  );

  const nuevaMedia = ((2 * suma) / todosLosComentarios.length).toFixed(1);

  try {
    await axios.patch(`${url}.json?auth=${idToken}`, {
      puntuacionMedia: nuevaMedia,
    });

    await axios.post(`${url}/comentarios.json?auth=${idToken}`, {
      ...nuevoComentario,
    });
  } catch (error) {
    console.error("Error al guardar comentario:", error);
  }
}
