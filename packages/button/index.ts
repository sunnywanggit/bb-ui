import MyButton from './src/button.vue';

(MyButton as any).install = function (Vue: any, options: any = {}) {
  Vue.component(MyButton.name, MyButton);
};

export default MyButton;
