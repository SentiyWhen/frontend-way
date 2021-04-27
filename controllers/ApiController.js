const Controller = require('./Controller')

class ApiController extends Controller {
  constructor() {
    super()
  }
  actionDataList(ctx) {
    ctx.body = {
      data: 'dddd'
    }
  }
}

module.exports = ApiController;