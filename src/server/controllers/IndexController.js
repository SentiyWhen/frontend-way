import { route, GET } from 'awilix-koa';

@route('/')
class IndexController {
  constructor() {}
  
  @route('/')
  @GET()
  async actionIndex(ctx) {
    ctx.body = {
      message: 'main'
    }
  }
}

export default IndexController;