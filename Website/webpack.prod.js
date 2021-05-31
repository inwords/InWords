const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[contenthash:8].js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          test: /\.(css|scss)$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: true
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['index.html']
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[id].[contenthash:8].css'
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
});
