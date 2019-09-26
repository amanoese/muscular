const webpack = require('webpack');
const path = require('path');
const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,
  target : 'node',
  entry: {
    'echo-sd-slim'   : './src/echo-sd-slim.js',
    'muscular-pose'  : './src/muscular-pose.js',
    'muscular-shout' : './src/muscular-shout.js',
    'muscular'       : './src/muscular.js',
    'pose'           : './src/pose.js',
    'shout'          : './src/shout.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module : {
    rules: [
      { test: /\.js$/, use: 'shebang-loader' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      test : /muscular.*js$/,
      raw : true
    })
  ]
};
