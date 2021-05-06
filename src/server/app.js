import Koa from 'koa';
import { wrap } from 'co';
import render from 'koa-swig';
import serve from 'koa-static';
import { configure, getLogger } from "log4js";
import errorHandler from './middlewares/errorHandler';
// import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import config from './config';
const { viewsDir, cache, staticDir, port } = config;
import initController from './controllers';

const app = new Koa();

app.context.render = wrap(render({
  root: viewsDir,
  cache,
  varControls: ['[[', ']]'],
}));
configure({
  appenders: { globalError: { type: "file", filename: __dirname + "/logs/error.log" } },
  categories: { default: { appenders: ["globalError"], level: "error" } }
});
const logger = getLogger("globalError");

app.use(serve(staticDir));
// app.use(historyApiFallback({ index: '/', whiteList: ['/api','/books'] }));
errorHandler.error(app,logger);
initController(app);

app.listen(port, () => {
  console.log(`🚀server at http://localhost:${port}`);
})