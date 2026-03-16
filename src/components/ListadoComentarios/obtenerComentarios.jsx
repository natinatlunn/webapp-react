import axios from "axios";

export async function obtenerComentarios(idPelicula) {
  return axios
    .get(
      "https://webapp-9f2e2-default-rtdb.europe-west1.firebasedatabase.app/peliculas/" +
        idPelicula +
        ".json ",
    )
    .then((response) => {
      return response.data?.comentarios || [];
    })
    .catch((error) => {
      console.error("Error al obtener comentarios:", error);
      return [];
    });
}
