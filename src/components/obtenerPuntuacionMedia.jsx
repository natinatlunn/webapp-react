import axios from "axios";

export async function obtenerPuntuacionMedia(idPelicula) {
  const url = `https://webapp-9f2e2-default-rtdb.europe-west1.firebasedatabase.app/peliculas/${idPelicula}/puntuacionMedia.json`;

  return await axios
    .get(url)
    .then((response) => {
      return response.data || 0;
    })
    .catch((error) => {
      console.error("Error al obtener comentarios:", error);
      return 0;
    });
}
