# dim-webpack-config
ready" to use default webpack.config + loaders

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
const WebpackConfig = require('dim-webpack-config');

module.exports = new WebpackConfig(process.cwd());
~~~

## Configuration

### new WebpackConfig(context, entries, opts)

Param | Type | Default | Description
:---: | :---: | :-----: | :---------
`context` | `{string}` | `process.cwd` | Root for paths resolution.<br>All relatives path are relative to him.<br>Required.
`entries` | `{string\|array\|object}` | `'./index.js'` | Entries paths <br>Required.
`opts.outputPath` | `{string}` | `${context}/dist\` | Absolute output path
`opts.htmlPluginsOptions` | `{object}` | `none` | Option for html-webpack-plugin.<br>if none is passed, webpack don't use that plugin.
`opts.usedOfCss` | {glob pattern} | `\`${context}/src/*\`` | path where find usage of styles
`opts.overwrite` | `{object}` | `{}` | Overwrite defaults properties.
`opts.optiSplit` | `{boolean}` | TODO | split runtime, core(initial) and vendors

## TODO

- [ ] export plugins specifique config into there files (purge, postcss...)
