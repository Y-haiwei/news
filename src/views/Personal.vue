<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <!-- 头像 -->
      <div class="avatar">
        <!-- <img src="https://www.baidu.com/img/bd_logo1.png" /> -->
      </div>
      <!-- 姓名 -->
      <div class="profile">
        <div>
          <span class="iconfont iconicon_xingbie_nv"></span>
          火星网友
        </div>
        <p>2020-03-27</p>
      </div>
      <!-- s -->
      <span class="arrow iconfont iconjiantou"></span>
    </div>
    <!-- 列表按钮栏 -->
    <Listbar v-for="(item, index) in rows" :key="index" :label="item.label" :tips="item.tips" />
  </div>
</template>

<script>
// 导入列表按钮栏的组件
import Listbar from "@/components/Listbar";
import NavigateBaer from "@/components/NavigateBaer";

export default {
  data() {
    return {
      //组织一个列表按钮栏的数据
      rows: [
        { label: "我的关注", tips: "关注的用户" },
        { label: "我的跟帖", tips: "跟帖回复" },
        { label: "我的收藏", tips: "文章视频" },
        { label: "设置", tips: "" }
      ]
    };
  },
  //注册组件
  components: {
    Listbar
  },
  // 组件加载完毕后触发，类似window,onload
  mounted() {
    const jsonStr = localStorage.getItem("userInfo");
    // 吧字符串转成对象，userJson就是用户信息对象
    const userJson = JSON.parse(jsonStr);
    this.$axios({
      url: "/user/" + userJson.user.id,
      // 添加头信息
      header: {
        Authorization: userJson.token
      }
    }).then(res => {
      console.log(res);
    });
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
}
</style>
