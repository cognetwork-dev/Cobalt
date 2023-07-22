import React from "react";
import Head from "../../components/head.jsx"
import { useLocalAppearance } from "../../settings.jsx";

function Blank() {
    const [ localAppearance, setLocalAppearance ] = useLocalAppearance();

    window.changeTheme = (theme) => {
        setLocalAppearance(theme)
    }
    return (
        <>
            <Head defaultTitle="Blank" />
        </>
    )
}

export default Blank;