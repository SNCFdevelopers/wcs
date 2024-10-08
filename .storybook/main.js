const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;

const config = {
    docs: {
        autodocs: true,
        defaultName: 'Documentation'
    },
    staticDirs: [
        './../dist/wcs',
        './../src/assets/fonts',
        './../stories/assets/images',
    ],
    framework: '@storybook/web-components-webpack5',
    stories: [
        "../stories/**/*.stories.mdx",
        "../stories/**/**.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-docs",
        "@storybook/addon-a11y",
        // Custom addons located in .storybook/addons
        "./addons/versioning/register.js"
    ],
    async webpackFinal(config) {
        config.plugins.push(new WatchExternalFilesPlugin({
            files: [
                'dist/**/*.*'
            ]
        }));
        return config;
    }
}
export default config;
