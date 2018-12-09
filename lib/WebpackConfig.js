const HtmlPlugin = require('html-webpack-plugin');
const glob = require('glob-all');

const IS_PROD = process.env.NODE_ENV ? process.env.NODE_ENV === 'production' : true;

const defConf = require('./webpack.config.default');
const addProd = require('./addProdConfig');
const addDev = require('./addDevConfig');
const optimizationConfig = require('./optimization.config');

class WebpackConfig {
  /**
   * @constructor
   * @param context
   * @param entries
   * @param {object} opts
   * @param {string} opts.outputPath    Path to output
   *                                     default to `\`${context}/dist/\``
   * @param {glob pattern} opts.usedOfCss       Path to sources where css are used ( for purgeCss )
   *                                     default to ${context}/src/*"
   * @param {Array|Object} opts.htmlPluginsOptions  An object for each template
   * @param {object} opts.overwrite     Allow to overwrite config
   * @param {boolean} opts.optimiz      Use splited chunks runtime, initial and vendor optimization
   * @returns {{output, mode, devtool, plugins, module, context: *, entry: string}} webpack.config
   */
  constructor (context = process.cwd(), entries = './index.js', opts = {}) {
    /*
    TODO: use directories as entries
          directoryName.js as entry, directoryName.h(tml|bs) as template.
          if folder contain /${directoryName}\.h(bs|tml)/ -> htmlPlugin
     */
    let wpConf = { ...defConf,
      ...((() => opts.optimiz ? optimizationConfig : {})()),
      ...{
        context: context,
        mode: IS_PROD ? 'production': 'development',
        entry: entries,
        output: {
          ...defConf.output, ...{path: opts.outputPath || `${context}/dist`}
        },
        plugins: [
        // add htmlPlugins need to be before other use them ( like higlight plugin)
          ...((() => {
            if (!opts.htmlPluginsOptions) return [];

            let plugs = [];
            for (let i = 0, l = opts.htmlPluginsOptions.length; i < l; i++) {
              plugs.push(new HtmlPlugin(opts.htmlPluginsOptions[i]));
            }
            return plugs;
          })()),
          // defaults ones
          ...defConf.plugins
        ]
      }
    };

    // add useOfCss paths to purgeCss
    let purgePlug = wpConf.plugins.find(plug => plug.constructor.name === 'PurgecssPlugin');
    if (purgePlug) {
      let globToPurge = opts.usedOfCss || `${context}/src/*`;
      /**
       * Remove file from output path
       */
      let outFilter = path => !path.match(wpConf.output.path);
      purgePlug.options.paths = glob.sync(globToPurge).filter(outFilter);
    } 
    if (IS_PROD) { addProd(wpConf); } else { addDev(wpConf); }

    if (opts.overwrite) {
      wpConf = {...wpConf, ...opts.overwrite};
    }

    return wpConf;
  }
}

/* TODO: auto find template in dirs
          ... but have to know what|where searching..
          use global template ?, by view ?
function setTemplates(entries){
  if(!entries) {console.error('OOPS, no entries for webpack ?')}

  if (typeof entries === string) {
    entries = [entries];
  }
  //ne fonctionnerai que pour un objet ?
  for (let i=0, keys = Object.keys(entries); i<keys.length; i++) {
    if (typeof entries[keys[i]] === 'string') {
      entries[keys[i]] = [entries[keys[i]]];
    }
    let slashIndex = entries[keys[i]][0].lastIndexOf('/') + 1
      , dotIndex = entries[keys[i]][0].lastIndexOf('.') - slashIndex
    ;
    let filename = entries[keys[i]][0].substr(slashIndex, dotIndex);
    console.log('LOG', slashIndex, dotIndex, '\nso..', filename);
    let rFileName = new RegExp(`(index|${filename})\.h(bs|tml)`);
    console.log(rFileName);
  }
}
*/
/* console.log(new WebpackConfig(__dirname + '/demo', 'test.js', 'dist',{htmlPluginsOptions:[
    {title: 'HOME'}
  ]}  ));//{home:['/home/dim/ducon.js']});
*/

module.exports = WebpackConfig;
