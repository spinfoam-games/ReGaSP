const path = require('path')

const HtmlWebPackPlugin = require("html-webpack-plugin");

const merge = require('webpack-merge')

const common = require('./common.config')

const development = {
    mode: 'development',

    entry: {
        app: './src/index.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        contentBase: './build'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}

const merged = merge.smart(development, common)
module.exports = merged