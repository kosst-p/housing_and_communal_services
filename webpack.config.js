const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require( 'eslint-webpack-plugin' );

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map': undefined;

module.exports = {
    entry: path.resolve( __dirname, 'src', 'index.js' ),
    output: {
        path: path.resolve( __dirname, 'dist' ),
        clean: true,
        filename: 'index.[contenthash].js'
    },
    mode,
    target,
    devtool,
    plugins: [
        new HtmlWebpackPlugin( {
            template: path.resolve( __dirname, 'src', 'index.html' ),
        } ),
        new EslintWebpackPlugin( {
            overrideConfigFile: path.resolve( __dirname, '.eslintrc.js' ),
        } )
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                ]
            }
        ],
    },
}