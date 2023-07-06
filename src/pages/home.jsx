import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { ReactComponent as DockSVG } from "../assets/dock-to-left-filled.svg";
import HomeIcon from '@mui/icons-material/Home';
import { BareClient } from "@tomphttp/bare-client";
import { bareServerURL } from "../consts.jsx";
import Obfuscate from "../components/obfuscate.jsx"
import Head from "../components/head.jsx"

function Home() {
    const bare = React.useMemo(() => new BareClient(bareServerURL), []);

    const web = React.useRef();
    const search = React.useRef();
    const [ lastURL, setLastURL] = React.useState("");
    const [ homeURL, setHomeURL ] = React.useState("cobalt://home");
    const [ loading, setLoading] = React.useState(false);
    const internalURLS = ["home", "blank"];
    const [ canGoBack, setCanGoBack] = React.useState(false);
    const [ canGoForward, setCanGoForward] = React.useState(false);
    const [ suggestions, setSuggestions ] = React.useState([]);
    const [ searchEngine, setSearchEngine ] = React.useState("https://www.google.com/search?q=%s");
    const [ useSuggestions, setUseSuggestions ] = React.useState(true);
    const [ currentURL, setCurrentURL ] = React.useState(homeURL);
    const defaultPanelOptions = [
        {
            "name": "Favorites",
            "content": "",
            "script": ""//"Cobalt.sidePanelBody.querySelector('div').querySelector('div').textContent = 'Favorites load script'"
        },
        {
            "name": "History",
            "component": "history"
        },
        {
            "name": "Themes",
            "content": "<p>Themes</p>"
        },
        {
            "name": "Custom Style",
            "content": "<p>Custom Style</p>"
        },
        {
            "name": "Extensons",
            "content": "<p>Extensons</p>"
        },
        {
            "name": "Settings",
            "content": "<p>Settings</p>",
            "script": "console.log('Clicked on settings tab')"
        }
    ]
    const [ panelOptions, setPanelOptions ] = React.useState(defaultPanelOptions);
    const [ currentPanelOption, setCurrentPanelOption ] = React.useState(0);
    const sidePanelNav = React.useRef();
    const sidePanelBody = React.useRef();
    const [ history, setHistory ] = React.useState([]);

    const HistoryComponent = () => {        
        return (
            <>
                {history.map((item, index) => (
                    <div key={index}>{item.url}</div>
                ))}
            </>
        )
    }

    const SidePanelMainComponent = () => {
        return (
            <div dangerouslySetInnerHTML={{__html: panelOptions[currentPanelOption].content}}></div>
        )
    }

    React.useEffect(() => {
        searchURL(homeURL)
    }, [])

    React.useEffect(() => {
        if (!useSuggestions) {
            setSuggestions([]);
        }
    }, [useSuggestions]);

    const searchEngineURL = (query) => {
        return searchEngine.replace("%s", query)
    }

    const reloadPage = () => {
        setLoading(true)

        web.current.contentWindow.location.reload();
    }

    const historyBack = () => {
        if (canGoBack) {
            setLoading(true)

            web.current.contentWindow.history.back();
        }
    }

    const historyForward = () => {
        if (canGoForward) {
            setLoading(true)

            web.current.contentWindow.history.forward();
        }
    }

    const stopLoadingPage = () => {
        setLoading(false)

        web.current.contentWindow.stop();
    }

    const webLoad = () => {
        setLoading(false)
        
        var webChange = function () {
            setTimeout(function () {
                setCanGoBack(web.current.contentWindow.navigation.canGoBack)
                setCanGoForward(web.current.contentWindow.navigation.canGoForward)

                if (web.current.contentWindow.location.pathname.startsWith(__uv$config.prefix)) {
                    var url = __uv$config.decodeUrl(web.current.contentWindow.location.pathname.split(__uv$config.prefix)[1])

                    //Extension test: Darkreader
                    setTimeout(function() {
                        var darkreader = web.current.contentWindow.document.createElement("script");darkreader.src = "https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js";web.current.contentWindow.document.head.appendChild(darkreader);darkreader.onload = function() {web.current.contentWindow.DarkReader.enable()};
                    })

                } else if (web.current.contentWindow.location.pathname.startsWith("/internal/")) {
                    if ((web.current.contentWindow.location.pathname + web.current.contentWindow.location.search).startsWith("/internal/viewsource?url=")) {
                        var url = "view-source:" + (web.current.contentWindow.location.pathname + web.current.contentWindow.location.search).split("/internal/viewsource?url=")[1]
                    } else {
                        var url = "cobalt://" + web.current.contentWindow.location.pathname.split("/internal/")[1]
                    }
                } else {
                    var url = web.current.contentWindow.location.toString()
                }

                if (url !== lastURL) {
                    search.current.value = url
                    setCurrentURL(url)
                    setLastURL(url)
                    setHistory(history =>  [...history, {
                        url: url
                    }])
                }
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

    const searchURL = (value) => {
        value = value.trim()

        setLoading(true)

        if (value.startsWith("cobalt://") && internalURLS.includes(value.split("cobalt://")[1])) {
            search.current.value = value
            web.current.contentWindow.location = new URL("/internal/" + value.split("cobalt://")[1], window.location)
            setCurrentURL(value)
        } else if (value.startsWith("view-source:") && value !== "view-source:") {
            search.current.value = value
            web.current.contentWindow.location = new URL("/internal/viewsource?url=" + value.split("view-source:")[1], window.location)
            setCurrentURL(value.split("view-source:")[1])
        } else {
            var checkURL = isURL(value)

            if (checkURL) {
                search.current.value = checkURL
                web.current.contentWindow.location = new URL(__uv$config.prefix + __uv$config.encodeUrl(checkURL), window.location)
                setCurrentURL(checkURL)
            } else {
                search.current.value = new URL(searchEngineURL(encodeURIComponent(value)).toString()).toString()
                web.current.contentWindow.location = new URL(__uv$config.prefix + __uv$config.encodeUrl(search.current.value), window.location)
                setCurrentURL(new URL(searchEngineURL(encodeURIComponent(value)).toString()).toString())
            }
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

    const toggleSidePanelNav = () => {
        if (!sidePanelNav.current.dataset.open) {
            return sidePanelNav.current.dataset.open = "true"
        } else if (sidePanelNav.current.dataset.open == "true") {
            return sidePanelNav.current.dataset.open = "false"
        } else if (sidePanelNav.current.dataset.open == "false") {
            return sidePanelNav.current.dataset.open = "true"
        }
    }

    const searchFocus = (e) => {
        e.target.select()
    }

    const searchType = (e) =>{
        if (e.key == "Enter" && e.target.value) {
            return searchURL(e.target.value)
        }
    }

    const getSuggestions = async (query, limit=8) => {
        var site = await bare.fetch(
            "https://www.google.com/complete/search?client=firefox&q=" + query
        );
        var results = await site.json();
        results = results[1];
        results = results.slice(0, limit)
        return results;
    }

    const searchChange = async (e) => {
        if (e.target.value && useSuggestions) {
            try {
                var newSuggestions = await getSuggestions(e.target.value)
                setSuggestions(newSuggestions)
            } catch {
                setSuggestions([])
            }
        } else {
            setSuggestions([])
        }
    }

    const searchBlur = () => {
        setTimeout(() => {
            setSuggestions([])
        }, 100)
    }

    const sidePanelNavBlur = () => {
        sidePanelNav.current.dataset.open = "false"
    }

    const setSidePanelOption = (index) => {
        setCurrentPanelOption(index)
    }

    React.useEffect(() => {
        if (panelOptions[currentPanelOption].script && sidePanelBody.current) {            
            setTimeout(() => {
                try {
                    Function("return " + panelOptions[currentPanelOption].script)()
                } catch(e) {
                    console.error("Error is side panel script")
                    console.error(e)
                }
            })
        }
    }, [currentPanelOption])

    if (!window.Cobalt) {
        window.Cobalt = {
            "url": currentURL,
            "navigate": searchURL,
            "reload": reloadPage,
            "back": historyBack,
            "forward": historyForward,
            "togglePanel": togglePanel,
            "homeURL": homeURL,
            "loading": loading,
            "canGoBack": canGoBack,
            "canGoForward": canGoForward,
            "useSuggestions": useSuggestions,
            "searchEngine": searchEngine,
            "getSuggestions": getSuggestions,
            "sidePanelBody": sidePanelBody.current
        }
    }

    React.useEffect(() => {
        window.Cobalt.homeURL = homeURL
    }, [homeURL])

    React.useEffect(() => {
        window.Cobalt.loading = loading
    }, [loading])

    React.useEffect(() => {
        window.Cobalt.canGoBack = canGoBack
    }, [canGoBack])

    React.useEffect(() => {
        window.Cobalt.canGoForward = canGoForward
    }, [canGoForward])

    React.useEffect(() => {
        window.Cobalt.useSuggestions = useSuggestions
    }, [useSuggestions])

    React.useEffect(() => {
        window.Cobalt.searchEngine = searchEngine
    }, [searchEngine])

    React.useEffect(() => {
        window.Cobalt.url = currentURL
    }, [currentURL])

    React.useEffect(() => {
        window.Cobalt.sidePanelBody = sidePanelBody.current
    }, [sidePanelBody.current])

    return (
        <>
            <Head />
            <div className="nav">
                <div className="controls" data-side="left">
                    <div className="controlsButton" onClick={historyBack} data-disabled={canGoBack ? "false": "true"}>
                        <ArrowBackIcon fontSize="small" />
                    </div>
                    <div className="controlsButton" onClick={historyForward} data-disabled={canGoForward ? "false": "true"}>
                        <ArrowForwardIcon fontSize="small" />
                    </div>
                    { !loading ? (
                        <div className="controlsButton" onClick={reloadPage}>
                            <RefreshIcon fontSize="small" />
                        </div>
                    ) : (
                        <div className="controlsButton" onClick={stopLoadingPage}>
                            <CloseIcon fontSize="small" />
                        </div>
                    )
                    }
                    <div className="controlsButton" onClick={() => searchURL(homeURL)}>
                        <HomeIcon fontSize="small" />
                    </div>
                </div>
                <div className="omnibox" data-suggestions={suggestions.length > 0 ? "true" : "false"}>
                    <input ref={search} defaultValue={homeURL} onFocus={searchFocus} onBlur={searchBlur} autoComplete="off" className="search" onKeyUp={searchType} onChange={searchChange} />
                    <div className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <div className="suggestion" onClick={() => {searchURL(suggestion); setSuggestions([])}} key={index}>
                                <div className="suggestionIcon">
                                    <SearchIcon style={{"height": "0.7em", "width": "0.7em"}} />
                                </div>
                                <Obfuscate>{suggestion}</Obfuscate>
                            </div>
                        ))}
                    </div>
                    <div className="searchIcon">
                        <SearchIcon style={{"height": "70%", "width": "70%"}} />
                    </div>
                    <div className="favoriteIcon">
                        <StarBorderIcon fontSize="small" />
                        {/**StarIcon */}
                    </div>
                </div>
                <div className="controls" data-side="right">
                    <div className="controlsButton" onClick={() => togglePanel()}>
                        <DockSVG style={{"height": "70%", "width": "70%"}} />
                    </div>
                </div>
            </div>
            <iframe ref={web} onLoad={webLoad} className="web"></iframe>
            <div className="panel">
                <div className="sidePanel">
                    <div className="sidePanelNav" ref={sidePanelNav}>
                        <div className="sidePanelItem" tabIndex="0" onClick={toggleSidePanelNav} onBlur={sidePanelNavBlur}>
                            <div className="sidePanelItemTitle"><Obfuscate>{panelOptions[currentPanelOption].name}</Obfuscate></div>
                            <div className="sidePanelItemIcon">
                                <ArrowDropDownIcon fontSize="small" />
                            </div>
                            <div className="sidePanelItems">
                                {panelOptions.map((option, index) => (
                                    <div className="sidePanelItemsOption" onClick={() => setSidePanelOption(index)} key={index}>
                                        <Obfuscate>{option.name}</Obfuscate>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sidePanelClose" onClick={togglePanel}>
                            <CloseIcon fontSize="small" />
                        </div>
                    </div>
                    <div ref={sidePanelBody} className="sidePanelBody">
                        <div>
                            {
                                panelOptions[currentPanelOption].component ? <HistoryComponent /> : <SidePanelMainComponent />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;