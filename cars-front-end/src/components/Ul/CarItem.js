import { Col, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CarItem = () => {
    const [cars, setCars] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [mensajeEnviado, setMensajeEnviado] = useState(false);

    useEffect(() => {
        getCars();
    }, []);

    function getCars() {
        axios.get('http://localhost:5000/listusers')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars:', error);
            });
    }

    const toggleModal = () => {
        setModalShow(!modalShow);
        setMensajeEnviado(false); // Reinicia el estado de mensaje enviado al abrir el modal nuevamente
    }

    const enviarMensaje = () => {
        // Lógica para enviar el mensaje al vendedor
        // Aquí puedes realizar las acciones necesarias para enviar el mensaje

        // Una vez que el mensaje se envía correctamente, establece el estado de mensaje enviado a true
        // Por ejemplo, aquí simplemente lo establecemos a true después de 2 segundos (simulando una solicitud de red)
        setTimeout(() => {
            setMensajeEnviado(true);
            // Puedes realizar otras acciones después de enviar el mensaje si es necesario
        }, 2000);
    }

    return (
        <>
            {cars.map((car) => (
                <Col lg={4} md={4} sm={6} className="mb-5" key={car.id}>
                    <div className="car-item">
                        <div className="car-img">
                            <img src={car.image_url} alt="" className="w-100 car-image" />
                        </div>

                        <div className="car-item-content mt-4">
                            <h4 className="section-title text-center">{car.carName}</h4>
                            <h6 className="rent-price text-center mt-">${car.price}</h6>

                            <div className="car-item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                                <span className="d-flex align-items-center gap-1">
                                    <p>{car.model}</p>
                                </span>
                                <span className="d-flex align-items-center gap-1">
                                    <p>{car.automatic}</p>
                                </span>
                                <span className="d-flex align-items-center gap-1">
                                    <p>{car.speed}</p>
                                </span>
                            </div>

                            <Button className="w-50 car-item-btn car-btn-rent" onClick={toggleModal}>Contactar al Cliente</Button>
                            <Button className="w-50 car-item-btn car-btn-details">
                                <Link to={`/cars/${car.id}`}>Detalles</Link>
                            </Button>
                        </div>
                    </div>
                </Col>
            ))}

            {/* Modal de contacto */}
            <Modal show={modalShow} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Contacto del Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={enviarMensaje}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CarItem;
