const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';
  console.log('env', env)
  return {
    entry: path.join(__dirname, '/src/app.js'),
    output: {
      path: path.join(__dirname, 'public/build'),
      filename: 'bundle.js'
    },
    mode: 'none',
    module: {
      rules: [{
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },{
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },{
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]';
                }
                return '[hash].[ext]';
              },
            }
          }
        ]
      }]
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      hot: true
    },
    resolve: {
      modules: [path.resolve(__dirname, 'app'), 'node_modules']
    },
    optimization: {
      minimizer: [new UglifyJsPlugin()]
    }
  }
};
