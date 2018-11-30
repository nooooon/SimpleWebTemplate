class Ajax {

  constructor() {
    this.xhr = null;
  }

  getXMLHttpRequest() {
    let httpRequest;

    if (this.xhr !== null) return this.xhr;

    if (window.XMLHttpRequest) {
      httpRequest = new XMLHttpRequest();
    }else if(ActiveXObject){
      // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }catch(e) {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
    this.xhr = !httpRequest ? null : httpRequest;

    return this.xhr;
  }

  /* 
      * API呼び出し
      * @param method {String} - GET/POST
      * @param url {String} - アドレス
      * @param data {FormData} - パラメータ
      * @param success {Function} - 成功時に実行する関数
      * @param error {Function} - 失敗時に実行する関数
  */
  request(method, url, data = null, success = null, error = null) {
    let xhr = this.getXMLHttpRequest();
    if(xhr) {
      if(method.toUpperCase() === 'GET') {
        let params = [];
        if(data) {
          data.forEach((val, index) => {
            params.push(index + '=' + val);
          });
        }

        xhr.open(method, url + '?' + params.join('&'), true);
        xhr.send(null);
      }else {
        xhr.open(method, url, true);
        xhr.send(data);
      }

      xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.prototype.DONE) { //i.e. 4
          if(xhr.status === 200) {
            if(success){
              success({status: xhr.status, result: xhr.responseText});
            }
          }else {
            if(error){
              error({status: xhr.status, result: xhr.responseText});
            }
          }
        }
      }
    }
  }
}

module.exports = Ajax;