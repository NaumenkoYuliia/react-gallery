var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: './examples/app',

  output: {
    filename: 'app.js',
    chunkFilename: '[id].chunk.js',
    path: './examples/__build__',
    publicPath: '/__build__/'
  },

  module: {

      loaders: [
            { test: /\.(ttf|eot|svg|woff(2)?)(\?\S*)?$/, loader: 'file-loader'},
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.less$/, loader: "style!css!less" }
        ]
      },

      resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
      }

};
