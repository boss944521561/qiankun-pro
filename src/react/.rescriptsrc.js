const webpack = require('webpack');
const { name } = require('./package');
const path = require('path');

module.exports = {
  webpack: config => {
    config.output.publicPath = '/';
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';
    config.resolve.alias = {
      '@': path.join(__dirname, 'src'),
      '~': __dirname.replace('react', 'common'),
    };
    config.resolve.alias.src = path.join(__dirname, '..', '@');
    // 删除官方配置ModuleScopePlugin，可以引入react目录外的文件，其它新增plugin请在其操作后执行
    config.resolve.plugins.pop();
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
        'process.env.PMS_MODE': JSON.stringify(process.env.PMS_MODE)
      })
    );
    config.module.rules = [
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
    ];
    return config;
  },
  devServer: _ => {
    const config = _;

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;

    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;

    return config;
  },
};
