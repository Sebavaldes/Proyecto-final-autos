import React from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
    return (
        <Form className="search">
            <div className="secContainer container">
                <FormGroup className="form__group">
                    <label>Marca:</label>
                    <input type="text" placeholder="Ej. Toyota" />



                    <label>Modelo:</label>
                    <input type="text" placeholder="Ej. Camry" />



                    <label>Año:</label>
                    <input type="text" placeholder="Ej. 2022" />
                </FormGroup>

                <FormGroup className="form__group">
                    <button className="btn find__car-btn">Buscar Autos</button>
                </FormGroup>
            </div>
        </Form>
    );
};

export default FindCarForm;