<template>
  <div>
    <!-- 头部组件 -->
    <NavigateBaer title="我的跟帖" />
    <!-- 要循环的结构 -->
    <div class="comment-item" v-for="(item,index) in comments" :key="index">
      <div class="date">{{ moment(item.create_date).format("YYYY-MM-DD hh:mm") }}</div>
      <div class="parent" v-if="item.parent">
        <div class="parent-user">回复：{{ item.parent.user.nickname }}</div>
        <div class="parent-content">{{ item.parent.content }}</div>
      </div>

      <!-- 自己发布的内容 -->
      <div class="comment-content">{{item.content}}}</div>
      <router-link to="#" class="link-post">
        <div>原文：{{ item.post.title }}</div>
        <span class="iconfont iconjiantou"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavigateBaer from "@/components/NavigateBaer";
import moment from "moment";
export default {
  data() {
    return {
      comments: [],
      moment
    };
  },
  components: {
    NavigateBaer
  },
  mounted() {
    // 本地的数据
    const localUserJson = JSON.parse(localStorage.getItem("userInfo"));
    // 请求评论列表
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: localUserJson.token
      }
    }).then(res => {
      const { data } = res.data;
      // 把评论列表保存到
      this.comments = data;
    });
  }
};
</script>

<style scoped lang="less">
.comment-item {
  padding: 20 /360 * 100vw;
  border-bottom: 1px #eee solid;

  .date {
    color: #999;
    margin-bottom: 15 /360 * 100vw;
  }

  .parent {
    padding: 10 /360 * 100vw;
    background: #eee;
  }

  .comment-content {
    margin: 15 /360 * 100vw 0;
  }

  .link-post {
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    color: #999;
    div {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    }

    span {
      margin-left: 5px;
    }
  }
}
</style>