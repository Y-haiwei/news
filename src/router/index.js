import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 路由配置
const routes = [
  {
    // 首页
    path: "/",
    component: () => import("@/views/Index")
  },
  {
    path: "/login",
    // 除了首页之外的页面都可以用懒加载,@符号代表的src这个目录
    // .vue这个扩展名可以忽略
    component: () => import("@/views/Login")
  },
  {
    // 注册页
    path: "/register",
    component: () => import("@/views/Register")
  },
  {
    // 个人中心页
    path: "/personal",
    component: () => import("@/views/Personal"),
    meta: {
      // 代表整个页面需要授权
      authorization: true
    }
  },
  {
    // 编辑页
    path: "/editprofile",
    component: () => import("@/views/EditProfile"),
    meta: {
      // 代表整个页面需要授权
      authorization: true
    }
  },
  {
    // 关注页
    path: "/follow",
    component: () => import("@/views/Follow"),
    meta: {
      // 代表整个页面需要授权
      authorization: true
    }
  },
  {
    // 我的跟帖
    path: "/comments",
    component: () => import("@/views/Comments"),
    meta: {
      // 代表整个页面需要授权
      authorization: true
    }
  },
  {
    // 我的收藏
    path: "/star",
    component: () => import("@/views/Star"),
    meta: {
      // 代表整个页面需要授权
      authorization: true
    }
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
