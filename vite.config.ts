import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import { createBareServer } from "@tomphttp/bare-server-node";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
    build: {
        outDir: "build",
    },
    appType: "mpa",
    plugins: [
        {
            name: "bare server",
            configureServer(server) {
                const bare = createBareServer("/bare/");
                server.middlewares.use((req, res, next) => {
                    if (bare.shouldRoute(req)) bare.routeRequest(req, res);
                    else next();
                });

                const upgraders = server.httpServer.listeners(
                    "upgrade"
                ) as Parameters<(typeof server)["httpServer"]["on"]>[1][];

                // remover other listeners
                for (const upgrader of upgraders)
                    server.httpServer.off("upgrade", upgrader);

                server.httpServer.on("upgrade", (req, socket, head) => {
                    if (bare.shouldRoute(req))
                        bare.routeUpgrade(req, socket, head);
                    else
                        for (const upgrader of upgraders)
                            upgrader(req, socket, head);
                });
            },
        },
        react(),
        svgr(),
        pluginRewriteAll(),
        ViteMinifyPlugin(),
    ],
});
