const CompressionPlugin = require('compression-webpack-plugin');
const {HashedModuleIdsPlugin} = require('webpack');
const Cleaner = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function (config) {
  config.plugins.push(
    new Cleaner(config.output.path, {
      root: config.context,
      dry: false,
      beforeEmit: false,
      exclude: []
    }),
    new CompressionPlugin(),
    new HashedModuleIdsPlugin(),
    new ManifestPlugin({seed: {builtAt: (new Date()).toISOString()}})
  );
};
