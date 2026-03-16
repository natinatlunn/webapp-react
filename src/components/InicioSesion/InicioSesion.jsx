  import { useEffect, useState } from 'react';
  import Button from 'react-bootstrap/Button';
  import Form from 'react-bootstrap/Form';
  import Modal from 'react-bootstrap/Modal';
  import axios from "axios";

  function InicioSesion() {
      
    const [mostrarModal, setMostrarModal] = useState(false);

    const abrirModal = () => setMostrarModal(true);
    const cerrarModal = () => setMostrarModal(false);

    const [usuarios, setUsuarios] = useState([]);
    useEffect(() => {
      axios.get("https://webapp-9f2e2-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json")
      .then((response)=>{
          const arrayUsuarios = [];
          for (const key in response.data) {
            arrayUsuarios.push({
              id: key,
              nombre:response.data[key].nombre,
              nombre_usuario:response.data[key].nombre_usuario,
              contraseña: response.data[key].contraseña,
              favoritos: response.data[key].favoritos

            });
          }
          setUsuarios(arrayUsuarios);
      })
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitLogin = (event) => {
      event.preventDefault();
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      };
      axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-LnW6LescdgQqDBqgpMi64eQzLwvcyT0", authData)
      .then((response) => {
        console.log("Inicio de sesión exitoso:", response.data);
        cerrarModal();
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error)
      })
    }

    return (
      <>
        <Button
          variant="outline-light"
          className="boton-usuario"
          onClick={abrirModal}
          aria-label="Abrir inicio de sesión"
        >
          <i className="bi bi-person-fill"></i>
        </Button>

        <Modal show={mostrarModal} onHide={cerrarModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Iniciar sesión</Modal.Title>
          </Modal.Header>
          <Form onSubmit={submitLogin}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="correoInicioSesion">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control onChange={(event) => setEmail(event.target.value)} type="email" placeholder="nombre@ejemplo.com" />
              </Form.Group>
              <Form.Group controlId="contrasenaInicioSesion">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="••••••••" />
              </Form.Group>
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