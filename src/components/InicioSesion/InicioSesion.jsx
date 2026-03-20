import { useContext, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import AutContext from "../../store/AutContext";

function InicioSesion({ onInicioSesion, onCerrarSesion }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const authContext = useContext(AutContext);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => {
    setMostrarModal(false);
    setErrorLogin("");
  };

  const submitLogin = (event) => {
    event.preventDefault();
    setErrorLogin("");

    const authData = { email, password, returnSecureToken: true };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-LnW6LescdgQqDBqgpMi64eQzLwvcyT0",
        authData,
      )
      .then((res) => {
        const idToken = res.data.idToken;
        const localId = res.data.localId;

        return axios
          .get(
            "https://webapp-9f2e2-default-rtdb.europe-west1.firebasedatabase.app/usuarios/" +
              localId +
              ".json?auth=" +
              idToken,
          )
          .then((perfilRes) => ({ perfilRes, localId, idToken }));
      })
      .then(({ perfilRes, localId, idToken }) => {
        if (!perfilRes.data) {
          throw new Error(
            "No existe perfil para este usuario en la base de datos.",
          );
        }

        const usuarioConSesion = {
          uid: localId,
          idToken,
          ...perfilRes.data,
        };

        onInicioSesion(usuarioConSesion);
        setEmail("");
        setPassword("");
        cerrarModal();
      })
      .catch((err) => {
        console.error(err);
        setErrorLogin("Credenciales no validas o perfil no encontrado.");
      });
  };

  if (authContext.usuarioLogueado) {
    return (
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="outline-light"
          className="boton-usuario"
          id="dropdown-usuario"
          aria-label="Abrir menu de usuario"
        >
          <i className="bi bi-person-fill"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Header>Bienvenido, {authContext.nombre}</Dropdown.Header>
          <Dropdown.Item as={Link} to="/favoritos">
            Peliculas favoritas
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={onCerrarSesion}>Cerrar sesion</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <>
      <Button
        variant="outline-light"
        className="boton-usuario"
        onClick={abrirModal}
        aria-label="Abrir inicio de sesion"
      >
        <i className="bi bi-person-fill"></i>
      </Button>

      <Modal show={mostrarModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesion</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitLogin}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="correoInicioSesion">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="nombre@ejemplo.com"
              />
            </Form.Group>
            <Form.Group controlId="contrasenaInicioSesion">
              <Form.Label>Contrasena</Form.Label>
              <Form.Control
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="********"
              />
            </Form.Group>
            {errorLogin && (
              <p className="text-danger mt-3 mb-0">{errorLogin}</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Aceptar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default InicioSesion;
