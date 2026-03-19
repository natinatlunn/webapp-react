import axios from "axios";

export async function guardarComentario(idPelicula, comentario, usuario) {
  const url = `https://webapp-9f2e2-default-rtdb.europe-west1.firebasedatabase.app/peliculas/${idPelicula}/comentarios.json?auth=${usuario.idToken}`;

  try {
    const response = await axios.post(url, {
      ...comentario,
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar comentario:", error);
    return [];
  }
}
