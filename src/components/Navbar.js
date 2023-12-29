function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">LAURA'S CARS SPA</a>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="d-flex">
                    <div className="navbar-collapse collapse" id="navbarsExample03">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Iniciar Sesion</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Registrarse</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </nav >

    )
}

export default Navbar;
