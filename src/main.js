import Vue from 'vue';
import App from './App.vue';
// 引入初始化样式
import './assets/css/common.less';
// 引入iview组件库
import './plugin/iview';
import store from './store';
import router from './router';
import '../src/utils/rem';
import 'iview/dist/styles/iview.css';
// 全局引入图标
import './assets/iconfont/iconfont.js';
import './assets/iconfont/iconfont.css';
//  按需引入echarts
import './echart/base';

// 全局添加moment
import moment from 'moment';
import ViewUI from 'view-design';
import './assets/css/iview-theme.less';

Vue.use(ViewUI);
Vue.config.productionTip = false;
Vue.prototype.moment = moment;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
