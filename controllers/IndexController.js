const Controller = require('./Controller')

class IndexController extends Controller {
  constructor() {
    super()
  }
  async actionIndex(ctx) {
    ctx.body = await ctx.render('index');
  }
}

module.exports = IndexController;