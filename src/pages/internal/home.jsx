import React from "react";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import "../../style/home.css";

function InternalHome() {
    return (
        <>
            <div className="home">
                <div className="logo">
                    <LogoSVG />
                </div>
                <input className="mainSearch" placeholder="Search or type a URL" />
            </div>
        </>
    )
}

export default InternalHome;