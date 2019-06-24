const path = require('path');
const webpack = require('webpack');
const ROOT_DIR = path.resolve(__dirname, '../');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
module.exports = {
  entry: [
     './src/main.js'
  ],
  resolve: {
	  alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['*', '.js', '.vue', '.json'],
    
  },
  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          path.resolve(ROOT_DIR, 'node_modules'),
        ],
      },

     /* {
        test: /\.js$/,
        loader: 'babel-loader', РАБОЧИЙ ВАРИАНТ
        exclude: /node_modules/
      } */

      // images
      {
        test: /\.(png|ico|gif|svg|jpe?g)(\?[a-z0-9]+)?$/,
        use: 'url-loader',
      },
      // fonts
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader'] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CUSTOM_HOST: JSON.stringify(process.env.CUSTOM_HOST),
        HTTPS: JSON.stringify(process.env.HTTPS),
        RUBY_BACKEND: JSON.stringify(process.env.RUBY_BACKEND),
      }
    }),
  ]
};