// 导入请求类
import Request from "../lib/Request";

// 返回一个实例
const instance = () => new Request();

// 登录
const login = data => instance().request({ url: "/login", method: "POST", data });

// 多个方法组装在API对象里
const API = { login };

// 导出API对象
export default API;
