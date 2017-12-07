const path = require('path');
const express = require('express');
const app = express();
const port = 3000;


if (process.env.NODE_ENV !== 'production') {
    const devServer = require('./devServer').default;
    app.use(devServer);
} else {
    const ClientStatsPath = path.join(__dirname, './build/stats.json');
    const ServerRendererPath = path.join(__dirname, './build/server.js');
    const ServerRenderer = require(ServerRendererPath).default;
    const Stats = require(ClientStatsPath);

    app.use(ServerRenderer(Stats));
}

app.listen(port, () => {
    console.log(`listening on port ${port}!`); // eslint-disable-line no-console
});