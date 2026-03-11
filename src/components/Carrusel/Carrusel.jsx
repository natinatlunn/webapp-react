import { useState } from "react";
import peliculas from "../../data/peliculas.json";
import "./Carrusel.css";

const Carrusel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const primerasPeliculas = peliculas.slice(0, 3);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? primerasPeliculas.length - 1 : prevIndex - 1,
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === primerasPeliculas.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const peliculaActual = primerasPeliculas[currentIndex];

    return (
        <section className="carrusel" aria-label="Carrusel de peliculas destacadas">
            <button onClick={handlePrev} className="carrusel-btn prev" aria-label="Película anterior">
                ❮
            </button>

            <article className="carrusel-container">
                <img
                    src={`/images/${peliculaActual.portada}`}
                    alt={peliculaActual.titulo}
                    className="carrusel-image"
                />
                <div className="carrusel-info">
                    <h2>{peliculaActual.titulo}</h2>
                    <p>{peliculaActual.sinopsis}</p>
                </div>
            </article>

            <button onClick={handleNext} className="carrusel-btn next" aria-label="Siguiente película">
                ❯
            </button>
        </section>
    );
};

export default Carrusel;