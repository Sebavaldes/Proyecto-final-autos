import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import CarListing from "../pages/CarListing";
import NotFound from "../pages/NotFound";
import LoginSignup from "../pages/LoginSignup";
import Inscribirse from "../pages/Inscribirse";
import CarDetails from "../pages/CarDetails";
import PublicarAutos from "../pages/PublicarAutos";
import Header from "../components/Header/Header";

const Routers = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);



    return (
        <>
            <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cars" element={<CarListing />} />
                <Route path="/cars/:slug" element={<CarDetails />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<LoginSignup setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/inscribirse' element={<Inscribirse />} />
                <Route path='/publicar-autos' element={<PublicarAutos />} />
            </Routes>
        </>
    );
};

export default Routers;
