<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input v-model="user.username" class="input" clearable></el-input>
      <el-input v-model="user.password" class="input" clearable show-password></el-input>
      <div class="btn-box">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { requestLogin } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    login() {
      requestLogin(this.user).then((res) => {
        if(res.data.code==200){
          successAlert("登录成功")
          this.changeUser(res.data.list)
          this.$router.push("/home");
        }else{
          warningAlert(res.data.msg)
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563443, #2f3d60);
}
.con {
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  line-height: 60px;
  font-size: 30px;
  text-align: center;
}
.input {
  margin-bottom: 20px;
}
.btn-box {
  text-align: center;
}
</style>