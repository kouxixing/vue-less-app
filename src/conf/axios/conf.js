// 域名
export const baseUrl = "http://192.168.4.167/api/fhpl";
// 业务接口服务路径
export const bizServiceUrl =
  process.env.NODE_ENV === "production" ? "/floodControl" : "";
