import Controller from './Controller';

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

export default ApiController;