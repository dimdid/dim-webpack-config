const {resolve} = require('path');
const glob = require('glob-all');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const HighlightPlugin = require('highlight-webpack-plugin');
const SvgSpritePlugin = require('svg-sprite-loader/plugin');

const IS_PROD = process.env.NODE_ENV ? process.env.NODE_ENV === 'production' : true;
const CONTEXT = __dirname;
const USED_CONTENT = [ resolve(CONTEXT, './src/*') ]; // purgecss used

const styleLoaders = [
  IS_PROD ? ExtractCssPlugin.loader : 'style-loader',
  {
    loader: 'css-loader'
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [
        require('autoprefixer')({
          browsers: ['last 2 versions']
        })
      ]
    }
  },
  'sass-loader'
];

// noinspection WebpackConfigHighlighting
let wpConfig = {
  output: {
    filename: IS_PROD ? '[name].[contenthash].js' : '[name].js'
  },
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_PROD ? false : 'source-map',
  plugins: [
    new SvgSpritePlugin(),
    new ExtractCssPlugin({
      filename: IS_PROD ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: IS_PROD ? '[contenthash].css' : '[id].css'
    }),

    new PurgeCSSPlugin({
      paths: glob.sync(USED_CONTENT)
    }),
    new HighlightPlugin()
    /*
    new HtmlPlugin({
      title: 'Home',
      template: './src/home/home.html',
      excludeChunks: ['admin']
    }),
     */
  ],
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 8192,
              name: !IS_PROD ? '[name].[ext]' : '[name].[hash].[ext]'
            }
          }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: styleLoaders
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  }
};

module.exports = wpConfig;
