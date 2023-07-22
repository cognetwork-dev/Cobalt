import React from "react";
import { BareClient } from "@tomphttp/bare-client";
import { bareServerURL } from "../../consts.jsx";
import Head from "../../components/head.jsx"
import { useLocalAppearance } from "../../settings.jsx";

function ViewSource() {
    const [ localAppearance, setLocalAppearance ] = useLocalAppearance();

    window.changeTheme = (theme) => {
        setLocalAppearance(theme)
    }
    
    const bare = React.useMemo(() => new BareClient(bareServerURL), []);
    const [ source, setSource ] = React.useState(""); 

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)

        if (urlParams.has("url")) {
            (async () => {
                try {
                    const url = urlParams.get("url")

                    var site = await bare.fetch(url);

                    var code = await site.text()

                    code = "<ol class='lines'>" + code.split("\n").map(item => "<li class='line'>" + item.replace(new RegExp("<", "g"), "&lt;").replace(new RegExp(">", "g") + "</li>")).join("") + "</ol>"

                    setSource(code)
                } catch {
                    setSource("Error: Website does not exist")
                }
            })()
        } else {
            setSource("Error: Cannot view source code")
        }
    }, [])

    return (
        <>
            <Head defaultTitle="View Source" />
            <div className="sourceCode" dangerouslySetInnerHTML={{__html: source}}></div>
        </>
    )
}

export default ViewSource;