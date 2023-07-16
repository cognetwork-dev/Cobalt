import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ObfuscateLayout } from "../components/obfuscate.jsx";

import "../style/index.css";
import "../navigationBackup.jsx";
import "../proxy.jsx";

var Home = React.lazy(() => import("./home.jsx"));
var InternalHome = React.lazy(() => import("./internal/home.jsx"));
var InternalBlank = React.lazy(() => import("./internal/blank.jsx"));
var InternalViewSource = React.lazy(() => import("./internal/viewsource.jsx"));
var Error = React.lazy(() => import("./error.jsx"));

function App() {
    return (
        <>
            <ObfuscateLayout />
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
                  path="/internal/blank"
                  element={
                    <Suspense fallback={<></>}>
                      <InternalBlank />
                    </Suspense>
                  }
                />
                <Route
                  path="/internal/viewsource"
                  element={
                    <Suspense fallback={<></>}>
                      <InternalViewSource />
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