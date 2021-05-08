import Controller from './Controller';
import BooksModel from "../models/BooksModel";
import { Readable } from 'stream';
import cheerio from 'cheerio';

class BooksController extends Controller {
  constructor() {
    super()
  }
  async actionDataList(ctx) {
    const booksModel = new BooksModel();
    const data = await booksModel.getData();
    // const html = await ctx.render('books/pages/list', {
    //   data: data.data
    // });
    ctx.body = await ctx.render('books/pages/list', {
      data: data.data
    });
    
  }
  async actionCreate(ctx) {
    // ctx.body = await ctx.render('books/pages/create');
    const html = await ctx.render('books/pages/create');
    if (ctx.request.header['x-pjax']) {
      console.log('站内切');
      const $ = cheerio.load(html);
      ctx.status = 200;
      ctx.type = 'html';
      $('.pjaxcontent').each(function () {
        ctx.res.write($(this).html());
      });
      $('.lazyload-js').each(function () {
        ctx.res.write(
          `<script class="lazyload-js" src="${$(this).attr('src')}"></script>`
        );
      });
      ctx.res.end();
    } else {
      console.log('落地页');
      function createSSRStreamPromise() {
        console.log('落地页');
        return new Promise((resolve, reject) => {
          const htmlStream = new Readable();
          htmlStream.push(html);
          htmlStream.push(null);
          ctx.status = 200;
          ctx.type = 'html';
          htmlStream
            .on('error', (err) => {
              reject(err);
            })
            .pipe(ctx.res);
        });
      }
      await createSSRStreamPromise();
    }
  }
}

export default BooksController;