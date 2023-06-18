import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import "../style/index.css";

function App() {
    return (
        <>
            <div className="nav">
                <div className="controls">
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
                        <SearchIcon style={{"height": "0.75em", "width": "0.75em"}} />
                    </div>
                </div>
            </div>
            <div className="panel">
                <div className="sidePanel"></div>
            </div>
        </>
    )
}

export default App;