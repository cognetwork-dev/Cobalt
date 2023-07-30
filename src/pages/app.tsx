import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ObfuscateLayout } from "../components/obfuscate";

import "../style/index.css";
import "../navigationBackup";
import "../proxy";

var Home = React.lazy(() => import("./home"));
var InternalHome = React.lazy(() => import("./internal/home"));
var InternalBlank = React.lazy(() => import("./internal/blank"));
var InternalViewSource = React.lazy(() => import("./internal/viewsource"));
var Error = React.lazy(() => import("./error"));

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
    );
}

export default App;
