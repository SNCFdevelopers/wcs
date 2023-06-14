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
        "../stories/documentation/**/*.stories.md", // TODO: remove me?
        "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-docs",
        "@storybook/addon-a11y",
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
