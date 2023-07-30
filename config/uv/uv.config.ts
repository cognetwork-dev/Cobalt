const config = {
    prefix: `${import.meta.env.VITE_PUBLIC_PATH}/ultraviolet/`,
    bare: import.meta.env.VITE_BARE_APIS.split(",").map(format),
    encodeUrl: Function,
    decodeUrl: Function,
    handler: `${import.meta.env.VITE_PUBLIC_PATH}/uv/uv.handler.js`,
    bundle: `${import.meta.env.VITE_PUBLIC_PATH}/uv/uv.bundle.js`,
    config: `${import.meta.env.VITE_PUBLIC_PATH}/uv/uv.config.js`,
    client: `${import.meta.env.VITE_PUBLIC_PATH}/uv/uv.client.js`,
    sw: `${import.meta.env.VITE_PUBLIC_PATH}/uv/uv.sw.js`,
};

// @ts-ignore
globalThis.uv$config = config;

function format(env: string) {
    const { host, hostname, protocol } = globalThis.location;

    return env
        .replace("%{location.host}", host)
        .replace("%{location.hostname}", hostname)
        .replace("%{location.protocol}", protocol);
}
