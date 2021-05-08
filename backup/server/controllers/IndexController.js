import Controller from './Controller';

class IndexController extends Controller {
  constructor() {
    super()
  }
  async actionIndex(ctx) {
    // ctx.body = await ctx.render('index', {
    //   message: 'back data'
    // });
    ctx.body = {
      message: 'main'
    }
  }
}

export default IndexController;