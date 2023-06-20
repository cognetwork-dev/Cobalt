import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import { ReactComponent as DockSVG } from "../assets/dock-to-left-filled.svg";

function Home() {
    const web = React.useRef();
    const search = React.useRef();
    var webFirstLoad = false

    const reloadPage = () => {
        web.current.contentWindow.location.reload();
    }

    const historyBack = () => {
        web.current.contentWindow.history.back();
    }

    const historyForward = () => {
        web.current.contentWindow.history.forward();
    }

    const webLoad = () => {
        //console.log(web.current, search.current)
        var webChange = function () {
            setTimeout(function () {
                console.log(__uv$config.decodeUrl(web.current.contentWindow.location.toString().split(__uv$config.prefix)[1]))
            })
        }
        
        web.current.contentWindow.removeEventListener("unload", webChange)
        web.current.contentWindow.addEventListener("unload", webChange)
        webChange()
    }

    function isURL(url) {
        if (!url.includes(".")) {
            return false;
        }

        try {
            var valid = new URL(url)
    
            return valid.toString();
        } catch {
            try {
                var valid = new URL("https://" + url)
    
                return valid.toString();
            } catch {
                return false;
            }
        }
    }

    const searchURL = (e) => {
        let checkURL = isURL(e.target.value)

        if (checkURL) {
            search.current.value = checkURL
            web.current.contentWindow.location = new URL(__uv$config.prefix + __uv$config.encodeUrl(checkURL), window.location)
        } else {
            search.current.value = new URL("https://www.google.com/search?q=" + encodeURIComponent(e.target.value)).toString()
            web.current.contentWindow.location = new URL(__uv$config.prefix + __uv$config.encodeUrl("https://www.google.com/search?q=" + encodeURIComponent(e.target.value)), window.location)
        }

        search.current.blur()
        web.current.focus()
    }

    const togglePanel = () => {
        if (!document.body.dataset.panel) {
            return document.body.dataset.panel = "true"
        } else if (document.body.dataset.panel == "true") {
            return document.body.dataset.panel = "false"
        } else if (document.body.dataset.panel == "false") {
            return document.body.dataset.panel = "true"
        }
    }

    return (
        <>
            <div className="nav">
                <div className="controls" data-side="left">
                    <div className="controlsButton" onClick={historyBack}>
                        <ArrowBackIcon fontSize="small" />
                    </div>
                    <div className="controlsButton" onClick={historyForward}>
                        <ArrowForwardIcon fontSize="small" />
                    </div>
                    <div className="controlsButton" onClick={reloadPage}>
                        <RefreshIcon fontSize="small" />
                    </div>
                </div>
                <div className="omnibox">
                    <input ref={search} autoComplete="off" className="search" onKeyUp={(e) => {
                        if (e.key == "Enter") {
                            return searchURL(e)
                        }
                    }} />
                    <div className="searchIcon">
                        <SearchIcon style={{"height": "0.7em", "width": "0.7em"}} />
                    </div>
                </div>
                <div className="controls" data-side="right">
                    <div className="controlsButton" onClick={() => togglePanel()}>
                        <DockSVG style={{"height": "1.25em", "width": "1.25em"}} />
                    </div>
                </div>
            </div>
            <iframe ref={web} onLoad={webLoad} src="/ultraviolet/hvtrs8%2F-ezaopne%2Ccmm-" className="web"></iframe>
            <div className="panel">
                <div className="sidePanel"></div>
            </div>
        </>
    )
}

export default Home;