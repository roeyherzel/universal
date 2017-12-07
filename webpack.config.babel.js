import path from 'path';
import webpack from 'webpack';


// TODO: prepare for production

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
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        path.join(PATHS.client, 'client.jsx'),
    ],
    output: {
        path: PATHS.dist,
        filename: 'client.js',
        publicPath: '/build/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules\/)/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};


const SERVER = {
    name: 'server',
    target: 'node',
    entry: path.join(PATHS.server, 'server.jsx'),
    output: {
        path: PATHS.dist,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: '/build/',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules\/)/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
};

export default [CLIENT, SERVER];
