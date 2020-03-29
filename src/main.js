// vue构造函数
import Vue from "vue";
// APP组件（以.vue结尾的文件都是组件）
import App from "./App.vue";
// 路由对象
import router from "./router";
// 引入vant ui组件库
import Vant from "vant";
//导入axios
import axios from "axios";
// 绑定到原型
Vue.prototype.$axios = axios;
// 给axios添加基准路径，田家湾了之后请求的url就回拼接这个地址
axios.defaults.baseURL = "http://127.0.0.1:3000";
// 注册vant插件（vue.use都是用来注册插件）
Vue.use(Vant);
// 上线环境是否提示信息（忽略）
Vue.config.productionTip = false;

// // from:代表你即将要离开的页面
// // next:必须要调用，next就类似于你的Nodejs的中间件，调用才会加载后面的内容
// router.beforeEach((to, from, next) => {
//   if (to.path === "/personal") {
//     // 判断是否是登录状态，时候有token
//     // 如果本地的数据是空会返回null，null是没有token属性，会导致js报错
//     // 所有可以加个判断，如果本地的数据是空的，等于空的对象
//     const userJson = JSON.parse(localStorage.getItem("userInfo")) || {};

//     // 有token可以正常访问
//     if (userJson.token) {
//       next();
//     } else {
//       next("/login");
//     }
//   } else {
//     // 非个人中心页
//     next();
//   }
// });
// 创建一个根实例
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
