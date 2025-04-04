const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.ts']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html'
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'),
                    to: path.resolve(__dirname, 'dist', 'public'),
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        })
    ],
    devServer: {
        server: 'https',
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        proxy: [{
            context: ['/api'],
            target: 'http://yourflow.ru:8080',
            secure: false,
            changeOrigin: true,
            headers: {
                'Origin': 'https://localhost:8000',
                'X-Forwarded-Host': 'localhost:8000',
                'X-Forwarded-Proto': 'https',
                'Access-Control-Request-Headers': 'content-type,authorization',
                'Access-Control-Allow-Origin': 'https://localhost:8000'
            },
            cookieDomainRewrite: {
                'yourflow.ru': 'localhost'
            },
        }],
        historyApiFallback: true,
        compress: true,
        port: 8000,
        allowedHosts: 'all',
    }
};
