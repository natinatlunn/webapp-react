import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import AutContext from "./store/AutContext";
// páginas
import AvisoLegal from "./pages/AvisoLegal";
import InfoContacto from "./pages/InfoContacto";
import PeliculasCategoria from "./pages/PeliculasCategoria";
import PaginaPrincipal from "./pages/PaginaPrincipal";
import FichaPelicula from "./pages/FichaPelicula";
import Favoritos from "./pages/Favoritos";
// elementos bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//componentes
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import Footer from "./components/Footer/Footer";

const FIREBASE_RTDB_BASE_URL =
  "https://webapp-9f2e2-default-rtdb.europe-west1.firebasedatabase.app";

function normalizarFavoritos(favoritos) {
  if (!Array.isArray(favoritos)) {
    return [];
  }

  if (favoritos.length === 0) {
    return [];
  }

  const idsNormalizados = favoritos
    .map((favorito) => {
      if (typeof favorito === "number") {
        return favorito;
      }

      if (typeof favorito === "object" && favorito !== null) {
        if (favorito.esFavorito === false) {
          return null;
        }
        return Number(favorito.idPeli);
      }

      return Number(favorito);
    })
    .filter((id) => Number.isInteger(id) && id >= 0);

  return [...new Set(idsNormalizados)];
}

function normalizarUsuario(usuario) {
  if (!usuario) {
    return null;
  }

  return {
    ...usuario,
    favoritos: normalizarFavoritos(usuario.favoritos),
  };
}

function App() {
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const sesionGuardada = localStorage.getItem("usuarioActual");

    if (!sesionGuardada) {
      return null;
    }

    try {
      return normalizarUsuario(JSON.parse(sesionGuardada));
    } catch {
      localStorage.removeItem("usuarioActual");
      return null;
    }
  });

  const manejarInicioSesion = (usuario) => {
    const usuarioNormalizado = normalizarUsuario(usuario);
    setUsuarioActual(usuarioNormalizado);
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioNormalizado));
  };

  const manejarCerrarSesion = () => {
    setUsuarioActual(null);
    localStorage.removeItem("usuarioActual");
  };

  const manejarToggleFavorito = async (idPelicula) => {
    if (!usuarioActual?.uid || !Number.isInteger(idPelicula)) {
      return;
    }

    const favoritosActuales = normalizarFavoritos(usuarioActual.favoritos);
    const yaEsFavorita = favoritosActuales.includes(idPelicula);

    const nuevosFavoritos = yaEsFavorita
      ? favoritosActuales.filter((id) => id !== idPelicula)
      : [...favoritosActuales, idPelicula];

    const usuarioActualizado = {
      ...usuarioActual,
      favoritos: nuevosFavoritos,
    };

    setUsuarioActual(usuarioActualizado);
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActualizado));

    try {
      const authQuery = usuarioActual.idToken
        ? `?auth=${usuarioActual.idToken}`
        : "";

      await axios.patch(
        `${FIREBASE_RTDB_BASE_URL}/usuarios/${usuarioActual.uid}.json${authQuery}`,
        { favoritos: nuevosFavoritos },
      );
    } catch (error) {
      console.error("No se pudo guardar favoritos en Firebase", error);
    }
  };

  const favoritosUsuario = normalizarFavoritos(usuarioActual?.favoritos);

  return (
    <AutContext.Provider
      value={{
        usuarioLogueado: usuarioActual ? true : false,
        idToken: usuarioActual?.idToken,
        nombre: usuarioActual?.nombre,
        nombreUsuario: usuarioActual?.nombre_usuario,
      }}
    >
      <Container fluid className="p-0 d-flex flex-column min-vh-100">
        <Row className="g-0">
          <Col xs={12} className="p-0">
            <BarraNavegacion
              onInicioSesion={manejarInicioSesion}
              onCerrarSesion={manejarCerrarSesion}
            />
          </Col>
        </Row>

        <Row className="flex-grow-1">
          <Col>
            <Routes>
              <Route
                index
                element={
                  <PaginaPrincipal
                    favoritos={favoritosUsuario}
                    onToggleFavorito={manejarToggleFavorito}
                  />
                }
              />
              <Route
                path="/categoria/:categoria"
                element={
                  <PeliculasCategoria
                    favoritos={favoritosUsuario}
                    onToggleFavorito={manejarToggleFavorito}
                  />
                }
              />
              <Route path="/paginas/AvisoLegal" element={<AvisoLegal />} />
              <Route path="/paginas/InfoContacto" element={<InfoContacto />} />
              <Route
                path="/ficha/:id"
                element={
                  <FichaPelicula
                    favoritos={favoritosUsuario}
                    onToggleFavorito={manejarToggleFavorito}
                  />
                }
              />
              <Route
                path="/favoritos"
                element={
                  <Favoritos
                    favoritos={favoritosUsuario}
                    onToggleFavorito={manejarToggleFavorito}
                  />
                }
              />
            </Routes>
          </Col>
        </Row>

        <Row className="mt-auto">
          <Col className="p-0">
            <Footer />
          </Col>
        </Row>
      </Container>
    </AutContext.Provider>
  );
}

export default App;
