// touch config-overrides.js && yarn add react-app-rewired -D
// "start": "react-app-rewired start"
const path = require('path');

const pwd = (...args) => path.resolve(__dirname, '../', ...args);

module.exports = {
  webpack: function(config, env) {
    config.resolve.plugins = [config.resolve.plugins[0]];
    // const babel = config.module.rules[1];
    // babel.include = [/(bdc-components)/, babel.include];

    config.externals = {
      immer: 'immer',
      vanilly: 'vanilly',
    };

    return config;
  },
  jest: function(config) {
    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      return config;
    };
  },
  paths: function(paths, env) {
    return paths;
  },
};
