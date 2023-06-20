navigator.serviceWorker.register(new URL("/uv-sw.js", window.location), {
    scope: __uv$config.prefix,
});