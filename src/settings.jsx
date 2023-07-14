import useLocalStorage from "./useLocalStorage.jsx";

const useLocalFallback = (key, fallback) => {
  var [local, setLocal] = useLocalStorage(key);
  return [local === null ? fallback : local, setLocal];
};

export var useLocalHistory = () => useLocalFallback("history", "[]");
export var useLocalAppearance = () => useLocalFallback("appearance", "default");