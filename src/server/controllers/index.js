// import router from 'koa-simple-router';
import Router from '@koa/router';
import IndexController from './IndexController';
import ApiController from './ApiController';
import BooksController from './BooksController';

const router = new Router();
const indexController = new IndexController();
const apiController = new ApiController();
const booksController = new BooksController();

function initController (app) {
  router.get('/', indexController.actionIndex);
  router.get('/api/getDataList', apiController.actionDataList);
  router.get('/books/list', booksController.actionDataList);
  router.get('/books/create', booksController.actionCreate);
  app
    .use(router.routes())
    .use(router.allowedMethods());
  // app.use(
  //   router((_) => {
  //     _.get('/', indexController.actionIndex);
  //     _.get('/api/getDataList', apiController.actionDataList);
  //     _.get('/books/list', booksController.actionDataList);
  //     _.get('/books/create', booksController.actionCreate);
  //   })
  // );
}

export default initController;