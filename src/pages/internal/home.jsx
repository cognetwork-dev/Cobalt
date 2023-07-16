import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import Head from "../../components/head.jsx";
import { github, discord } from "../../consts.jsx";
import "../../style/home.css";
import Obfuscate from "../../components/obfuscate";

function InternalHome() {
    const mainSearch = React.useRef()
    
    React.useEffect(() => {
        mainSearch.current.focus()
    }, []);

    const searchType = (e) =>{
        if (e.key == "Enter" && e.target.value) {
            return window.parent.Cobalt.navigate(e.target.value)
        }
    }

    return (
        <>
            <Head defaultTitle="Home" />
            <div className="home">
                <div className="logo">
                    <LogoSVG />
                </div>
                <div className="homeOmnibox">
                    <input ref={mainSearch} className="mainSearch" onKeyUp={searchType} />
                    <div className="homeSearchIcon">
                        <SearchIcon style={{"height": "70%", "width": "70%"}} />
                    </div>
                </div>
            </div>
            <div className="footer">
                <Obfuscate>Cobalt 2023 | </Obfuscate><a href={discord}><Obfuscate>Discord</Obfuscate></a><Obfuscate> / </Obfuscate><a href={github}><Obfuscate>Source</Obfuscate></a>
            </div>
        </>
    )
}

export default InternalHome;