import React from "react";
import Head from "../components/head";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Obfuscated } from "../components/obfuscate";

function Error() {
    return (
        <>
            <Head defaultTitle="Error" />
            <div className="errorIcon">
                <DoNotDisturbIcon style={{ height: "auto", width: "auto" }} />
            </div>
            <div className="errorTitle">
                <Obfuscated>404 Error</Obfuscated>
            </div>
            <div className="errorText">
                <Obfuscated>The requested page </Obfuscated>
                <span>
                    <Obfuscated>{window.location.pathname}</Obfuscated>
                </span>
                <Obfuscated> does not exist.</Obfuscated>
            </div>
        </>
    );
}

export default Error;
