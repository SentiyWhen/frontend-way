import safeRequest from '../utils/safeRequest';

class BooksModel {
  getData() {
    return safeRequest.fetch('http://xxxxx');
    // return Promise.resolve([
    //   {id:1, name:'a'},
    //   {id:2, name:'b'},
    // ]);
  }
}

export default BooksModel;