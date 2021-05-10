import fetch from 'node-fetch';
import config from '../config';

class SafeRequest{
  static fetch(url, arg) {
    return new Promise((resolve, reject) => {
      let result = {
        code: 0,
        message: '请求成功',
        data: []
      }
      let selfFetch = fetch(config.baseUrl + url);
      if (arg && arg.params)  {
        console.log('🍇：',arg);
        selfFetch = fetch(config.baseUrl + url, {
          method: arg.method,
          body: JSON.stringify(arg.params),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
      }
      selfFetch
        .then(res => {
          return res.json();
        })
        .then(json => {
          result.data = json;
          resolve(result);
        })
        .catch(err => {
          result.code = 1;
          result.message = 'node-fetch请求失败， 后端报警';
          reject(result);
        })
    })
  }
}

export default SafeRequest;