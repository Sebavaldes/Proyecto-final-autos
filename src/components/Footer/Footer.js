import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";


const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="footer">
            <Container>
                <Row>





                    <Col lg="3" md="4" sm="12">
                        <div className="mb-4">
                            <h5 className="footer__link-title"></h5>
                            <p className="section__description"></p>
                            <div className="newsletter">

                            </div>
                        </div>
                    </Col>

                    <Col lg="12">
                        <div className="footer__bottom">
                            <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                                <i class="ri-copyright-line"></i>

                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;