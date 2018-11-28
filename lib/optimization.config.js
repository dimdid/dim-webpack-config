// TODO: chunk or not chunk..
module.exports = {
  optimization: {
    //runtimeChunk: {
      //name: 'runtime'
    //},
    splitChunks: {
      cacheGroups: {
        core: {
          name: 'core',
          chunks: 'initial'
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          enforce: true
        }
      },
      chunks: 'all'
    }
  }
};
