import BbInput from './src/input.vue';

(BbInput as any).install = function (Vue: any, options: any = {}) {
  Vue.component(BbInput.name, BbInput);
};

export default BbInput;
