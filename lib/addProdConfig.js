const CompressionPlugin = require('compression-webpack-plugin');
const {HashedModuleIdsPlugin} = require('webpack');
const Cleaner = require('clean-webpack-plugin');

module.exports = function (config) {
  config.plugins.push(
    new Cleaner(config.output.path, {
      root: config.context,
      dry: false,
      beforeEmit: true,
      exclude: []
    }),
    new CompressionPlugin(),
    new HashedModuleIdsPlugin()
  );
};
