const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, 'src/js/index.js'),
    install: path.resolve(__dirname, 'src/js/install.js')
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/install.html'),
      filename: 'install.html',
      chunks: ['install'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['main'],
      inject: true,
    }),
    new WebpackPwaManifest({
      name: 'Your PWA Name',
      short_name: 'PWA',
      description: 'Your PWA Description',
      background_color: '#ffffff',
      theme_color: '#000000',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve(__dirname, 'src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src-sw.js'),
      swDest: 'service-worker.js',
    }),    
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
