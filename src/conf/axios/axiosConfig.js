import axios from "axios/index";
import {
  VueBus,
  REQUEST_ERR,
  RESPONSE_ERR,
  GLOBAL_MSG
} from "../../eventBus/vueBus";
import { baseUrl } from "./conf";
import util from "../../utils/util";

const Axios = axios.create({
  baseURL: baseUrl,
  responseType: "json",
  timeout: 20000, // 超时时长
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});
/**
 * 异常
 */
const handelException = res => {
  const { data } = res;
  if (data.msg) {
    VueBus.$emit(GLOBAL_MSG, data.msg);
  }
};
/**
 * 判断请求是否成功
 */
const isSuccess = res => {
  const { status } = res;
  if (status !== 200) {
    return false;
  }
  const { data } = res;
  if (data) {
    if (data.state) {
      return data.state === 1;
    }
    if (data.code) {
      return data.code === 1 || data.code === 200;
    }
    return true;
  }
  return false;
};
// 请求拦截器
Axios.interceptors.request.use(
  config => {
    const conf = config;
    const token =
      process.env.NODE_ENV === "production"
        ? util.getCookie("token", window.top.document.cookie)
        : // : null;
          "54efc21b-464d-4ae7-93cb-4a44bcb52794";
    if (token) {
      conf.headers.token = token;
    }
    return conf;
  },
  error => {
    console.error("request错误", JSON.stringify(error));
    VueBus.$emit(REQUEST_ERR, error);
    return Promise.reject(error);
  }
);

// 响应拦截器
Axios.interceptors.response.use(
  res => {
    // 对响应数据做些事
    if (!isSuccess(res)) {
      handelException(res);
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes("timeout")) {
        console.log("超时了");
        VueBus.$emit(GLOBAL_MSG, "请求超时，请检查网络是否连接正常");
      } else {
        // 可以展示断网组件
        console.log("断网了");
        VueBus.$emit(GLOBAL_MSG, "请求失败，请检查网络是否已连接");
      }
    } else {
      const code = error.response.status;
      switch (code) {
        default:
          VueBus.$emit(GLOBAL_MSG, `${code}-${error.response.statusText}`);
      }
    }
    console.error("response错误", JSON.stringify(error));
    VueBus.$emit(RESPONSE_ERR, error);
    return Promise.reject(error);
  }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$http", {
      value: Axios
    });
  },
  $http: Axios
};
