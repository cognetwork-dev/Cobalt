import React from "react";

function Head({ defaultTitle }) {
    //TEMP fix for tab cloaking
    var localTitle = null

    React.useEffect(() => {
        var mainTitle = defaultTitle ? defaultTitle + " | " + "Cobalt" : "Cobalt"
        var title = localTitle || mainTitle || "";    
        document.title = title;
    }, [localTitle]);

    return <></>;
}

export default Head;