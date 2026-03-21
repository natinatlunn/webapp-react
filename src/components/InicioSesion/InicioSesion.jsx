import { useContext, useState } from "react";
import "./InicioSesion.css";
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

  authContext.onComprobarSesionExpirada();

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
        const expirationSesion = res.data.expiresIn;

        return axios
          .get(
            "https://webapp-9f2e2-default-rtdb.europe-west1.firebasedatabase.app/usuarios/" +
              localId +
              ".json?auth=" +
              idToken,
          )
          .then((perfilRes) => ({
            perfilRes,
            localId,
            idToken,
            expirationSesion,
          }));
      })
      .then(({ perfilRes, localId, idToken, expirationSesion }) => {
        if (!perfilRes.data) {
          throw new Error(
            "No existe perfil para este usuario en la base de datos.",
          );
        }

        const fechaFin = new Date().getTime() + expirationSesion * 1000;

        const usuarioConSesion = {
          uid: localId,
          idToken,
          fechaExpiracion: fechaFin,
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
          variant="none"
          className="d-flex align-items-center gap-2 p-1 pe-2 border-0"
          id="dropdown-usuario"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "50px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#0062ff",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            {authContext.nombre.charAt(0).toUpperCase()}
          </div>

          <span className="text-white small fw-medium d-none d-md-block">
            {authContext.nombre}
          </span>

          <i className="bi bi-chevron-down text-white-50 small"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="border-0 shadow-lg mt-2 py-2"
          style={{ borderRadius: "12px", minWidth: "200px" }}
        >
          <div className="px-3 py-2 mb-1">
            <p className="mb-0 small text-muted">Cuenta activa</p>
            <p className="mb-0 fw-bold small text-dark">
              {authContext.nombreUsuario}
            </p>
          </div>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to="/favoritos" className="py-2">
            <i className="bi bi-bookmark-heart me-2 text-primary" /> Mis
            Películas
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={onCerrarSesion} className="text-danger py-2">
            <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <>
      <Button
        variant="outline-light"
        className="boton-usuario-invitado d-flex align-items-center gap-2 px-3 py-2"
        onClick={abrirModal}
        style={{
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        <i className="bi bi-person-circle fs-5"></i>
        <span className="fw-medium small">Entrar</span>
      </Button>
      <Modal
        show={mostrarModal}
        onHide={cerrarModal}
        centered
        contentClassName="border-0 shadow-2xl"
      >
        <div className="p-4">
          <Modal.Header
            closeButton
            className="d-flex align-items-start border-0 pb-0"
          >
            <div>
              <Modal.Title className="fw-bold fs-3 text-dark mb-1">
                Iniciar sesión
              </Modal.Title>
              <p className="text-muted small">
                Introduce tus datos para continuar
              </p>
            </div>
          </Modal.Header>

          <Form onSubmit={submitLogin}>
            <Modal.Body className="py-2">
              <Form.Group className="mb-4">
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-0 border-bottom rounded-0 px-0 py-2"
                  style={{
                    boxShadow: "none",
                    borderBottom: "1px solid #eaeaea",
                    fontSize: "0.95rem",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-0 border-bottom rounded-0 px-0 py-2"
                  style={{
                    boxShadow: "none",
                    borderBottom: "1px solid #eaeaea",
                    fontSize: "0.95rem",
                  }}
                />
              </Form.Group>

              {errorLogin && (
                <div className="mt-3 py-2 px-3 rounded-3 bg-danger bg-opacity-10 text-danger small fw-medium">
                  {errorLogin}
                </div>
              )}
            </Modal.Body>

            <Modal.Footer className="border-0 pt-4 pb-2">
              <Button
                variant="dark"
                type="submit"
                className="w-100 py-3 fw-semibold rounded-pill"
                style={{ letterSpacing: "0.5px" }}
              >
                Entrar ahora
              </Button>
              {/* <div className="w-100 text-center mt-3">
                <Link
                  to="/registro"
                  className="text-muted small text-decoration-none hover-dark"
                >
                  ¿No tienes cuenta?{" "}
                  <span className="text-primary fw-bold">Regístrate</span>
                </Link>
              </div> */}
            </Modal.Footer>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default InicioSesion;
