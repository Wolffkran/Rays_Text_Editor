const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['main'],
        filename: 'index.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/install.html',
        chunks: ['install'],
        filename: 'install.html',
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'text',
        description: 'A simple text editor',
        background_color: '#ffffff',
        theme_color: '#000000',
        crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('client/dist/icons/icon_96x96.97a96e0fc4eb2a8bec3b8d49d90f1d14.png'),
            sizes: [96],
          },
          {
            src: path.resolve('client/dist/icons/icon_128x128.225c312e650131cfe5a2119fd958867e.png'),
            sizes: [128],
          },
          {
            src: path.resolve('client/dist/icons/icon_192x192.1efd8d2a5218c9516adb7d6ff7907ac1.png'),
            sizes: [192],
          },
          {
            src: path.resolve('client/dist/icons/icon_256x256.873242da1488f53efeaca94de308539e.png'),
            sizes: [256],
          },
          {
            src: path.resolve('client/dist/icons/icon_384x384.15214f65c1219e812d779bfcb384494a.png'),
            sizes: [384],
          },
          {
            src: path.resolve('client/dist/icons/icon_512x512.3ca11a97eb7d90b61fc3db0f3c5dcdb6.png'),
            sizes: [512],
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
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
};
