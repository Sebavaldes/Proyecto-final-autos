import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"; // Importa Modal de reactstrap
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Helmet from "../components/Helmet/Helmet";
import "../styles/CarDetails.css";

const CarDetails = () => {
    const { slug } = useParams();
    const [carDetails, setCarDetails] = useState(null);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false); // Estado del modal de contacto
    const [mensajeEnviado, setMensajeEnviado] = useState(false); // Estado para mensaje enviado
    const [modalConfirmacion, setModalConfirmacion] = useState(false); // Estado del modal de confirmación
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/cars/${slug}`);
                setCarDetails(response.data);
            } catch (error) {
                console.error("Error fetching car details:", error);
                setError("Error fetching car details");
            }
        };

        fetchCarDetails();
    }, [slug]);

    function deleteCar(id) {
        axios.delete(`http://localhost:5000/cars/${id}`, {
            headers: { Authorization: `Bearer ${user_id}` }
        })
            .then(() => {
                setCarDetails(null);
                navigate("/");
            })
            .catch(error => {
                console.error('Error deleting car:', error);
                setError("Error deleting car");
            });
    }

    const toggleModal = () => {
        setModal(!modal);
        setMensajeEnviado(false); // Reiniciar el estado del mensaje enviado al abrir el modal nuevamente
    }

    const enviarMensaje = () => {
        // Aquí puedes agregar la lógica para enviar el mensaje al vendedor
        // Una vez que el mensaje se envía correctamente, puedes establecer el estado de mensaje enviado a true
        // Por ejemplo, aquí simplemente lo establecemos a true después de 2 segundos (simulando una solicitud de red)
        setTimeout(() => {
            setMensajeEnviado(true);
            setModal(false); // Cierra el modal de contacto
            setModalConfirmacion(true); // Abre el modal de confirmación
        }, 2000);
    }

    return (
        <Helmet title={carDetails ? carDetails.carName : "Car Details"}>
            {carDetails && (
                <section style={{ backgroundColor: '#f8f9fa' }}>
                    <Container className="mt-5">
                        <Row>
                            <Col lg="6">
                                <img src={carDetails.image_url} alt="" className="img-fluid rounded" />
                            </Col>

                            <Col lg="6">
                                <div className="car__info mt-3">
                                    <h2 className="section__title text-uppercase">{carDetails.carName}</h2>
                                    <h6 className="rent__price fw-bold fs-4 text-danger">${carDetails.price}</h6>
                                    <p className="section__description text-muted">{carDetails.description}</p>
                                    <div className="d-flex align-items-center mt-3">
                                        <span className="d-flex align-items-center gap-1 section__description">
                                            <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i> {carDetails.model}
                                        </span>
                                        <span className="d-flex align-items-center gap-1 section__description">
                                            <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i> {carDetails.automatic}
                                        </span>
                                        <span className="d-flex align-items-center gap-1 section__description">
                                            <i className="ri-timer-flash-line" style={{ color: "#f9a826" }}></i> {carDetails.user_id}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="12" className="mt-5 d-flex justify-content-between align-items-center">
                                <div className="booking-info mt-5">
                                    <button className="custom-button" onClick={toggleModal}>Contacto del Cliente</button>
                                    {/* Agrega un onClick para abrir el modal */}
                                    <Modal isOpen={modal} toggle={toggleModal}>
                                        <ModalHeader toggle={toggleModal}>Contacto del Cliente</ModalHeader>
                                        <ModalBody>
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="nombre">Nombre:</label>
                                                    <input type="text" className="form-control" id="nombre" placeholder="Ingrese su nombre" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="mensaje">Mensaje:</label>
                                                    <textarea className="form-control" id="mensaje" rows="3" placeholder="Escriba su mensaje aquí"></textarea>
                                                </div>
                                            </form>
                                            {mensajeEnviado && (
                                                <div className="alert alert-success" role="alert">
                                                    Su mensaje fue enviado al vendedor.
                                                </div>
                                            )}
                                        </ModalBody>
                                        <ModalFooter>
                                            <button className="btn btn-primary" onClick={enviarMensaje}>Enviar</button>
                                            <button className="btn btn-secondary" onClick={toggleModal}>Cerrar</button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                                {carDetails.user_id === user_id && (
                                    <button className="custom-button delete-button" onClick={() => deleteCar(carDetails.id)}>Eliminar</button>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </section>
            )}
            {/* Modal de confirmación */}
            <Modal isOpen={modalConfirmacion} toggle={() => setModalConfirmacion(!modalConfirmacion)}>
                <ModalHeader toggle={() => setModalConfirmacion(!modalConfirmacion)}>Confirmación</ModalHeader>
                <ModalBody>
                    Su mensaje fue enviado al vendedor.
                </ModalBody>
                <ModalFooter>
                    <button className="custom-button" onClick={() => setModalConfirmacion(!modalConfirmacion)}>Cerrar</button>
                </ModalFooter>
            </Modal>
            {error && <p>Error: {error}</p>}
        </Helmet>
    );
};

export default CarDetails;
