import EventEmitter from 'wolfy87-eventemitter';

// eslint-disable-next-line import/prefer-default-export
export const EventBus = {};

EventBus.bus = new EventEmitter();

/**
 * 點擊獲取ID事件
 * @type {string}
 */
EventBus.POINT_ID = 'POINT_ID';
// 比例尺变化事件
EventBus.SCALE_CHANGE = 'SCALE_CHANGE';
// 图例变化事件
EventBus.LEGEND_CHANGE = 'LEGEND_CHANGE';
