import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueCompositionAPI from '@vue/composition-api';

// import VueCompositionApi from '@vue/composition'
import ComponentList from './entry';
// 引入默认样式
import '@/assets/css/index.css';

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);
Vue.use(ElementUI, { size: 'mini' });
Vue.use(ComponentList);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
