<template>
  <div>
    <NavigateBaer title="我的收藏" />
    <!-- 循环结构 少于3张图片的布局 -->
    <div v-for="(item,index) in stars" :key="index">
      <div class="imgText" v-if="item.cover.length < 3 && item.cover.length > 0">
        <div class="imgText-left">
          <h4>{{ item.title }}</h4>
          <p>{{ item.user.nickname}} {{ item.comments.length}}</p>
        </div>
        <img :src="$axios.default.baseURL + item.cover[0].url" alt />
      </div>

      <!-- 循环结构 大于3张图片的布局 -->
      <!-- <div class="imgList">
        <h4>sadasd</h4>
        <div class="images">
          <img src="#" alt v-for="(item,index) in [0,1,2]" :key="index" />
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import NavigateBaer from "@/components/NavigateBaer";

export default {
  data() {
    return {
      stars: []
    };
  },
  components: {
    NavigateBaer
  },
  mounted() {
    const localUserJson = JSON.parse(localStorage.getItem("userInfo"));
    // 请求我的收藏数据
    this.$axios({
      url: "/user_star",
      // 添加头信息
      headers: {
        Authorization: localUserJson.token
      }
    }).then(res => {
      const { data } = res.data;
      // 我的收藏文章列表
      this.stars = data;
    });
  }
};
</script>

<style scoped lang="less">
.imgText {
  padding: 20 /360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #eee solid;
  .imgText-left {
    h4 {
      // 文字超出隐藏
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: normal;
    }
    p {
      color: #999;
      margin-top: 5px;
    }
  }
  img {
    width: 100 /360 * 100vw;
    height: 75/360 * 100vw;
    display: block;
    object-fit: cover;
    margin-left: 10/360 * 100vw;
    flex-shrink: 0;
  }
  .imgText {
    width: 110/360 * 100vw;
    height: 75 /360 * 100vw;
    display: block;
    object-fit: cover;
    margin-left: 10/360 * 100vw;
  }
}
.imgList {
  padding: 20 /360 * 100vw;
  border-bottom: 1px #eee solid;

  h4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: normal;
  }
  .images {
    margin: 10/360 * 100vw 0;
    display: flex;
    justify-content: space-around;
    img {
      width: 33%;
      height: 75/360 * 100vw;
      object-fit: cover;
    }
  }
  p {
    color: #999;
    margin-top: 5px;
  }
}
</style>