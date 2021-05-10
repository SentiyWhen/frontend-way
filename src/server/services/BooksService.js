import request from '../utils/SafeRequest';

class BooksModel {
  getData() {
    return request.fetch('report/list.do');
  }
  getCompanyInfo(params) {
    return request.fetch('companyInfo/showmap.do', {
      method: 'post',
      params,
    });
  }
}

export default BooksModel;