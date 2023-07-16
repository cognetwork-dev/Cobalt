import React from "react";
import Head from "../components/head.jsx"
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Obfuscate from "../components/obfuscate.jsx"

function Error() {
    return (
        <>
            <Head defaultTitle="Error" />
            <div className="errorIcon">
                <DoNotDisturbIcon style={{"height": "auto", "width": "auto"}} />
            </div>
            <div className="errorTitle"><Obfuscate>404 Error</Obfuscate></div>
            <div className="errorText"><Obfuscate>The requested page </Obfuscate><span className="errorTextUrl"><Obfuscate>{window.location.pathname}</Obfuscate></span><Obfuscate> does not exist.</Obfuscate></div>
        </>
    )
}

export default Error;