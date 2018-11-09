var webpack = require('webpack')
var webpackDevConfig = require('./webpack.dev.config')
var vue = require('./rules/vue')
var merge = require('webpack-merge')
var banner = require('./banner')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge.smart({}, webpackDevConfig, {
  module: {
    rules: [vue]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: false
          },
          comments: false,
          minimize: false
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // this needs to be 'production' for reducing file size
        NODE_ENV: '"production"'
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new webpack.BannerPlugin({
      banner,
      raw: true
    })
  ]
})
