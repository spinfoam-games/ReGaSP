const webpack = require('webpack')

const HtmlWebPackPlugin = require('html-webpack-plugin')

const common = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|wot|ttf|otf|eot|mov|mp4)$/,
                use: ['file-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            R: 'ramda',
            _: 'lodash'
        })
    ]
}

module.exports = common