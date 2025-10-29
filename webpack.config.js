const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const webpack = require("webpack")

module.exports = (env, argv) => {
	const isProd = argv.mode === "production"

	console.log("🔧 Modo atual:", argv.mode)

	return {
		target: "web",
		mode: isProd ? "production" : "development",

		entry: path.resolve(__dirname, "src", "main.js"),
		output: {
			filename: "main.js",
			path: path.resolve(__dirname, "dist"),
			publicPath: isProd ? "./" : "/",
		},

		devServer: {
			static: path.resolve(__dirname, "dist"),
			watchFiles: ["src/**/*", "index.html"],
			port: 3005,
			open: true,
			liveReload: true,
			hot: false,

			headers: {
				// "Access-Control-Allow-Origin": "*",
			},
			compress: true,
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "src", "index.html"),
				// favicon: path.resolve("src", "assets", "scissors.svg"),
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, "src", "assets"),
						to: path.resolve(__dirname, "dist", "assets"),
					},
					{
						from: path.resolve(__dirname, "server.json"),
						to: path.resolve(__dirname, "dist"),
					},
				],
			}),
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify(
					isProd ? "production" : "development"
				),
			}),
		],

		module: {
			rules: [
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				},
			],
		},
		watchOptions: {
			poll: 1000, // checa mudanças a cada 1 segundo
			ignored: /node_modules/,
		},
	}
}
