const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackConfig = require('./webpack.config')

module.exports = (env, argv) => {
    const watchMode = argv.liveReload || false
    const modeEnv = argv.mode || 'development'
    const config = webpackConfig(modeEnv)

    const optimizations = {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
        minimizer: [],
    }

    return {
        devServer: {
            compress: true,
            port: 4200,
            client: {
                progress: true,
            },
            static: {
                directory: path.join(__dirname, "dist"),
                watch: {
                    watchContentBase: true
                }
            },
            hot: true,
            open: true,
            historyApiFallback: true,
        },
        resolve: config.resolve,
        module: {
            rules: [
                config.modules.js,
                config.modules.stylus,
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './Html/browser.html',
            }),
            new WebpackNotifierPlugin({ alwaysNotify: false }),
        ],
        entry: {
            main: './client.tsx',
        },
        output: {
            filename: watchMode ? '[name].[hash].js' : '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        performance: {
            hints: false,
        },
        optimization: optimizations,
    }
}