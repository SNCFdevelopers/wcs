import path from 'path';
import { fileURLToPath } from 'url';
import { watch } from 'chokidar';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Custom Vite plugin to watch external files (dist folder from Stencil build) and trigger a full reload when changes are detected.
 */
function watchDistFolder() {
    return {
        name: 'watch-stencil-dist',
        configureServer(server) {
            const distPath = path.resolve(__dirname, '../dist');

            const watcher = watch(distPath, {
                ignoreInitial: true,
                awaitWriteFinish: {
                    stabilityThreshold: 100,
                    pollInterval: 50
                }
            });

            watcher.on('change', (filePath) => {
                console.log(`[watch-stencil-dist] Change detected: ${filePath}`);
                server.ws.send({type: 'full-reload', path: '*'});
            });

            watcher.on('add', (filePath) => {
                console.log(`[watch-stencil-dist] File added: ${filePath}`);
                server.ws.send({type: 'full-reload', path: '*'});
            });

            console.log(`[watch-stencil-dist] Watching: ${distPath}`);
        }
    };
}

const config = {
    docs: {
        defaultName: 'Documentation'
    },
    staticDirs: [
        './../dist/wcs',
        './../design-tokens/dist',
        './../design-tokens/tokens',
        './../src/assets/fonts',
        './../stories/assets/images',
    ],
    framework: '@storybook/web-components-vite',
    stories: [
        "../stories/**/**.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    core: {
        disableTelemetry: true
    },
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-docs",
        "@storybook/addon-a11y"
    ],
    previewBody: (body) => `
    <body class="sncf-holding">
        ${body}
    </body>
  `,
    async viteFinal(config) {
        config.plugins = config.plugins || [];
        config.plugins.push(watchDistFolder());
        return config;
    }
}
export default config;
