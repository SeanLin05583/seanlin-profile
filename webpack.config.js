var path = require('path');
const webpack = require('webpack');
const moment = require('moment');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const imgPath = process.env.MODE === 'publish' ? '/seanlin-profile' : '/';

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: process.env.MODE === 'publish' ? '/seanlin-profile' : '/',
    path: path.resolve(__dirname, './dist'),
    filename: `bundle.js?[hash:7]${moment().format('YYYY-MM-DD HH:mm')}`,
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      configs: path.resolve(__dirname, 'src/configs/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      intl: path.resolve(__dirname, 'src/intl/'),
      projects: path.resolve(__dirname, 'src/side-projects/'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[name]-[hash:base64:8]-[local]',
              },
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.(svg|png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[hash:7].[ext]',
              publicPath: imgPath,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MODE: JSON.stringify(process.env.MODE === 'publish' ? 'publish' : 'development'),
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './404.html',
    }),
    new CleanWebpackPlugin(['dist']),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/assets/img/favicon.png'),
      prefix: 'assets/img/icons/',
      icons: {
        android: false,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};
