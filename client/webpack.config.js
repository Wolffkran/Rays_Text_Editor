const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './client/src/js/index.js', // Update the path to your entry file
      install: './client/src/js/install.js', // Update the path to your install file
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'client', 'dist'), // Update the output path
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'client', 'src', 'index.html'), // Update the path to your index.html
        filename: 'index.html',
        chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'client', 'src', 'install.html'), // Update the path to your install.html
        filename: 'install.html',
        chunks: ['install'],
      }),
      new WebpackPwaManifest({
        name: 'Your Text Editor',
        short_name: 'TextEditor',
        description: 'A Progressive Web App for text editing',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: path.resolve(__dirname, 'client', 'src', 'images', 'logo.png'), // Update the path to your icon
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
