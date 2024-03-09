import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginSignup = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const logInUser = () => {
        if (email.length === 0) {
            alert("Email has left Blank!");
        } else if (password.length === 0) {
            alert("Password has left Blank!");
        } else {
            axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                    localStorage.setItem('user_id', response.data.id);
                    setIsAuthenticated(true);
                    navigate("/");
                })
                .catch(function (error) {
                    console.log(error, 'error');
                    if (error.response.status === 401) {
                        alert("Invalid credentials");
                    }
                });
        }
    }







    return (
        <section className="vh-100" style={{ backgroundColor: '#D3D3D3' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://www.xtrafondos.com/wallpapers/vertical/toyota-gr-supra-ac-schnitzer-9660.jpg"
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
                                                <span className="h1 fw-bold mb-0">Bienvenido</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Iniciar Sesión</h5>
                                            <div className="form-outline mb-4">
                                                <input type="email" id="form2Example17" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="form2Example17">Correo electrónico</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" id="form2Example27" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="form2Example27">Contraseña</label>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block" type="button" onClick={logInUser}>Iniciar Sesión</button>
                                            </div>
                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>¿No tienes una cuenta? <a href="#!" style={{ color: '#393f81' }}><Link to={`/inscribirse/`}>Regístrate aquí</Link></a></p>
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

export default LoginSignup;
