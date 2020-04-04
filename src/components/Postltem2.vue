<template>
  <div>
    <!-- 循环结构 大于3张图片的布局 -->
    <div class="imgList">
      <h4>sadasd</h4>
      <div class="images">
        <img src="#" alt v-for="(item,index) in [0,1,2]" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
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