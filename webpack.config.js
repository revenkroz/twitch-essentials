const path = require('path');
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	stats: 'errors-only',
	entry: {
		background: './src/background',
		'popup/popup': './src/popup/popup',
	},
	output: {
		path: path.join(__dirname, 'distribution'),
		filename: '[name].js'
	},
	plugins: [
		new SizePlugin(),
		new CopyWebpackPlugin([
      {
        from: 'content/*',
        context: 'src',
      },
			{
				from: '**/*',
				context: 'src',
				ignore: ['*.js']
			},
			{
				from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js'
			}
		])
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					mangle: false,
					compress: true,
					output: {
						beautify: false,
					}
				}
			})
		]
	}
};
