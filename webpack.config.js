var path = require('path')
var webpack = require('webpack')
var cssnext = require('postcss-cssnext')

module.exports = {
  devtool: 'eval',
  entry: [
    "whatwg-fetch",
    "webpack-dev-server/client?http://localhost:3000",
    "./app/index"
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]!postcss',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        API_HOST: JSON.stringify('http://localhost:4000'),
        SOCKET_HOST: JSON.stringify('ws://localhost:4000/socket')
      }
    })
  ],
  postcss: function () {
    return [cssnext]
  },
  resolve: {
    extensions: [ '', '.js' ]
  },
  resolve: {
    extensions: [ '', '.js' ],
    fallback: path.join(__dirname, "node_modules")
  },
  resolveLoader: {
    fallback: path.join(__dirname, "node_modules")
  },
}
