import { Container, Card } from "react-bootstrap";
import "./AvisoLegal.css";

function AvisoLegal() {
  const fechaActualizacion = "22 de Marzo, 2026";

  return (
    <Container className="py-2 mt-2">
      <Card className="border-0 custom-card-legal mx-auto">
        <Card.Body className="p-2 text-center">
          <header className="pb-4">
            <h1 className="fw-light text-dark display-5 mt-3">Aviso Legal</h1>
            <div
              className="mx-auto bg-flixi-line"
              style={{ width: "40px", height: "2px" }}
            ></div>
            <p className="text-muted small fw-light italic">
              Última revisión: {fechaActualizacion}
            </p>
          </header>

          <div className="legal-content mx-auto">
            <section className="mb-5">
              <p className="fs-5 fw-normal text-dark-emphasis lh-base">
                El presente documento tiene como objeto regular el acceso,
                navegación y uso de la plataforma <strong>FLIXI</strong>. El
                usuario se compromete a utilizar los servicios conforme a la ley
                y a las presentes condiciones.
              </p>
            </section>

            <div className="text-blocks">
              <section className="mb-5">
                <h2 className="section-title">01. Información General</h2>
                <p className="legal-text">
                  En cumplimiento con el artículo 10 de la Ley 34/2002, de 11 de
                  julio, se informa que <strong>Flixi S.L.</strong> es una
                  sociedad mercantil con NIF B-12345678, domicilio en Madrid e
                  inscrita en el Registro Mercantil. Esta entidad es la
                  responsable de la gestión y explotación de los contenidos
                  ofrecidos en este dominio.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="section-title">
                  02. Propiedad Industrial e Intelectual
                </h2>
                <p className="legal-text">
                  Todo el software, diseños, interfaces, marcas y contenidos
                  multimedia son propiedad exclusiva de Flixi S.L. o de sus
                  licenciantes. Queda prohibida la extracción, reutilización o
                  comunicación pública de cualquier fragmento de la plataforma
                  sin autorización expresa y por escrito de los titulares.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="section-title">
                  03. Protección de Datos y Privacidad
                </h2>
                <p className="legal-text">
                  Flixi S.L. garantiza la protección de los datos personales de
                  sus usuarios conforme al Reglamento General de Protección de
                  Datos (RGPD). Los datos recogidos mediante formularios o
                  cookies serán tratados con la finalidad de gestionar su
                  suscripción y mejorar la experiencia de usuario, garantizando
                  siempre sus derechos de acceso, rectificación y supresión.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="section-title">04. Uso de Cookies</h2>
                <p className="legal-text">
                  Este sitio utiliza cookies propias y de terceros para
                  optimizar la navegación y analizar hábitos de consumo. Al
                  continuar navegando, el usuario consiente su instalación.
                  Puede configurar o rechazar el uso de cookies en cualquier
                  momento a través de los ajustes de su navegador o en nuestra
                  política detallada de privacidad.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="section-title">
                  05. Exención de Responsabilidad
                </h2>
                <p className="legal-text">
                  Flixi S.L. no garantiza la disponibilidad técnica
                  ininterrumpida de la plataforma ni se responsabiliza de los
                  posibles ataques informáticos, virus o errores de seguridad
                  producidos por causas ajenas o por la infraestructura del
                  propio usuario. Nos reservamos el derecho a suspender el
                  servicio por mantenimiento sin previo aviso.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="section-title">06. Jurisdicción Aplicable</h2>
                <p className="legal-text">
                  Para cualquier controversia, conflicto o reclamación derivada
                  de la plataforma flixi.com, las partes acuerdan someterse
                  exclusivamente a la legislación española y a la jurisdicción
                  de los Juzgados y Tribunales de Madrid capital, renunciando
                  expresamente a cualquier otro fuero que pudiera
                  corresponderles.
                </p>
              </section>
            </div>

            <footer>
              <p className="small text-secondary mb-1">
                Para cualquier consulta jurídica o de privacidad, contacte con:
              </p>
              <a href="mailto:info@flixi.com" className="email-link fw-medium">
                info@flixi.com
              </a>
            </footer>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AvisoLegal;
