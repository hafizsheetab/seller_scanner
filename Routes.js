import React, { useState } from "react";
import { Router, Scene } from "react-native-router-flux";
import ProductPage from "./Components/ProductPage";
import ProfilePage from "./Components/ProfilePage";
import QRCode from "./Components/QRCode";

const Routes = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene
                    key="home"
                    component={ProfilePage}
                    initial={true}
                    hideNavBar={true}
                />
                <Scene key="qrcode" component={QRCode} hideNavBar={true} />
                <Scene
                    key="product"
                    component={ProductPage}
                    hideNavBar={true}
                />
            </Scene>
        </Router>
    );
};

export default Routes;
