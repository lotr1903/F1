const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const dotenv = require('dotenv');

module.exports = (env, args) => {
	const isDevelopment = args.mode !== 'production';

	return {
		entry: {
			main: ['@babel/polyfill', './src/index.js']
		},
		output: {
			path: path.resolve(__dirname, '../', 'dist'),
			publicPath: '/',
			filename: isDevelopment ? '[name].js' : '[name].[chunkhash].js'
		},
		devServer: {
			publicPath: '/',
			port: 3000,
			historyApiFallback: true,
			open: true
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'eslint-loader',
					options: {
						emitWarning: true,
						failOnError: false,
						failOnWarning: false
					}
				},
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: 'html-loader'
						}
					]
				},
				{
					test: /\.s(a|c)ss$/,
					exclude: ['/.module.(s(a|c)ss)$/', '/'],
					loader: [
						isDevelopment
							? 'style-loader'
							: MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'sass-loader'
						}
					]
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					sideEffects: true,
					use: ['file-loader']
				}
			]
		},
		resolve: {
			extensions: ['.js', '.jsx', '.scss']
		},
		plugins: [
			new HtmlWebPackPlugin({
				template: path.join(__dirname, '../', 'public/index.html'),
				filename: './index.html'
			}),
			new MiniCssExtractPlugin({
				filename: args.mode ? '[name].css' : '[name].[hash].css',
				chunkFilename: args.mode ? '[id].css' : '[id].[hash].css'
			}),
			new ImageminPlugin({
				disable: !isDevelopment, // Disable during development
				pngquant: {
					quality: '95-100'
				},
				test: /\.(jpe?g|png|gif|svg)$/i
			}),
			new OptimizeCssAssetsPlugin()
		]
	};
};
