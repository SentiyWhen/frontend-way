const Koa = require('koa');
const co = require('co');
const render = require('koa-swig')
const serve = require('koa-static');
const errorHandler = require('./middlewares/errorHandler')
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const config = require('./config');
const initController = require('./controllers')

const app = new Koa();

app.context.render = co.wrap(render({
  root: config.viewsDir,
  cache: config.cache
}));

app.use(serve(config.staticDir));
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
errorHandler.error(app);
initController(app);

app.listen(config.port, () => {
  console.log(`🚀启动 at http://localhost:${config.port}`);
})