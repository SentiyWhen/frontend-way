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

  app
    .use(router.routes())
    .use(router.allowedMethods());

}

export default initController;