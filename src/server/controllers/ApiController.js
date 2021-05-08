import { route, GET } from 'awilix-koa';
@route('/api')

class ApiController{
  constructor({booksService}) {
    this.booksService = booksService;
  }

  @route('/getList')
  @GET()
  async actionDataList(ctx) {
    ctx.body = await this.booksService.getData();
  }
}

export default ApiController;