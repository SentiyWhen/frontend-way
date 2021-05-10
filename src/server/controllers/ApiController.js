import { route, GET, POST } from 'awilix-koa';
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

  @route('/getCompanyInfo')
  @POST()
  async actionCompanyInfo(ctx) {
    const params = {
      report_year: 2020,
      stock_id: 600090,
      report_period_id: 5000,
    }
    console.log(params);
    ctx.body = await this.booksService.getCompanyInfo(params);
  }
}

export default ApiController;