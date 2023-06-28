import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import "../../style/home.css";

function InternalHome() {
    return (
        <>
            <div className="home">
                <div className="logo">
                    <LogoSVG />
                </div>
                <div className="homeOmnibox">
                    <input className="mainSearch" />
                    <div className="homeSearchIcon">
                        <SearchIcon style={{"height": "70%", "width": "70%"}} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InternalHome;