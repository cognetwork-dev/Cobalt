import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import { ReactComponent as DockSVG } from "../assets/dock-to-left-filled.svg";

function Home() {
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
                    <div className="controlsButton">
                        <ArrowBackIcon fontSize="small" />
                    </div>
                    <div className="controlsButton">
                        <ArrowForwardIcon fontSize="small" />
                    </div>
                    <div className="controlsButton">
                        <RefreshIcon fontSize="small" />
                    </div>
                </div>
                <div className="omnibox">
                    <input autoComplete="off" className="search" />
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
            <iframe src="https://example.com" className="web"></iframe>
            <div className="panel">
                <div className="sidePanel"></div>
            </div>
        </>
    )
}

export default Home;