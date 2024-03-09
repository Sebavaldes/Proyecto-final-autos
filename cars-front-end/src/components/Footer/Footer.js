import React from "react";

import { Container, Row, Col } from "reactstrap";
import "./footer.css";


const Footer = () => {

    return (
        <footer className="footer">
            <Container>
                <Row>

                    <Col lg="3" md="4" sm="12">
                        <div className="mb-4">
                        </div>
                    </Col>

                    <Col lg="12">
                        <div className="footer__bottom">
                            <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                                © 2024 Copyright:
                                <a className="text-white" href="#!">Cars.com</a>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;