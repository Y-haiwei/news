<template>
  <div class="video">
    <h4>{{data.title}}</h4>
    <div class="cover">
      <img :src="$axios.default.baseURL+data.cover[0].url" />
      <div class="cover-layer">
        <span class="iconfont iconicon_shipin"></span>
      </div>
    </div>
    <p>{{data.user.nicknam}} {{data.comment_length}}跟帖</p>
  </div>
</template>

<script>
export default {
  // 传入文章的数据
  props: ["data"]
};
</script>

<style scoped lang="less">
.video {
  padding: 20 /360 * 100vw;
  border-bottom: 1px #eee solid;
  h4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: normal;
  }
  .cover {
    width: 100%;
    height: 170/360 * 100vw;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      .cover-layer {
        width: 55/360 * 100vw;
        height: 55/360 * 100vw;
        background: rbga(0, 0, 0, 0.5);
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-27/360 * 100vw) translateY(-27/360 * 100vw);
      }
    }
  }
}
</style>