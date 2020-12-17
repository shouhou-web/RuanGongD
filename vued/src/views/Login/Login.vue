<template>
  <div>
    <m-app-header></m-app-header>
    <div class="login-main" @keyup.enter="toLogin">
      <div class="login-all">
        <span class="login-title">Welcome Back!</span>
        <span class="login-sub-title">Sign in to continue</span>
        <l-login-input v-model="userID"></l-login-input>
        <l-login-input
          :inputType="'password'"
          :notice="'password'"
          v-model="userPsw"
        ></l-login-input>
        <span class="login-forget" @click="handleForget">forget password?</span>
        <l-login-button @click="toLogin"></l-login-button>
        <l-login-button
          :buttonType="'white'"
          :words="'Sign up to join us !'"
          @click="toRegister"
        ></l-login-button>
      </div>
    </div>
  </div>
</template>

<script>
import LLoginInput from "./childCpn/l-Login-Input.vue";
import LLoginButton from "./childCpn/l-Login-Button.vue";
import { login } from "network/login-register";

export default {
  components: { LLoginInput, LLoginButton },
  name: "Login",
  data() {
    return {
      userID: "",
      userPsw: "",
      userInfo: ""
    };
  },
  methods: {
    toLogin() {
      if (this.userID == "" || this.userPsw == "") {
        if (this.userID == "" && this.userPsw != "")
          this.$notify.error({
            title: "登陆失败",
            message: "请填写用户名/注册邮箱/用户ID"
          });
        else if (this.userID != "" && this.userPsw == "")
          this.$notify.error({
            title: "登陆失败",
            message: "请填写密码"
          });
        else
          this.$notify.error({
            title: "登陆失败",
            message: "请填写用户信息和密码"
          });
        return;
      }
      login(this.userID, this.userPsw)
        .then(res => {
          if (!res) {
            this.$notify.error({
              title: "登陆失败",
              message: "用户名不存在或密码错误"
            });
            return;
          }
          this.userInfo = res;
          this.$notify.success("登陆成功");
          this.$router.push("/");
        })
        .catch(err => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~"
          });
        });
    },
    handleForget() {
      this.$notify.info({
        title: "别担心",
        message: "请尝试联系管理员"
      });
    },
    toRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
.login-main {
  display: flex;
  margin: 25px auto 0;
  width: var(--width-main);
}

.login-all {
  align-items: center;
  background-color: #ffffff;
  border: #e3e2e6 solid 0.5px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 25px auto;
  height: 550px;
  width: 450px;
}

.login-title {
  color: #6b757b;
  font-size: 40px;
  font-family: Georgia, Times, TimesNR, "New Century Schoolbook", "New York",
    serif;
  margin-top: 40px;
}

.login-sub-title {
  color: #6b757b;
  font-size: 14px;
  font-family: Sans-serif;
  margin-bottom: 50px;
  margin-top: 30px;
}

.login-forget {
  align-self: flex-end;
  color: #6b757b;
  cursor: pointer;
  font-size: 5px;
  font-family: Sans-serif;
  margin-right: 40px;
  margin-bottom: 45px;
  transition: 0.5s;
}

.login-forget:hover {
  color: var(--color-tint);
  transition: 0.5s;
}
</style>
