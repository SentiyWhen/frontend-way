import listcss from './list.css';
console.log('🌈', listcss);
import $ from 'jquery';
const list = {
  init() {
    $(document).on('click', '#js-btn', function (event) {
      // $('#js-btn').click(function () {
      alert('数据加载成功');
    });
    console.log('list');
  },
};
export default list;
