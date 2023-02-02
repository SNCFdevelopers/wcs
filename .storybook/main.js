const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;

module.exports = {
    "stories": [
        "../stories/**/*.stories.mdx",
        "../stories/documentation/**/*.stories.md",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-docs"
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
