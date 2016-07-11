var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
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
    // static assets
    new CopyWebpackPlugin([
        { from: './assets/img/', to: 'assets/img/' },
        { from: './src/index.html', to: 'index.html' },
        { from: './src/robots.txt', to: 'robots.txt' },
    ])
  ],

  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.scss', '.css', '.html', '.svg']
  },

  module: {
    preLoaders: [      
      { test: /\.js$/, loader: "source-map-loader", exclude: [ root('node_modules/rxjs') ] }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      
      { test: /\.scss$/, loader: 'raw-loader!sass-loader' },
      
      { test: /\.css$/, loader: 'raw-loader' },
            
      { test: /\.json$/,  loader: 'json-loader' },           
      
      { test: /.*\.(gif|png|jpe?g|svg)$/i, loader: 'raw-loader' },
            
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ root('src/index.html') ] }                 
    ],
    noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
  },

  devServer: {
    historyApiFallback: true
  }
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}