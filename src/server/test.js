const fetch = require('node-fetch');

const body = { 
  report_year: 2020,
  stock_id: 600090,
  report_period_id: 5000
 };
 
// fetch('http://listxbrl.sse.com.cn/companyInfo/showmap.do', {
//         method: 'post',
//         body:    JSON.stringify(body),
//         headers: { 
//           'Content-Type': 'application/x-www-form-urlencoded',
//           Origin: 'http://listxbrl.sse.com.cn',
//           Referer:' http://listxbrl.sse.com.cn/companyInfo/toCompanyInfo.do?stock_id=600090.SS&report_year=2020&report_period_id=5000'
//         },
//     })
//     .then(res => console.log(res))
//     .then(json => console.log(json));


    // const body = { a: 1 };
 
// fetch('https://httpbin.org/post', {
//         method: 'post',
//         body:    JSON.stringify(body),
//         headers: { 'Content-Type': 'application/json' },
//     })
//     .then(res => res.json())
//     .then(json => console.log(json));

const axios = require('axios');
// const FormData = require('form-data');
 
// const form = new FormData();
// form.append('report_year', '2020');
// form.append('stock_id', '600090');
// form.append('report_period_id', '5000');
// console.log(form);
axios.get('http://t.weather.itboy.net/api/weather/city/101030100')
.then(res => console.log(res.data))

// axios({
//   method: 'post',
//   url: 'http://listxbrl.sse.com.cn/companyInfo/showmap.do',
//   data: body,
//   headers: { 
//               'Content-Type': 'application/x-www-form-urlencoded',
//               Origin: 'http://listxbrl.sse.com.cn',
//               Referer:' http://listxbrl.sse.com.cn/companyInfo/toCompanyInfo.do?stock_id=600090.SS&report_year=2020&report_period_id=5000'
//             },
// });
