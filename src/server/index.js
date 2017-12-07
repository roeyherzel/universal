const path = require('path');
const express = require('express');
const app = express();
const port = 3000;


if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
    const config = require('../../webpack.config.js');


    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
      serverSideRender: true,
      publicPath: "/build/",
      stats: 'minimal',
    }));
    app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
    app.use(webpackHotServerMiddleware(compiler));

    app.use(morgan('dev'));

} else {
    const CLIENT_ASSETS_DIR = path.join(__dirname, '../../build/client');
    const CLIENT_STATS_PATH = path.join(CLIENT_ASSETS_DIR, 'stats.json');
    const SERVER_RENDERER_PATH = path.join(__dirname, '../../build/server.js');
    const serverRenderer = require(SERVER_RENDERER_PATH);
    const stats = require(CLIENT_STATS_PATH);

    app.use(express.static(CLIENT_ASSETS_DIR));
    app.use(serverRenderer(stats));
}

app.listen(port, () => {
    console.log(`listening on port ${port}!`); // eslint-disable-line no-console
});