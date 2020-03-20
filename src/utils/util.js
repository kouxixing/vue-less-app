// 处理get请求，传入参数对象拼接
const formatUrl = (url, query) => {
  let string = "?";
  Object.keys(query).forEach(key => {
    string += `${key}=${query[key]}&`;
  });
  return url + string;
};

function checkLocalStorage() {
  // 确认是否支持Localstorage
  return true;
}

const getCookie = (name, target = document.cookie) => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = target.match(reg);
  if (arr) {
    return unescape(arr[2]);
  }
  return null;
};
// 增删改查本地存储
const local = {
  set(key, value) {
    if (checkLocalStorage()) {
      window.localStorage.setItem(key, value);
    } else {
      const Days = 30;
      const exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = `${key}=${escape(value)};expires=${exp.toGMTString()}`;
    }
  },
  get(key) {
    if (checkLocalStorage()) {
      return window.localStorage.getItem(key)
        ? window.localStorage.getItem(key)
        : null;
    }
    return getCookie(key);
  },
  clear(key) {
    if (checkLocalStorage()) {
      window.localStorage.removeItem(key);
    } else {
      const exp = new Date();
      exp.setTime(exp.getTime() - 1);
      const cval = getCookie(key);
      if (cval != null)
        document.cookie = `${key}=${cval};expires=${exp.toGMTString()}`;
    }
  }
};

export default {
  formatUrl,
  local,
  getCookie
};
