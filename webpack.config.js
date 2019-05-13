const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
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
    }]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  resolve: {
    modules: [path.resolve(__dirname, "app"), "node_modules"]}
};
