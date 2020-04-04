<template>
  <div class="container">
    <!-- 引入自定义的头部导航组件 -->
    <NavigateBaer title="个人中心" :showHome="true" />
    <!-- 头部 -->
    <router-link to="/editprofile">
      <div class="header">
        <!-- 头像 -->
        <div class="avatar">
          <img :src="$axios.defaults.baseURL + userInfo.head_img" alt="头像" />
        </div>
        <!-- 姓名 -->
        <div class="profile">
          <div>
            <span class="iconfont iconicon_xingbie_nv" v-if="userInfo.gender === 0"></span>
            <span class="iconfont iconicon-xingbie-nan" v-if="userInfo.gender === 1"></span>
            {{ userInfo.nickname }}
          </div>
          <p>{{ moment(userInfo.create_date).format("YYYY-MM-DD") }}</p>
        </div>
        <!-- s -->
        <span class="arrow iconfont iconjiantou"></span>
      </div>
      <!-- 列表按钮栏 -->
      <Listbar
        v-for="(item, index) in rows"
        :key="index"
        :label="item.label"
        :tips="item.tips"
        :path="item.path"
      />
      <!-- 点击退出按钮时候触发 -->
      <Listbar @click.native="handleClick" label="退出" />
    </router-link>
  </div>
</template>

<script>
// 导入列表按钮栏的组件
import Listbar from "@/components/Listbar";
// 引入导航组件
import NavigateBaer from "@/components/NavigateBaer";
// 引入第三方的日期处理的工具库
import moment from "moment";

export default {
  data() {
    return {
      //组织一个列表按钮栏的数据
      rows: [
        { label: "我的关注", tips: "关注的用户", path: "/follow" },
        { label: "我的跟帖", tips: "跟帖回复", path: "/comments" },
        { label: "我的收藏", tips: "文章视频", path: "/star" }
      ],
      // 个人的详细信息
      userInfo: {},
      // moment是日期处理的工具库，为了在模板中科院使用，所有需要绑定
      moment
    };
  },
  //注册组件
  components: {
    Listbar,
    NavigateBaer
  },
  // 组件加载完毕后触发，类似window,onload
  mounted() {
    const jsonStr = localStorage.getItem("userInfo");
    // 把字符串转成对象，userJson就是用户信息对象
    const userJson = JSON.parse(jsonStr);
    /* 发起异步的请求 */
    this.$axios({
      url: "/user/" + userJson.user.id,
      // 添加头信息
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      //  解构出用户的数据
      const { data } = res.data;
      this.userInfo = data;
    });
  },
  methods: {
    handleClick() {
      // 询问用户是否确定退出
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定退出吗"
        })
        .then(() => {
          //点击确定时候触发的函数
          // 清楚本地的存储的用户数据
          localStorage.removeItem("userInfo");
          // 跳转到登录页
          this.$router.replace("/login");
        })
        .catch(() => {
          // 点击取消
        });
    }
  }
};
</script>
<style scoped lang="less">
.header {
  padding: 20 /360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #eeeeee solid;
  .avatar {
    display: block;
    width: 70 /360 * 100vw;
    height: 70/360 * 100vw;
    border-radius: 50%;
    object-fit: contain;
  }
}
.profile {
  flex: 1;
  padding-left: 20/360 * 100vw;
  line-height: 1.5;
  p {
    color: #999;
  }
  .iconicon-xingbie-nan {
    color: blue;
  }
  .iconicon_xingbie_nv {
    color: pink;
  }
}
</style>
