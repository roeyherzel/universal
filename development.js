const morgan = require('morgan');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('./webpack.development.config.js');

const port = 3000;
const app = express();

app.use(morgan('dev'));

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
	publicPath: "/static/",
	stats: 'minimal',
}));

app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));

app.use(webpackHotServerMiddleware(compiler));

app.listen(port, () => {
    console.log(`listening on port ${port}!`); // eslint-disable-line no-console
});