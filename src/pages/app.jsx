import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../style/index.css";

function App() {
    return (
        <>
            <div className="nav">
                <input autoComplete="off" className="search" />
            </div>
        </>
    )
}

export default App;