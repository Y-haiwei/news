<template>
  <div id="app">
    <router-view />
  </div>
</template>

 <style lang="less">
//  引入图标库
@import url("//at.alicdn.com/t/font_1718339_8xqyv7smxmp.css");
// 引入vant的样式
@import url("../node_modules/vant/lib/index.css");
// 公共的样式
* {
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: inherit;
}

ul,
li,
ol {
  list-style: none;
}

i,
em {
  font-style: normal;
}
</style>
