// @ts-ignore
navigator.serviceWorker.register(new URL("/uv-sw.js", globalThis.location), {
    scope: __uv$config.prefix,
});
