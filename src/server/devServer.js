import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import config from '../../webpack.config.babel';


const router = express.Router();
const compiler = webpack(config);

router.use(morgan('dev'));

router.use(webpackDevMiddleware(compiler, {
  serverSideRender: true,
  publicPath: "/build/",
  stats: 'minimal',
}));

// NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
router.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));

router.use(webpackHotServerMiddleware(compiler));

export default router;

