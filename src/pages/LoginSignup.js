import React from 'react';
import '../styles/LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap (opcional)

const LoginSignup = () => {
    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Bienvenido</h1>
                <form>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Nombre de Usuario" />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Correo Electronico" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Clave" />
                    </div>
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                </form>
                <p className="loginsignup-login">
                    <span>Crear cuenta nueva</span>
                </p>
            </div>
        </div>
    );
};

export default LoginSignup;