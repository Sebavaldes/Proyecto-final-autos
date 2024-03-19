import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/Ul/CommonSection";
import CarItem from "../components/Ul/CarItem";

import axios from "axios";
const CarListing = () => {

    const [cars, setCars] = useState([]);

    useEffect(() => {
        getCars();
    }, []);

    function getCars() {
        axios.get('/listusers')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars:', error);
            });
    }
    return (
        <Helmet title="Cars">
            <CommonSection title="Autos en ventas" />

            <section>
                <Container>
                    <Row>
                        <CarItem />
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default CarListing;