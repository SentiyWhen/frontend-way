import { addAliases } from 'module-alias';
addAliases({
  '@root': __dirname,
  '@services': __dirname + '/services',
  '@controllers': __dirname + '/controllers',
});

import Koa from 'koa';
import { wrap } from 'co';
import render from 'koa-swig';
import serve from 'koa-static';
import { configure, getLogger } from "log4js";
import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import errorHandler from './middlewares/errorHandler';
// import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import config from './config';
const { viewsDir, cache, staticDir, port } = config;

configure({
  appenders: { globalError: { type: "file", filename: __dirname + "/logs/error.log" } },
  categories: { default: { appenders: ["globalError"], level: "error" } }
});
const logger = getLogger("globalError");

const app = new Koa();

//核心最重要的第一步 创建容器
const container = createContainer();
//把全部services交给容器管理
container.loadModules([`${__dirname}/services/*.js`], { 
  formatName: 'camelCase',
  resolverOptions: Lifetime.SCOPED
})
//终极注入
app.use(scopePerRequest(container));

app.use(serve(staticDir));

app.context.render = wrap(render({
  root: viewsDir,
  autoescape: true,
  cache,
  ext: 'html',
  varControls: ['[[', ']]'],
  writeBody: false,
}));

// app.use(historyApiFallback({ index: '/', whiteList: ['/api','/books'] }));
errorHandler.error(app,logger);

app.use(loadControllers(`${__dirname}/controllers/*.js`));

app.listen(port, () => {
  console.log(`🚀server at http://localhost:${port}`);
})