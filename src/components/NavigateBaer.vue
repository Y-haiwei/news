<template>
  <!-- 顶部的导航条 -->
  <div class="navigate-bar">
    <span class="iconfont iconjiantou-copy" @click="$router.back()"></span>
    <strong>{{ title }}</strong>
    <span
      class="iconfont iconicon_shouye"
      @click="$router.push('/')"
      v-if="showHome"
    ></span>
    <!-- v-else指令是要接着v-if后面来使用 -->
    <span v-else class="iconfont iconicon_shouye" style="opacity:0"></span>
  </div>
</template>

<script>
export default {
  // 组件传值，展示的文字和是否展示首页的图标
  // showHome是布尔值，
  props: ["title", "showHome"],
};
</script>

<style scoped lang="less">
.navigate-bar {
  line-height: 48 /360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20/360 * 100vw;
  border-bottom: 1px solid #000;
  .iconicon_shouye {
    font-size: 20px;
  }
}
</style>
