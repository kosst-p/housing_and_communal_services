const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const EslintWebpackPlugin = require( 'eslint-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
console.log( __dirname );

module.exports = {
    entry: path.resolve( __dirname, 'src', 'index.js' ),
    output: {
        path: path.resolve( __dirname, 'dist' ),
        clean: true,
        filename: devMode ? '[name].js' : '[name].[contenthash].js'
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
        } ),
        new MiniCssExtractPlugin( {
            filename: devMode ? '[name].css' : '[name].[contenthash].css'
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
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            }
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [
            '.js',
            '.css',
        ],
    },
};