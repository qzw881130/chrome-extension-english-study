const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const browser = process.env.Broswer || 'chrome';
const outputDir = browser === 'chrome' ? 'dist' : 'dist-firefox';

module.exports = {
  entry: {
      popup: './src/popup.jsx',
      background: './src/background/index.jsx',
      content: './src/content/index.jsx'
    },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, outputDir),
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/popup.html',
        filename: 'popup.html',
    }),
    new CopyPlugin({
        patterns: [
        { from: `public/manifest-${browser}.json`, to: 'manifest.json' },
        { from: 'public/images', to: 'images' },
        {
          from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
        }
        ],
    }), 
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]]
            }
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};