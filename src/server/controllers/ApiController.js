import Controller from './Controller';
import BooksModel from "../models/BooksModel";
class ApiController extends Controller {
  constructor() {
    super()
  }
  async actionDataList(ctx) {
    const booksModel = new BooksModel();
    ctx.body = await booksModel.getData();
  }
}

export default ApiController;