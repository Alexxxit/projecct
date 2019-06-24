const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common.js');
const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'build.js',
    //chunkFilename: 'build.js',
    /*filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',*/
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ],
  },
  optimization: {
   /* runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },*/
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    // clean dist folder
   // new CleanWebpackPlugin({['dist']:  root, ROOT_DIR,  }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.[hash].css',
      allChunks: false,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      sourceMap: true,
      chunksSortMode: 'dependency'
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ZipPlugin({
      // OPTIONAL: defaults to the Webpack output path (above)
      // can be relative (to Webpack output path) or absolute
      path: 'zip',
 
      // OPTIONAL: defaults to the Webpack output filename (above) or,
      // if not present, the basename of the path
      filename: 'build.zip',
 
      // OPTIONAL: defaults to 'zip'
      // the file extension to use instead of 'zip'
      extension: '',
 
      // OPTIONAL: defaults to the empty string
      // the prefix for the files included in the zip file
      pathPrefix: 'path',
 
      // OPTIONAL: defaults to the identity function
      // a function mapping asset paths to new paths
      pathMapper: function(assetPath) {
        // put all pngs in an `images` subdir
        if (assetPath.endsWith('.png'))
          return path.join(path.dirname(assetPath), 'images', path.basename(assetPath));
        return assetPath;
      },
 
      // OPTIONAL: defaults to including everything
      // can be a string, a RegExp, or an array of strings and RegExps
      include: [/\.js$/],
 
      // OPTIONAL: defaults to excluding nothing
      // can be a string, a RegExp, or an array of strings and RegExps
      // if a file matches both include and exclude, exclude takes precedence
      exclude: [/\.png$/, /\.html$/],
 
      // yazl Options
 
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false,
      },
 
      zipOptions: {
        forceZip64Format: false,
      },
    }),
  
    new OfflinePlugin({
      caches: 'all',
      AppCache: false,
      ServiceWorker: {
        minify: false, 
        publicPath: ''
      },
    }),
  ],
};
if (process.env.NODE_ANALYZE) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = merge(common, prodConfig);