<template>
  <div>
    <!-- 头部导航组件 -->
    <NavigateBaer title="编辑资料" />
    <!-- 头像 -->
    <div class="acatar">
      <img :src="$axios.defaults.baseURL + userInfo.head_img" />
      <!-- 添加组件 -->
      <van-uploader class="uploader" :after-read="afterRead"></van-uploader>
    </div>
    <!-- 按钮列表 -->

    <Listbar label="昵称" :tips="userInfo.nickname" @click.native="show =true" />
    <!-- 编辑弹窗的代码 -->
    <!-- v-model :valu和input/change两种数据的集合
    这里的v-model作用只要控制弹窗的显示和隐藏-->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="handleChangeNickname">
      <van-field v-model="nickname" placeholder="请输入用户名"></van-field>
    </van-dialog>

    <!-- 编辑密码的弹窗 -->
    <Listbar label="密码" tips="******" @click.native="showPassword =true" />
    <van-dialog
      v-model="showPassword"
      title="修改密码"
      show-cancel-button
      @confirm="handleChangePassword"
    >
      <van-field v-model="password" placeholder="请输入密码" type="password"></van-field>
    </van-dialog>
    <!-- 编辑性别 -->
    <Listbar label="性别" :tips="['女', '男'][userInfo.gender]" @click.native="showGander = true" />
    <van-action-sheet
      v-model="showGander"
      close-on-click-action
      :actions="actions"
      @select="onSelect"
    ></van-action-sheet>
  </div>
</template>

<script>
import NavigateBaer from "@/components/NavigateBaer";
import Listbar from "@/components/Listbar";
export default {
  data() {
    return {
      // 用户详情
      userInfo: {},
      // 本地数据
      userJson: {},
      // 是否显示编辑昵称的弹窗
      show: false,
      // 是否显示编辑密码的弹窗
      showPassword: false,
      // 是否显示编辑性别的弹窗
      showGander: false,
      nickname: "",
      password: "",
      // 性别弹窗的选项
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ]
    };
  },
  components: {
    NavigateBaer,
    Listbar
  },
  mounted() {
    //   只要能进入到这个页面就表示肯定已经登录了
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    // 保存到data，就可以在methods的方法中调用了
    this.userJson = userJson;
    //   请求用户详情
    this.$axios({
      url: "/user/" + userJson.user.id,
      // 添加头信息
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      const { data } = res.data;
      this.userInfo = data;
      this.nickname = data.nickname;
    });
  },
  methods: {
    afterRead(file) {
      //  创建一个表单对象，商场图片资源必须是表单类型，不能用JSON
      const formData = new FormData();
      formData.append("file", file.file);

      this.$axios({
        url: "/upload",
        method: "post",
        headers: {
          Authorization: this.userJson.token
        },
        data: formData
      }).then(res => {
        const { url } = res.data.data;
        this.userInfo.head_img = url;
        //   图片上传成功之后调用编辑用户信息的方法
        this.handleEdit({
          head_img: url
        });
      });
    },
    // 编辑用户信息的函数
    handleEdit(data) {
      this.$axios({
        url: "/user_update/" + this.userInfo.id,
        method: "post",
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        this.$toast.success("修改成功");
      });
    },
    // 修改昵称的事件
    handleChangeNickname() {
      this.handleEdit({ nickname: this.nickname });
      this.userInfo.nickname = this.nickname;
    },
    handleChangePassword() {
      this.handleEdit({ password: this.password });
    },
    // 选中性别的时候触发的时候，item是选中的当选项
    onSelect(item) {
      // this.show = false;
      // Toast(item.name);
      this.handleEdit({ gender: this.value });
      this.userInfo.gender = this.value;
    }
  }
};
</script>

<style scoped lang="less">
.acatar {
  display: flex;
  padding: 20 /360 * 100vw;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
    border-radius: 50%;
  }
}
.uploader {
  position: absolute;
  width: 100/360 * 100vw;
  height: 100/360 * 100vw;
  left: 50%;
  top: 50%;
  transform: translateX(-45/360 * 100vw) translateY(-45/360 * 100vw);
  opacity: 0;
}
</style>
