/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const path = require('path');
const express = require('express');

const app = express();
const port = 3000;


if (process.env.NODE_ENV !== 'production') {
    const devServer = require('./src/server/dev').default;
    app.use(devServer);
} else {
    const ClientStatsPath = path.join(__dirname, './build/stats.json');
    const ServerRendererPath = path.join(__dirname, './build/server.bundle.js');
    const ServerRenderer = require(ServerRendererPath).default;
    const Stats = require(ClientStatsPath);

    app.use(ServerRenderer(Stats));
}

app.listen(port, () => {
    console.log(`\nlistening on port ${port}!\n`); // eslint-disable-line no-console
});
