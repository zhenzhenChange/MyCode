import axios from "axios";

// 封装请求类，每个请求调用request()方法都会返回一个新axios实例（axios二次封装）
class Request {
  constructor() {
    this.baseURL = "/api";
    this.timeout = 2000;
  }
  request(config) {
    const instance = axios.create({ baseURL: this.baseURL, timeout: this.timeout });
    instance.interceptors.request.use(
      config => config,
      err => Promise.reject(err)
    );
    instance.interceptors.response.use(
      res => res.data,
      err => Promise.reject(err)
    );
    return instance(config);
  }
}

// 导出请求类
export default Request;
