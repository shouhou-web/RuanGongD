<template>
  <div>
    <m-app-header></m-app-header>
    <div class="register-main" @keyup.enter="toRegister">
      <div class="register-all">
        <span class="register-title">Welcome !</span>
        <span class="register-sub-title">Sign up to join us !</span>
        <l-register-input v-model="userName"></l-register-input>
        <l-register-input
          :inputType="'password'"
          :notice="'password'"
          v-model="userPsw"
        ></l-register-input>
        <l-register-input
          :inputType="'password'"
          :notice="'password-confirm'"
          v-model="userPswConfrim"
          class="last-input"
        ></l-register-input>
        <l-register-button @click="toRegister"></l-register-button>
        <l-register-button
          :buttonType="'white'"
          :words="'Has registered, go to Login !'"
          @click="toLogin"
        ></l-register-button>
      </div>
    </div>
  </div>
</template>

<script>
import LRegisterInput from "./childCpn/l-Register-Input.vue";
import LRegisterButton from "./childCpn/l-Register-Button.vue";
import { register } from "network/login-register";

export default {
  components: { LRegisterInput, LRegisterButton },
  name: "Register",
  data() {
    return {
      userName: "",
      userPsw: "",
      userPswConfrim: ""
    };
  },
  methods: {
    toRegister() {
      if (
        this.userName == "" ||
        this.userPsw == "" ||
        this.userPswConfrim == ""
      ) {
        this.$notify.error({
          title: "注册失败",
          message: "请填写完整信息后再注册"
        });
        return;
      }
      register(this.userName, this.userPsw, this.userPswConfrim)
        .then(res => {
          if (res == 2) {
            this.$notify.error({
              title: "注册失败",
              message: "两次输入的密码不同"
            });
            return;
          } else if (res == 3) {
            this.$notify.error({
              title: "注册失败",
              message: "密码不合法. 合法密码需包含大小写字母、数字、符号中的至少两种，且长度为6至16个字符之间"
            });
            return;
          } else if (res == 1) {
            this.$notify.error({
              title: "注册失败",
              message: "用户名重复"
            });
            return;
          } else if (res == -1) {
            this.$notify.error({
              title: "出现异常",
              message: "请稍后重试~"
            });
            return;
          } else if (res == 0) {
            this.$notify.success("注册成功");
            this.$router.push("/login");
            return;
          }
        })
        .catch(err => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~"
          });
        });
    },
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.register-main {
  display: flex;
  margin: 25px auto 0;
  width: var(--width-main);
}

.register-all {
  align-items: center;
  background-color: #ffffff;
  border: #e3e2e6 solid 0.5px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 25px auto;
  height: 600px;
  width: 450px;
}

.register-title {
  color: #6b757b;
  font-size: 40px;
  font-family: Georgia, Times, TimesNR, "New Century Schoolbook", "New York",
    serif;
  margin-top: 40px;
}

.register-sub-title {
  color: #6b757b;
  font-size: 14px;
  font-family: Sans-serif;
  margin-bottom: 50px;
  margin-top: 30px;
}

.last-input {
  margin-bottom: 45px;
}
</style>
