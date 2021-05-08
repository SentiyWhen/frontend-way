import safeRequest from '../utils/safeRequest';

class BooksModel {
  getData() {
    return safeRequest.fetch('http://listxbrl.sse.com.cn/report/list.do');
    // return Promise.resolve([
    //   {id:1, name:'a'},
    //   {id:2, name:'b'},
    // ]);
  }
}

export default BooksModel;