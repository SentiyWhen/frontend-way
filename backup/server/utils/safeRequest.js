import axios from "axios";

class SafeRequest {
  static fetch(url) {
    let result = {
      code: 0,
      message: '',
      data: null
    }
    return new Promise((resolve, reject) => {
      axios(url)
      .then((res) => {
        result.data = res.data;
        resolve(result);
      })
      .catch((err) => {
        result.code = 1;
        result.message = err.message;
        // TODO MOCK
        result.data = [
          {id:1, name:'a'},
          {id:2, name:'b'},
        ]
        resolve(result);
      })
    })
  }

}

export default SafeRequest;