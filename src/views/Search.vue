<template>
  <div>
    <!-- 红色的头部 -->
    <div class="header">
      <span class="iconfont iconjiantou-copy" @click="$router.back()"></span>
      <!-- 中间的搜索框 -->
      <div class="search-wrapper">
        <span class="iconfont iconSearchIconCopyx"></span>
        <input type="text" placeholder="请输入搜索关键字" v-model="value" @keyup.enter="handleSearch  " />
      </div>
      <span @click="handleSearch">搜索</span>
    </div>

    <!-- 历史记录 -->
    <div class="record">
      <div class="title">
        <strong>历史记录</strong>
        <span class="iconfont iconguanbi" @click="handerClear"></span>
      </div>
      <div class="record-list">
        <span
          class="record-itme"
          v-for="(item,index) in history"
          :key="index"
          @click="handleRecord(item)"
        >{{item}}</span>
      </div>
    </div>

    <!-- 搜索结果的浮层 -->
    <div class="result-layer" v-if="showLayer">
      <div v-for="(item,index) in list " :key="index">
        <Postltem1 :data="item" v-if="item.type === 1 && item.cover.length < 3 " />
        <!-- 大于等于3张图片的 -->
        <Postltem2 :data="item" v-if="item.type === 1 && item.cover.length >= 3" />
        <!-- 视频 -->
        <Postltem3 :data="item" v-if="item.type === 2" />
      </div>
      <div class="empty" v-if="list.length ===0">没有找到你想要的内容</div>
      <!-- <div class="result-item">
        <p>搜搜的结果</p>
      <span class="iconfont iconjiantou_"></span>-->
    </div>
  </div>
</template>

<script>
// 文章列表的组件,只有单张图片的
import Postltem1 from "@/components/Postltem1";
// 大于等于3张图片的组件
import Postltem2 from "@/components/Postltem2";
// 视频的列表组件
import Postltem3 from "@/components/Postltem3";
export default {
  data() {
    return {
      // 输入框的值
      value: "",
      // 历史记录
      history: JSON.parse(localStorage.getItem("history")) || [],
      // 文章列表
      list: []
    };
  },
  components: {
    Postltem1,
    Postltem2,
    Postltem3
  },
  watch: {
    //监听输入框的输入，如果值是空的，清空文章列表
    value() {
      // if(){
      // }
    }
  },
  methods: {
    // 点击搜索或者按钮回车按钮触发的事件
    handleSearch() {
      // 如果关键字是空的，
      // 先获取本地的搜索记录，如果没有就是等于一个空数组
      // this.history = JSON.parse(localStorage.getItem("history")) || [];
      if (this.value == "") return;
      // 把当前的搜索关键字添加到数组中
      this.history.unshift(this.value);
      // 数组去重
      this.history = [new Set(...this.history)];
      // 把搜索关键字添加到本地
      localStorage.getItem("history", JSON.stringify(this.history));
      // 调用接口开始搜索
      getList();
    },
    // 清除本地的搜索记录
    handerClear() {
      (this.history = []), localStorage.removeItem("history");
    },
    // 点击历史记录的选项. item是关键字字符串
    handleRecord(item) {
      this.value = item;
    },
    // 调用接口发起搜索
    getList() {
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.value
        }
      }).then(res => {
        // console.log(res);
        // 显示浮层
        this.showLayer = true;
        // data是文章的列表
        const { data } = res.data;
        this.list = data;
      });
    }
  }
};
</script>

<style scpoed lang="less">
.header {
  padding: 5 /360 * 100vw 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search-wrapper {
    flex: 1;
    margin: 0 20/360 * 100vw;
    border: 1px #ccc solid;
    height: 38/360 * 100vw;
    padding: 0 10/360 * 100vw;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 0;
    border-radius: 50px;
    input {
      border: none;
      background: none;
      margin-left: 5px;
    }
  }
}
.record {
  padding: 0 20/360 * 100vw;
  margin-top: 20/360 * 100vw;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .record-list {
    display: flex;
    flex-wrap: wrap;
    .record-item {
      padding: 5px 10/360 * 100vw;
      border: 1px #ccc solid;
      font-size: 14px;
      margin: 5/360 * 100vw 10/360 * 100vw;
    }
  }
  .result-layer {
    position: absolute;
    top: 58/360 * 100vw;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    overflow-y: auto;
    padding: 20 /360 * 100vw;
    box-sizing: border-box;
    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10 /360 * 100vw;
      border-bottom: 1px #eee solid;
      p {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 10px;
      }
      span {
        color: #999;
      }
    }
  }
  .empty {
    text-align: center;
    color: #999;
    line-height: 2;
  }
}
</style>