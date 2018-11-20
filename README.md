#dim-webpack-config
"ready" to use default webpack.config + loaders

> all needed webpack dependencies in same place

Default config test :  
- layout (hbs) : `handlebars-loader`
- style :        `(sass,post,css)-loader`
- svg :          `svg-sprite-loader`
- img :          `(url|file)-loader`
- font :         `file-loader`

with plugins :  
- svg-sprite-loader/plugin
- mini-css-exctract-plugin
- purgecss-webpack-plugin
- highlight-webpack-plugin
- HotModuleReplacementPlugin (mode development running devServer)
- compression-webpack-plugin (mode production)
- HashedModuleIdsPlugin      (mode production)
- webpack-manifest-plugin    ()

## Usage
~~~sh
npm i -D https://github.com/dimdid/dim-webpack-config.git
~~~

~~~js
/* webpack.config.js */
const WebpackConfig = require('dim-webpack-config')
    , {resolve} = require('path')
;

const CONTEXT = __dirname
  ,   ENTRIES = { core: './src/main.js', home: './home/home.js'}
  ,   OUTPUTPATH = `${CONTEXT}/dist`
;

let opts = {
  htmlPluginsOptions: [
    {
      title:'HOME',
      filename: 'home.html',
      chunks: ['core', 'home'],
      template: './home/home.hbs' //from context path
    }
  ],
  usedOfCss: resolve( __dirname, './*/*.hbs'),
};

opts.overwrite = {
  //here as a classic config object, it overwrite existing one
  optimization: {
    //actual sucks
  }
};

module.exports = new WebpackConfig( CONTEXT, ENTRIES, OUTPUTPATH, opts);
~~~

## Options

~~~js
/**
* @constructor
* @param context
* @param entries
* @param outputPath
* @param opts
* @param {glob} opts.usedOfCss Path to sources where css are used ( for purgeCss )
*        default to ${context}/src/*"
* @param {Array|Object} opts.htmlPluginsOptions an object for each template
* @param {object} opts.overwrite Allow to overwrite config as a classic webpackConfig object
* @returns {{output, mode, devtool, plugins, module, context: *, entry: string}} webpack.config
*/

~~~
