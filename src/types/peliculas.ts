export interface Pelicula {
  id: number;
  titulo: string;
  fechaEstreno: number;
  duracion: number;
  genero: string[];
  puntuacion?: number;
  poster: string;
  sinopsis: string;
}
