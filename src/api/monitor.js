/** 测试接口
 *  kxx
 */
import { get, post, del } from './helpers';
const baseUrl = 'http://192.168.1.152:8081';
export default {
  async test(params) {
    const res = await get(`${baseUrl}/test`)(params);
    return res.data;
  }
};
