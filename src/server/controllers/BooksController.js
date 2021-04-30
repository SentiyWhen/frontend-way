import Controller from './Controller';
import BooksModel from "../models/BooksModel";
class BooksController extends Controller {
  constructor() {
    super()
  }
  async actionDataList(ctx) {
    const booksModel = new BooksModel();
    const data = await booksModel.getData();
    ctx.body = await ctx.render('books/pages/list', {
      data: data.data
    });
  }
  async actionCreate(ctx) {
    ctx.body = await ctx.render('books/pages/create');
  }
}

export default BooksController;