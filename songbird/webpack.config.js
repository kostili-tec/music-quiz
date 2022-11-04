const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
// const { ESLint } = require('eslint');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: {      
      app: {
        name: 'google-chrome'
      }, 
    },
    hot: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
      directory: path.join(__dirname, './src')
    },
  }
};

const esLintPlugin = (isDev) => isDev ? [] : [ new ESLintPlugin({ extensions: ['js'] }) ];

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: {
    index: path.resolve(__dirname, './src'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [   
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    // ...esLintPlugin(development),
    // new ESLintPlugin({ extensions: ['js'] }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: './public', to: './copies'}
      ]
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  optimization: { 
    minimize: false,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: ['.js'],
  },
  ...devServer(development),
});