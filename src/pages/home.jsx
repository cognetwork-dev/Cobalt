import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import PublicIcon from '@mui/icons-material/Public';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReactComponent as DockSVG } from "../assets/dock-to-left-filled.svg";
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { BareClient } from "@tomphttp/bare-client";
import clsx from "clsx";
import { bareServerURL } from "../consts.jsx";
import Obfuscate from "../components/obfuscate.jsx"
import Head from "../components/head.jsx"
import { useLocalHistory } from "../settings.jsx";
import { useLocalAppearance, useLocalTitle, useLocalIcon, useLocalCustomStyle } from "../settings.jsx";
import Editor from '@monaco-editor/react';

function Home() {
    const bare = React.useMemo(() => new BareClient(bareServerURL), []);
    const web = React.useRef();
    const search = React.useRef();
    const [ lastURL, setLastURL] = React.useState("");
    var homeURL = (localStorage.getItem("homeURL") || "cobalt://home");
    const [ loading, setLoading] = React.useState(false);
    const internalURLS = ["home", "blank"];
    const [ canGoBack, setCanGoBack] = React.useState(false);
    const [ canGoForward, setCanGoForward] = React.useState(false);
    const [ suggestions, setSuggestions ] = React.useState([]);
    const [ searchEngine, setSearchEngine ] = React.useState(localStorage.getItem("engine") || "https://www.google.com/search?q=%s");
    const [ useSuggestions, setUseSuggestions ] = React.useState(true);
    const [ currentURL, setCurrentURL ] = React.useState(homeURL);
    const defaultPanelOptions = [
        {
            "name": "Favorites",
            "content": "",
            "id": "defaultFavorites",
            "script": "Cobalt.setSidePanelBody('defaultFavorites', '<h1>Coming soon!</h1>')"
        },
        {
            "name": "History",
            "component": "history"
        },
        {
            "name": "Themes",
            "component": "themes"
        },
        {
            "name": "Cloaking",
            "component": "cloaking"
        },
        {
            "name": "Custom Style",
            "component": "customStyle"
        },
        {
            "name": "Extensons",
            "content": "<div>Coming Soon!</div>",
            "script": "console.log('Clicked on extensions tab')"
        },
        {
            "name": "Settings",
            "component": "settings",
        }
    ]
    const [ panelOptions, setPanelOptions ] = React.useState(defaultPanelOptions);
    const [ currentPanelOption, setCurrentPanelOption ] = React.useState(0);
    const sidePanelNav = React.useRef();
    const sidePanelBody = React.useRef();
    const [ sidePanelBodyData, setSidePanelBodyData ] = React.useState({});
    const [history, setHistory] = useLocalHistory();
    const [ loaded, setLoaded ] = React.useState(true);
    const [ checking, setChecking ] = React.useState(false);
  
    const HistoryComponent = () => {
        const removeHistory = (e, index) => {
            e.stopPropagation()
    
            let tempHistory = JSON.parse(history)
            tempHistory = tempHistory.filter((item, index2) => index2 !== index)
            setHistory(JSON.stringify(tempHistory))
        }

        const clearHistory = () => {
            setHistory(JSON.stringify([]))
        }
        
        return (
            <>
            <div className="historyPanelRemoveAll" onClick={() => clearHistory()}>
                <DeleteIcon fontSize="small" />
                Clear History
            </div>
            <div className="historyPanel">
                {JSON.parse(history).map((item, index) => (
                    <div title={item.url + " - " + new Date(item.time).toLocaleTimeString(90, {hour: "numeric", minute: "numeric"}) + " " + new Date(item.time).toLocaleDateString()} key={index} className="historyPanelItem" onClick={() => searchURL(item.url)}>
                        {
                            item.favicon ? (
                                <img className="historyPanelFavicon" src={item.favicon} />
                            ) : (
                                <div className="historyPanelFaviconGlobe">
                                    <PublicIcon style={{"height": "18px", "width": "18px"}} />
                                </div>
                            )
                        }
                        <div className="historyPanelTitle">{item.title || item.url}</div>
                        <div className="historyPanelRemove" onClick={(e) => removeHistory(e, index)}>
                            <DeleteIcon fontSize="small" />
                        </div>
                    </div>
                ))}
            </div>
            </>
        )
    }

    function ThemeOption({ theme, noPreview, children }) {
        const [localAppearance, setLocalAppearance] = useLocalAppearance();
      
        var themeStyle = !noPreview ? {"--theme": "var(--" + theme + "-theme)"} : {}
      
        return (
          <div
            onClick={() => {
              setLocalAppearance(theme);
              if (currentURL.startsWith("cobalt://") || currentURL.startsWith("view-source:")) {
                web.current.contentWindow.document.body.setAttribute("data-appearance", theme)
              }
            }}
            style={themeStyle}
            className={clsx(
              "sidePanelTheme",
              theme === localAppearance && "sidePanelThemeActive"
            )}
          >
            {children}
          </div>
        );
    }

    const SettingsComponent = () => {
        const setHomeURL = (value) => {
            localStorage.setItem("homeURL", (value || "cobalt://home"))
            homeURL = (value || "cobalt://home")
        }

        const setSearchEngineURL = (value) => {
            localStorage.setItem("engine", (value || "https://www.google.com/search?q=%s"))
            setSearchEngine(value || "https://www.google.com/search?q=%s")
        }

        return (
            <>
                <div>
                    <div className="settingsTitle">Home Page</div>
                    <input onChange={(e) => setHomeURL(e.target.value)} defaultValue={homeURL || ""} autoComplete="off" className="sidePanelCloakingInput"></input>
                    <div className="settingsTitle settingsTitleSecondary">Search Engine</div>
                    <input onChange={(e) => setSearchEngineURL(e.target.value)} defaultValue={searchEngine || ""} placeholder="URL with %s in place of query" autoComplete="off" className="sidePanelCloakingInput"></input>
                </div>
            </>
        )
    }

    const CustomStyleComponent = () => {
        const [localCustomStyle, setLocalCustomStyle] = useLocalCustomStyle();

        const customStyleChange = (value, event) => {
            setLocalCustomStyle(value)
        }

        return (
            <div className="customStyleMain" >
                <Editor onChange={customStyleChange} value={localCustomStyle} options={{wordWrap: true, roundedSelection: true, minimap: { enabled: false }, tabSize: 8, quickSuggestions: false}} loading="" height="100%" defaultLanguage="css" theme="vs-dark" />
            </div>
        )
    }
    
    const CloakingComponent = () => {
        var [localTitle, setLocalTitle] = useLocalTitle();
        var [localIcon, setLocalIcon] = useLocalIcon();
        var title = React.useRef();
        var icon = React.useRef();

        const resetCloaking = () => {
            setLocalTitle("")
            setLocalIcon("")
        }

        function ChangeIcon({ title, icon }) {
            return (
              <div
                onClick={() => {
                  setLocalTitle(title);
                  setLocalIcon(icon);
                }}
                className="sidePanelCloakingPreset"
              >
                <img style={{ pointerEvents: "none" }} src={icon} alt={title} />
              </div>
            );
          }        

        return (
            <>
                <div className="sidePanelCloakingPresets">
                    <div className="sidePanelCloakingPreset" onClick={resetCloaking}>
                        <CloseIcon style={{ pointerEvents: "none" }} fontSize="medium" />
                    </div>
                    <ChangeIcon icon="https://www.google.com/favicon.ico" title="Google" />
                    <ChangeIcon
                      icon="https://www.drive.google.com/favicon.ico"
                      title="Google Drive"
                    />
                    <ChangeIcon
                      icon="https://edpuzzle.imgix.net/favicons/favicon-32.png"
                      title="EdPuzzle"
                    />
                    <ChangeIcon icon="https://st1.zoom.us/zoom.ico" title="Zoom" />
                    <ChangeIcon
                      icon="https://www.khanacademy.org/favicon.ico"
                      title="Khan Academy"
                    />
                </div>
                <input ref={title} onChange={(e) => setLocalTitle(e.target.value)} autoComplete="off" value={localTitle || ""} className="sidePanelCloakingInput" placeholder="Title" />
                <input ref={icon} onChange={(e) => setLocalIcon(e.target.value)} autoComplete="off" value={localIcon || ""} className="sidePanelCloakingInput" placeholder="Favicon URL" />
            </>
        )
    }

    const ThemesComponent = () => {
        return (
            <div className="sidePanelThemes">
                <ThemeOption theme="default" noPreview="true">
                  <div className="sidePanelThemePreview sidePanelThemePreviewDefault">
                    <AutoAwesomeIcon fontSize="large" />
                  </div>
                  <Obfuscate>Default</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="dark">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Dark</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="light">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Light</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="ruby">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Ruby</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="frog">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Frog</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="space">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Space</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="molten">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Molten</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="swamp">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Swamp</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="squid">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Squid</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="lemon">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Lemon</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="lime">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Lime</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="nord">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Nord</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="violet">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Violet</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="online">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Online</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="dune">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Dune</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="dracula">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Dracula</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="ice">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Ice</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="chocolate">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Chocolate</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="campfire">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Campfire</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="elixir">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Elixir</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="happiness">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Happiness</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="robot">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Robot</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="butter">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Butter</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="sun">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Sun</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="plum">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Plum</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="sky">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Sky</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="matrix">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Matrix</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="gruvbox">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Gruvbox</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="quantum">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Quantum</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="manjaro">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Manjaro</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="leafy">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Leafy</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="blackpink">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Blackpink</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="retro">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Retro</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="honey">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Honey</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="pod">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Pod</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="flamingo">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Flamingo</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="magma">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Magma</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="hacker">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Hacker</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="jungle">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Jungle</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="nebelung">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Nebelung</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="catppuccin-latte">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Latte</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="catppuccin-frappe">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Frappe</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="catppuccin-macchiato">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Macchiato</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="catppuccin-mocha">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Mocha</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="cobalt2">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Cobalt2</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="rose-pine">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Rosé Pine</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="tokyo-night">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Tokyo</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="classic">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Classic</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="simple">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Simple</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="corn">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Corn</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="alice">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Alice</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="kahoot">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Kahoot</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="booklet">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Booklet</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="chrome">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Chrome</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="tiktok">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Tiktok</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="pride">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Pride</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="shadow">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Shadow</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="eaglenet">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Eaglenet</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="echo">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>3kh0</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="fracital">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Fracital</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="nebula">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Nebula</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="atom">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Atom</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="immortal">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Immortal</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="baja-blast">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Baja Blast</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="tsunami">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Tsunami</Obfuscate>
                </ThemeOption>
                <ThemeOption theme="metallic">
                  <div className="sidePanelThemePreview"></div>
                  <Obfuscate>Metallic</Obfuscate>
                </ThemeOption>
            </div>
        )
    }

    const SidePanelMainComponent = () => {
        if (panelOptions[currentPanelOption].id) {
            if (sidePanelBodyData[panelOptions[currentPanelOption].id]) {
                var content = sidePanelBodyData[panelOptions[currentPanelOption].id]
            }
        } else {
            var content = panelOptions[currentPanelOption].content
        }

        return (
            <div dangerouslySetInnerHTML={{__html: content}}></div>
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

    try {
        JSON.parse(history)
    } catch {
        console.error("Error with history: Not valid JSON")
        console.error(history)
        setHistory("[]")
    }

    async function createFavicon(url) {
        return new Promise(async (resolve, reject) => {
            try {
                var response = await bare.fetch(url)
                var blob = await response.blob()
                var reader = new FileReader()

                reader.onloadend = function() {
                    resolve(reader.result)
                }
            
                reader.readAsDataURL(blob)
            } catch {
                resolve("")
            }
        })
    }

    const webLoad = async () => {
        setLoading(false)

        if (web.current.contentWindow.location.pathname.startsWith(__uv$config.prefix)) {
            var url = __uv$config.decodeUrl(web.current.contentWindow.location.pathname.split(__uv$config.prefix)[1])
        } else if (web.current.contentWindow.location.pathname.startsWith("/internal/")) {
            if ((web.current.contentWindow.location.pathname + web.current.contentWindow.location.search).startsWith("/internal/viewsource?url=")) {
                var url = "view-source:" + (web.current.contentWindow.location.pathname + web.current.contentWindow.location.search).split("/internal/viewsource?url=")[1]
            } else {
                var url = "cobalt://" + web.current.contentWindow.location.pathname.split("/internal/")[1]
            }
        } else {
            var url = web.current.contentWindow.location.toString()
        }

        var title = web.current.contentWindow.document.title
        var favicon = [...web.current.contentWindow.document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")].slice(-1)[0] ? [...web.current.contentWindow.document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")].slice(-1)[0].href ? [...web.current.contentWindow.document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")].slice(-1)[0].href : "" : ""
        
        if (url.startsWith("cobalt://") || url.startsWith("view-source:")) {
            favicon = ""
        }

        if (url.startsWith("cobalt://")) {
            title = url.split("cobalt://")[1]
            title = title.charAt(0).toUpperCase() + title.slice(1)
        }

        if (favicon) {
            favicon = await createFavicon(favicon)
        }

        function addHistory() {
            var tempHistory = JSON.parse(history)

            tempHistory.unshift({
                url: url,
                title: title,
                time: Date.now(),
                favicon: favicon
            })

            setHistory(JSON.stringify(tempHistory))

            if (!checking && loaded) {
                setChecking(true)

                setInterval(async () => {
                    if (web.current.contentWindow.location.pathname.startsWith(__uv$config.prefix)) {
                        var url = __uv$config.decodeUrl(web.current.contentWindow.location.pathname.split(__uv$config.prefix)[1])
                    } else if (web.current.contentWindow.location.pathname.startsWith("/internal/")) {
                        if ((web.current.contentWindow.location.pathname + web.current.contentWindow.location.search).startsWith("/internal/viewsource?url=")) {
                            var url = "view-source:" + (web.current.contentWindow.location.pathname + web.current.contentWindow.location.search).split("/internal/viewsource?url=")[1]
                        } else {
                            var url = "cobalt://" + web.current.contentWindow.location.pathname.split("/internal/")[1]
                        }
                    } else {
                        var url = web.current.contentWindow.location.toString()
                    }

                    let tempHistory = Cobalt.history

                    let checkURLHistory = tempHistory[0] ? tempHistory[0].url == url : false

                    if (checkURLHistory) {
                        var realTitle = web.current.contentWindow.document.head.querySelector("title") ? web.current.contentWindow.document.head.querySelector("title").textContent : ""
                        var favicon = [...web.current.contentWindow.document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")].slice(-1)[0] ? [...web.current.contentWindow.document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")].slice(-1)[0].href ?[...web.current.contentWindow.document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")].slice(-1)[0].href : "" : ""

                        if (url.startsWith("cobalt://") || url.startsWith("view-source:")) {
                            favicon = ""
                        }

                        if (url.startsWith("cobalt://")) {
                            realTitle = url.split("cobalt://")[1]
                            realTitle = realTitle.charAt(0).toUpperCase() + realTitle.slice(1)
                        }

                        if (realTitle !== tempHistory[0].title) {
                            tempHistory[0].title = realTitle
                            setHistory(JSON.stringify(tempHistory))
                        }

                        if (favicon !== tempHistory[0].favicon) {
                            if (favicon) {
                                favicon = await createFavicon(favicon)
                            }

                            tempHistory[0].favicon = favicon
                            setHistory(JSON.stringify(tempHistory))
                        }
                    }
                }, 100)
            }

            setLoaded(true)

        }

        var tempHistory = JSON.parse(history)

        //All 1 duplicate on first page load
        if (tempHistory[0]) {
            if (url !== tempHistory[0].url) {
                addHistory()
            }
        } else {
            addHistory()
        }
        
        var webChange = function () {
            setLoaded(false)

            setTimeout(function () {
                setCanGoBack(web.current.contentWindow.navigation.canGoBack)
                setCanGoForward(web.current.contentWindow.navigation.canGoForward)

                if (web.current.contentWindow.location.pathname.startsWith(__uv$config.prefix)) {
                    var url = __uv$config.decodeUrl(web.current.contentWindow.location.pathname.split(__uv$config.prefix)[1])

                    //Extension test: Darkreader
                    /*
                    setTimeout(function() {
                        var darkreader = web.current.contentWindow.document.createElement("script");darkreader.src = "https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js";web.current.contentWindow.document.head.appendChild(darkreader);darkreader.onload = function() {web.current.contentWindow.DarkReader.enable()};
                    })
                    */

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
                search.current.value = new URL((searchEngine.replace("%s", encodeURIComponent(value))).toString()).toString()
                web.current.contentWindow.location = new URL(__uv$config.prefix + __uv$config.encodeUrl(search.current.value), window.location)
                setCurrentURL(new URL((searchEngine.replace("%s", encodeURIComponent(value))).toString()).toString())
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
            "history": JSON.parse(history),
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
            "sidePanelBodyData": sidePanelBodyData,
            "setSidePanelBody": (id, value) => {
                if (id && value) {
                    setSidePanelBodyData(sidePanelBodyData => ({
                        ...sidePanelBodyData,
                        [id]: value
                    }))
                }
            }
        }
    }

    React.useEffect(() => {
        window.Cobalt.sidePanelBodyData = sidePanelBodyData
    }, [sidePanelBodyData])

    React.useEffect(() => {
        window.Cobalt.history = JSON.parse(history)
    }, [history])

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
        window.Cobalt.url = currentURL
    }, [currentURL])

    React.useEffect(() => {
        window.Cobalt.searchEngine = searchEngine
        window.Cobalt.navigate = searchURL
    }, [searchEngine])

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
                    <input aria-label="Search" ref={search} defaultValue={homeURL} onFocus={searchFocus} onBlur={searchBlur} autoComplete="off" className="search" onKeyUp={searchType} onChange={searchChange} />
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
            <iframe ref={web} onLoad={webLoad} className="web" title="Web"></iframe>
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
                        {{ history: <HistoryComponent />,
                        themes: <ThemesComponent />,
                        cloaking: <CloakingComponent />,
                        customStyle: <CustomStyleComponent />,
                        settings: <SettingsComponent />,
                        }[panelOptions[currentPanelOption].component] || <SidePanelMainComponent />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;