'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const sass = require('sass');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true,
    watchFiles: [
      'src/**/*',
      'src/index.html',
      'src/contact.html',
      'src/news.html',
      'src/resources.html',
    ], // Watch all files in the src directory, index.html, and contact.html
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new HtmlWebpackPlugin({ template: './src/contact.html', filename: 'contact.html' }),
    new HtmlWebpackPlugin({ template: './src/news.html', filename: 'news.html' }),
    new HtmlWebpackPlugin({ template: './src/resources.html', filename: 'resources.html' }),
    new miniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }],
    }),
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: {
                logger: {
                  warn: (message, options) => {
                    if (!message.includes('@import')) {
                      console.warn(message, options);
                    }
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
              publicPath: 'assets/images',
            },
          },
        ],
      },
    ],
  },
};
