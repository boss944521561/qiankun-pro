const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
let publicPath = '/';
// if (process.env.PMS_MODE === 'prod') {
//   publicPath = './'
// }

module.exports = {
  mode: process.env.PMS_MODE === 'prod' ? 'production' : 'development',
  entry: './public/index.js',
  devtool: 'source-map',
  devServer: {
    open: true,
    port: '3000',
    clientLogLevel: 'warning',
    disableHostCheck: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath,
    filename: "[contenthash].js",
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, 'src'),
      '~': __dirname.replace('main', 'common'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              // modules: true, // 指定启用css modules, 样式hash隔离
            }
          },
          'postcss-loader', 
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.PMS_MODE': JSON.stringify(process.env.PMS_MODE)
    }),
    new webpack.ProgressPlugin(),
    ...process.env.PMS_MODE === 'prod' ? [new CleanWebpackPlugin()] : [],
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
