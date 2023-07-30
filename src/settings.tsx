import useLocalStorage from "./useLocalStorage";

const useLocalFallback = (key: string, fallback: string) => {
    var [local, setLocal] = useLocalStorage(key);
    return [local === null ? fallback : local, setLocal];
};

export var useLocalHistory = () => useLocalFallback("history", "[]");
export var useLocalAppearance = () => useLocalFallback("appearance", "default");
export var useLocalTitle = () => useLocalStorage("title");
export var useLocalIcon = () => useLocalStorage("icon");
export var useLocalCustomStyle = () => useLocalFallback("customStyle", "");
export var useLocalBorderRadius = () =>
    useLocalFallback("borderRadius", "default");
export var useLocalInstalledExtensions = () =>
    useLocalFallback("installedExtensions", "[]");
export var useLocalFavorites = () => useLocalFallback("favorites", "[]");
export var useLocalPanelWidth = () => useLocalFallback("panelWidth", "352px");
