import React from "react";
import { useLocalAppearance } from "../settings.jsx";

function Head({ defaultTitle }) {
    //TEMP fix for tab cloaking
    var localTitle = null
    var [ localAppearance ] = useLocalAppearance();

    document.body.setAttribute("data-appearance", localAppearance);

    React.useEffect(() => {
        var mainTitle = defaultTitle ? defaultTitle : "Cobalt"
        var title = localTitle || mainTitle || "";    
        document.title = title;
    }, [localTitle]);

    React.useEffect(() => {
        document.body.setAttribute("data-appearance", localAppearance);
    }, [localAppearance]);    

    return <></>;
}

export default Head;