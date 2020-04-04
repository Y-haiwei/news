<template>
  <div>
    <!-- 循环结构 少于3张图片的布局 -->

    <div class="imgText">
      <div class="imgText-left">
        <h4>asdas</h4>
        <p>asdas</p>
      </div>
      <img src="#" alt />
    </div>
  </div>
</template>

<script>
export default {};
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
</style>