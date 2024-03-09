import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/PublicarAutos.css";

const PublicarAutos = () => {
    const [carName, setCarName] = useState('');
    const [model, setModel] = useState('');
    const [automatic, setAutomatic] = useState('');
    const [price, setPrice] = useState('');
    const [speed, setSpeed] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImage_url] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const data = {
            carName,
            model,
            automatic,
            price,
            speed,
            description,
            image_url
        };

        const user_id = localStorage.getItem('user_id');

        if (user_id) {
            data.user_id = user_id;

            try {
                const response = await axios.post('http://localhost:5000/publicarautos', data);
                console.log(response);
                navigate("/cars");
            } catch (error) {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    alert("No autorizado para publicar el auto");
                }
            }
        } else {
            alert("Por favor inicia sesión para publicar un auto");
        }
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Images');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/denpjibiu/image/upload', formData);
            const image_url = response.data.secure_url;
            setImage_url(image_url);
        } catch (error) {
            console.error('Error al subir la imagen a Cloudinary:', error);
        }
    };

    return (
        <div className="publicar-autos-container">
            <div className="form-container">
                <h2 className="form-title">Formulario de Venta de Auto</h2>
                <form className="car-form">
                    <input
                        type="text"
                        placeholder="Modelo del auto"
                        value={carName}
                        onChange={(e) => setCarName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Marca"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tipo de transmisión"
                        value={automatic}
                        onChange={(e) => setAutomatic(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Precio"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Kilometraje"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        required
                    />
                    <textarea
                        rows={3}
                        placeholder="Descripción del vehículo"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    <button type="button" onClick={handleSubmit} className="submit-button">
                        Enviar Formulario
                    </button>
                </form>
            </div>
            <div className="image-container">

                <img src="https://cdn.buttercms.com/wLBuRg7ISYaajncSXn38" alt="Imagen de ejemplo" style={{

                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }} />
            </div>

        </div>
    );
};

export default PublicarAutos;

