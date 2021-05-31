const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'static/js/[name].chunk.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    public: 'localhost:3000',
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[ext]'
        }
      }
    ]
  }
});
