<template>
  <div>
    <!-- 头部组件 -->
    <NavigateBaer title="我的关注" />

    <!-- 要循环的结构 -->

    <div class="user-item" v-for="(item,index ) in follows" :key="index">
      <img :src="$axios.default.baseURL+ item.head_img" alt />
      <div class="user-info">
        <div>{{ item.nickname }}</div>
        <p>{{ moment (item.create_date) .format("YYYY-MM-DD hh:mm:ss") }}</p>
      </div>
      <span class="cencel" @click="hancleCancel(item.id,index)">取消关注</span>
    </div>
  </div>
</template>

<script>
import NavigateBaer from "@/components/NavigateBaer";
import moment from "moment";
export default {
  data() {
    return {
      // 我的关注列表
      follows: [],
      moment
    };
  },
  components: {
    NavigateBaer
  },
  mounted() {
    // 获取token
    const localUserJson = JSON.parse(localStorage.getItem("userInfo"));
    //保存到data
    this.localUserJson = localUserJson;
    // 请求列表数据
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: localUserJson.token
      }
    }).then(res => {
      // data就是我的关注的用户列表
      const { data } = res.data;
      // 保存到data中的关注列表
      this.follows = data;
    });
  },
  methods: {
    hancleCancel(id, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定取消关注吗？"
        })
        .then(() => {
          this.$axios({
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: this.localUserJson.token
            }
          }).then(res => {
            this.$toast.success("取消关注成功");
            // 刷新页面
            this.follows.splice(index, 1);
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
.user-item {
  padding: 20 /360 * 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px #eee solid;
  img {
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    border-radius: 50%;
    display: block;
    margin-right: 20/360 * 100vw;
    object-fit: cover; //防止图片变形
  }
  .user-info {
    flex: 1;
    margin-right: 20/360 * 100vw;
    p {
      font-size: 14px;
      color: #999;
    }
  }
  .cencel {
    padding: 3px 10px;
    font-size: 12px;
    background: #eee;
    border-radius: 10px;
  }
}
</style>