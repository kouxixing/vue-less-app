import axios from "../conf/axios/axiosConfig";
import { async } from "q";
import Vue from "vue";

let vm = new Vue();
export async function request(args) {
  try {
    return await axios.$http.request(args);
  } catch (e) {
    // 统一处理弹出错误信息
    if (e) {
      console.error(
        `---------------------${args.url}:ajax错误--------------------`
      );
    }
    return Promise.reject(e);
  }
}

// get请求的封装
export function get(url) {
  return async function(obj = {}) {
    const res = await request({
      url,
      method: "get",
      params: obj
    });
    return res;
  };
}

// post请求封装
export function post(url) {
  return async function(obj = {}) {
    const res = await request({
      url,
      method: "post",
      data: obj instanceof FormData ? obj : JSON.stringify(obj)
    });
    if (res && res.data && res.data.message) {
      vm.$Message.info(res.data.message);
    }
    return res;
  };
}

// delete请求封装
export function del(url) {
  return async function(obj = {}) {
    const res = await request({
      url,
      method: "delete",
      params: obj
    });
    if (res && res.data && res.data.message) {
      vm.$Message.success(res.data.message);
    }
    return res;
  };
}
