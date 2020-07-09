/**
 * 用于传播事件
 */
import Vue from 'vue';

export const VueBus = new Vue();
export const REQUEST_ERR = 'request.error';
export const RESPONSE_ERR = 'response.error';
export const GLOBAL_MSG = 'biz.msg';
