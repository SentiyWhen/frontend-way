// import { get } from 'axios';

class BooksModel {
  getData() {
    // return get('http://localhost/basic/web/index.php?r=books');
    return Promise.resolve([
      {id:1, name:'a'},
      {id:2, name:'b'},
    ]);
  }
}

export default BooksModel;