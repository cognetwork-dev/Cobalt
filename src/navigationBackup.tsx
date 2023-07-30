if (!("navigation" in globalThis)) {
    // @ts-ignore
    globalThis.navigation = {
        canGoBack: true,
        canGoForward: true,
    };
}
