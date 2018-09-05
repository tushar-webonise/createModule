'use strict';

var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var rootPath = path.join(__dirname, '../..');
const NODE_ENV = process.env.NODE_ENV || '';

function BuildCompletionNotifyPlugin() {}

BuildCompletionNotifyPlugin.prototype.apply = function(compiler) {
  compiler.hooks.done.tap('MyPlugin', () => {
    console.log(' Build process done!!!');
  });
};

module.exports = {
  mode: 'production',
  entry: {
    index: [path.join(rootPath, './index.js')],
  },
  output: {
    path: path.join(rootPath, '/dist/'),
    filename: '[name].min.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    new OptimizeCssAssetsPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: 4,
    }),
    new BuildCompletionNotifyPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([
      {from: path.join(rootPath, 'src/static/images'), to: 'assets/images'},
    ]),
  ],
  resolve: {
    alias: {
      config$: path.resolve(rootPath, 'config', NODE_ENV),
      constants: path.resolve(rootPath, 'src/js/constants/'),
      utilities: path.resolve(rootPath, 'src/js/utils/'),
      routes: path.resolve(rootPath, 'src/js/routes/'),
      actions: path.resolve(rootPath, 'src/js/actions/'),
      reducers: path.resolve(rootPath, 'src/js/reducers/'),
      components: path.resolve(rootPath, 'src/js/components/'),
      images: path.resolve(rootPath, 'src/static/images'),
      style: path.resolve(rootPath, 'src/sass'),
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.sass'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|pdf|ico)$/,
        use: 'file-loader',
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: {
                safe: true,
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  externals: {
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom',
    'react-router-config': 'commonjs react-router-config',
    'react-router-dom': 'commonjs react-router-dom',
    reactstrap: 'commonjs reactstrap',
  },
};
