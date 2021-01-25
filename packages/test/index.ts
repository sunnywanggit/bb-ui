import BbTest from './src/test.vue';

(BbTest as any).install = function (Vue: any, options: any = {}) {
  Vue.component(BbTest.name, BbTest);
};

export default BbTest;
