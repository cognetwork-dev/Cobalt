import React from "react";
import { useLocalAppearance, useLocalTitle, useLocalIcon } from "../settings.jsx";

function Head({ defaultTitle }) {
    //TEMP fix for tab cloaking
    var [ localAppearance ] = useLocalAppearance();
    var [ localTitle ] = useLocalTitle();
    var [ localIcon ] = useLocalIcon();

    document.body.setAttribute("data-appearance", localAppearance);

    React.useEffect(() => {
        var mainTitle = defaultTitle ? defaultTitle : "Cobalt"
        var title = localTitle || mainTitle || "";    
        document.title = title;
    }, [localTitle]);

    React.useEffect(() => {
        document.body.setAttribute("appearance", localAppearance);
            
        var icon = localIcon || "/logos/logo.svg"
    
        for (var link of document.querySelectorAll("link[rel*='icon']")) {
          link.href = icon;
        }
      }, [localIcon]);

    React.useEffect(() => {
        document.body.setAttribute("data-appearance", localAppearance);
    }, [localAppearance]);    

    return <></>;
}

export default Head;