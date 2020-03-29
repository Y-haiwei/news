<template>
  <div class="container">
    <!-- 关闭按钮 -->
    <div class="back-btn">
      <span class="iconfont iconguanbi"></span>
    </div>
    <!-- logo图标 -->
    <div class="logo">
      <span class="iconfont iconicon_new"></span>
    </div>

    <!-- 表单的组件 @submit是表单按钮提交的事件 -->
    <van-form @submit="onSubmit" class="form">
      <!-- van-field是表单的字段 -->
      <!-- 用户名 -->
      <van-field
        v-model="form.username"
        name="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <!-- 昵称 -->
      <van-field
        v-model="form.nickname"
        name="昵称"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <!-- 密码 -->
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <!-- 如果这个按钮是在van-form组件内部， -->
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <!-- <router-link to="/register">
      <van-button round block class="link-register">登录</van-button>
    </router-link>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nickname: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // // 点击登录按钮事件
    handleClick() {},
    // 提交表单的时候触发的事件
    onSubmit(values) {
      // console.log("submit", this.form);
      // 调用axios发起异步请求，类似$ajax
      this.$axios({
        url: "/register",
        // 跟vue的methods属性毫无关系
        // 声明请求的方法为post请求
        method: "post",
        // 参数
        data: this.form
      }).then(res => {
        // console.log(res);
        const { message } = res.data;
        // 使用vant的弹窗提示
        this.$toast.success(message);
      });
    }
  }
};
</script>

<style lang="less" scoped>
// scoped属性表示样式只针对当前的组件有效 
.container {
  padding: 20 / 360 * 100vw;
  .back-btn span {
    font-size: 27 / 360 * 100vw;
    line-height: 1;
  }
  .logo {
    text-align: center;
    margin-top: 70 / 360 * 100vw;
    margin-bottom: 50 / 360 * 100vw;
    span {
      font-size: 40 / 360 * 100vw;
      color: #cc3300;
    }
  }
}

.form {
  .van-cell {
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 20 /360 * 100vw;
  }

  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #333;
    left: 0;
  }

  .van-button--info {
    margin-top: 60/360 * 100vw;
    background-color: #cc3300;
    border: 1px #cc3300 solid;
  }
}
.link-register {
  margin-top: 20/360 * 100vw;
}
</style>
