import './Footer.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';



function Footer() {
    const anioActual = new Date().getFullYear();

    return (
        <footer className="footer-app">
            <p className="footer-texto">© {anioActual} Flixi. Todos los derechos reservados.</p>
            <Nav className="justify-content-center footer-nav" activeKey="/home">
                <Nav.Item>
                    <Link to="/Paginas/InfoContacto">Información de contacto</Link> 
                </Nav.Item>
                
                <Nav.Item>
                    <Link to="/Paginas/AvisoLegal">Aviso legal</Link>
                </Nav.Item>
            </Nav>

        </footer>
    );
}

export default Footer;