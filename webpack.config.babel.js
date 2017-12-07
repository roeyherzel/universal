import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';


// TODO: prepare for production
const env = process.env.NODE_ENV || 'development';


const PATHS = {
    dist: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    client: path.resolve(__dirname, 'src/client'),
    server: path.resolve(__dirname, 'src/server'),
};

const CLIENT = {
    name: 'client',
    target: 'web',
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        PATHS.client,
    ],
    output: {
        filename: 'client.bundle.js',
        path: PATHS.dist,
        publicPath: '/build/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin([PATHS.dist]),
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            sourceMap: true,
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
};


const SERVER = {
    name: 'server',
    target: 'node',
    entry: PATHS.server,
    output: {
        filename: 'server.bundle.js',
        path: PATHS.dist,
        publicPath: '/build/',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            sourceMap: true,
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
};

export default [CLIENT, SERVER];
