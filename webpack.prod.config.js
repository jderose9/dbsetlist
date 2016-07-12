var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
  entry: {    
    'app': './src/boot.ts',    
    'vendor': './src/vendor.ts'
  },
  devtool: 'cheap-module-source-map',  
  debug: true,
  output: {
    path: "./dist",
    filename: "bundle.js",
    sourceMapFilename: '[name].map'
  },
  plugins: [
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new CopyWebpackPlugin([
        { from: './assets/data/', to: 'assets/data/' },
        { from: './src/index.html', to: 'index.html' },
        { from: './src/robots.txt', to: 'robots.txt' },
    ]),
    new UglifyJsPlugin({
      beautify: false,
      mangle: true,
    
      comments: false
    })
  ],

  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.scss', '.css', '.html']
  },

  module: {
    preLoaders: [      
      { test: /\.js$/, loader: "source-map-loader", exclude: [ root('node_modules/rxjs') ] }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      
      { test: /\.scss$/, loader: 'raw-loader!sass-loader' },
      
      { test: /\.css$/, loader: 'raw-loader' },
            
      { test: /\.json$/,  loader: 'raw-loader' },
      
      { test: /\.svg$/,  loader: 'file-loader' },
      
      { test: /.*\.(gif|png|jpe?g)$/i, loader: 'url-loader?limit=30000' },
            
      { test: /\.html$/,  loader: 'html-loader', exclude: [ root('src/index.html') ] }                 
    ],
    noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ],
  },

  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [
      [/#/, /(?:)/],
      [/\*/, /(?:)/],
      [/\[?\(?/, /(?:)/]
    ],
    customAttrAssign: [/\)?\]?=/]
  },

  devServer: {
    historyApiFallback: true
  },
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}