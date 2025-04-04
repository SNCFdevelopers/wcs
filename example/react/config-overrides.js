const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const path = require('path');

module.exports = function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
    config.resolve.alias = {
        react: path.resolve('./node_modules/react')
    };

    return config;
};
