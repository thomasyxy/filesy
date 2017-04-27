const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		index: path.resolve(__dirname, './src/pages/home')
	},
	resolve: {
		extensions: ['.js', 'jsx']
	},
	module: {
		loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, './src'),
        exclude: /node_modules/
      },
      {
        test: /\.scss|.css$/,
        loaders: ['style', 'css', 'sass']
      }
		]
	},
  output: {
    publicPath: '/static',
    path: path.resolve(__dirname, './static'),
    filename: 'js/[name].js'
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.HotModuleReplacementPlugin()
  ]
}
