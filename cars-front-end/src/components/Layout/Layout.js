import React, { Fragment } from "react";

import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";

const Layout = () => {
    return (
        <Fragment>

            <div>
                <Routers />
            </div>
            <Footer />
        </Fragment>
    );
};

export default Layout;