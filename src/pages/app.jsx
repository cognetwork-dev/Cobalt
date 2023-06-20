import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../style/index.css";
import "../proxy.jsx";

var Home = React.lazy(() => import("./home.jsx"));

function App() {
    return (
        <>
            <Routes>
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<></>}>
                      <Home />
                    </Suspense>
                  }
                />
            </Routes>
        </>
    )
}

export default App;