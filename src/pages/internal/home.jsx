import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import "../../style/home.css";

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
        </>
    )
}

export default InternalHome;