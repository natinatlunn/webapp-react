import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function InicioSesion() {
    
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

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
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="correoInicioSesion">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="nombre@ejemplo.com" />
            </Form.Group>
            <Form.Group controlId="contrasenaInicioSesion">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="••••••••" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={cerrarModal}>
            Entrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InicioSesion;