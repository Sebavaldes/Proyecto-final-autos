import React, { useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
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
        path: "/cars2",
        display: "Vendidos",
    },
    {
        path: "/detalle",
        display: "detalle",
    },
];

const Header = () => {
    const menuRef = useRef(null);

    const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

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
                                    <NavLink
                                        to={item.path}
                                        className={(navClass) =>
                                            navClass.isActive ? "nav__active nav__item" : "nav__item"
                                        }
                                        key={index}
                                    >
                                        {item.display}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <Col lg="6" md="6" sm="6">
                            <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                                <Link to="/login" className=" d-flex align-items-center gap-1">
                                    <i className="ri-login-circle-line"></i> Iniciar sesion
                                </Link>
                            </div>
                        </Col>

                        <div className="nav__right">
                            <div className="search__box">
                                <input type="text" placeholder="Buscar" />
                                <span>
                                    <i className="ri-search-line"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </header>
    );
};

export default Header;