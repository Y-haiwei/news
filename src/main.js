// vue构造函数
import Vue from "vue";
// APP组件（以.vue结尾的文件都是组件）
import App from "./App.vue";
// 路由对象
import router from "./router";
// 引入vant ui组件库
import Vant, { Toast } from "vant";
//导入axios
import axios from "axios";
// 绑定到原型
Vue.prototype.$axios = axios;
// 给axios添加基准路径，添加了之后请求的url就回拼接这个地址
axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com";
// 注册vant插件（vue.use都是用来注册插件）
Vue.use(Vant);
// 上线环境是否提示信息（忽略）
Vue.config.productionTip = false;
// 添加路由的守卫
//  to:代表你即将要访问的页面
// from:代表你即将要离开的页面
// next:必须要调用，next就类似于你的Nodejs的中间件，调用才会加载后面的内容
router.beforeEach((to, from, next) => {
  // 需要验证的页面

  if (to.meta.authorization) {
    // 判断是否是登录状态，时候有token
    // 如果本地的数据是空会返回null，null是没有token属性，会导致js报错
    // 所以可以加个判断，如果本地的数据是空的，等于空的对象
    const userJson = JSON.parse(localStorage.getItem("userInfo")) || {};
    // 有token可以正常访问
    if (userJson.token) {
      next();
    } else {
      next("/login");
    }
  } else {
    // 非个人中心页
    next();
  }
});

// axios的响应拦截器
axios.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    // 如果请求返回的结果是错误的，会进入到错误的出来函数总
    // error是js原生的错误对象  我们可以勇敢error.response可以获取到详细的信息
    // console.log(error.response);
    const { statusCode, message } = error.response.data;
    if (statusCode === 400) {
      // alert(message);
      Toast.fail(message);
    }
    return Promise.reject(error);
  }
);
// 创建一个根实例
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
