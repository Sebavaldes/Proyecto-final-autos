import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


const Inscribirse = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const registerUser = () => {
        axios.post('http://localhost:5000/inscribirse', {
            email: email,
            password: password,
            name: name,
        })
            .then(function (response) {
                console.log(response);
                navigate("/login");
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            });
    };



    return (
        <section className="vh-100" style={{ backgroundColor: '#D3D3D3' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://f.vividscreen.info/soft/9ec0bbe46acace71c14fa8b0813763c3/Tesla-S-1680x1050.jpg"
                                        alt="login form" className="img-fluid" style={{
                                            borderRadius: '1rem 0 0 1rem',
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <span className="h1 fw-bold mb-0">Regístrate</span>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="form2Example17" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="form2Example17">Nombre</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="form3Example3">Correo Electronico</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form2Example27" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="form2Example27">Contraseña</label>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block" type="button" onClick={() => registerUser()}>Registrarse</button>
                                            </div>
                                            <div style={{ color: '#393f81' }}>
                                                ¿Ya tienes una cuenta? <Link to="/login/">Iniciar sesión</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Inscribirse