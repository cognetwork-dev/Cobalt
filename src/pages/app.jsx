import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../style/index.css";
import "../proxy.jsx";

var Home = React.lazy(() => import("./home.jsx"));
var InternalHome = React.lazy(() => import("./internal/home.jsx"));
var Error = React.lazy(() => import("./error.jsx"));

function App() {
    return (
        <>
            <Routes>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<></>}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="/internal/home"
                  element={
                    <Suspense fallback={<></>}>
                      <InternalHome />
                    </Suspense>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<></>}>
                      <Error />
                    </Suspense>
                  }
                />
            </Routes>
        </>
    )
}

export default App;