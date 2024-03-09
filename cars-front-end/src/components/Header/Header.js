import React, { useRef } from "react";
import { Container, NavLink } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../styles/header.css";



const navLinks = [
    {
        path: "/home",
        display: "Inicio",
    },
    {
        path: "/cars",
        display: "Ventas de autos",
    },
    {
        path: "/publicar-autos",
        display: "Publica tu auto",
        requiresAuth: true
    },
    {
        path: "/ListUserPage",
        display: "Prueba",
    },
];

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

    const logoutUser = () => {
        axios.get('http://localhost:5000/logout')
            .then(response => {
                setIsAuthenticated(false);
                localStorage.removeItem('user_id');
                navigate('/home');
            })
            .catch(error => console.error(error));
    }

    return (
        <header className="header">
            <div className="main__navbar">
                <Container>
                    <div className="navigation__wrapper d-flex align-items-center justify-content-between">
                        <span className="mobile__menu">
                            <i className="ri-menu-line" onClick={toggleMenu}></i>
                        </span>

                        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                            <div className="menu">
                                {navLinks.map((item, index) => (

                                    (!item.requiresAuth || isAuthenticated) && (
                                        <NavLink
                                            to={item.path}
                                            tag={Link}
                                            className="nav__item"
                                            key={index}
                                        >
                                            {item.display}
                                        </NavLink>
                                    )
                                ))}
                            </div>
                        </div>

                        <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                            {isAuthenticated ? (
                                <span>
                                    <Link className="logout__button" onClick={logoutUser}>
                                        <i className="ri-login-circle-line"></i> Cerrar sesión
                                    </Link>
                                </span>
                            ) : (
                                <span>
                                    <Link to="/login" className=" d-flex align-items-center gap-1">
                                        <i className="ri-login-circle-line"></i> Iniciar sesión
                                    </Link>
                                </span>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </header>
    );
};

export default Header;
