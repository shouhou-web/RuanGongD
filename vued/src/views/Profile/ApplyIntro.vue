<template>
  <div>
    <m-app-header></m-app-header>
    <div class="applyIntro">
      <div class="intro">
        <div class="block-header">
          <div class="header-name">当前申请门户</div>
        </div>
        <div class="intro-intro">
          <div>
            <img :src="intro.image" class="intro-img" v-if="intro.image.length > 0">
            <img src="../../assets/image/no-img.png" class="intro-img" v-else>
          </div>
          <div class="intro-name">{{ intro.realName }}</div>
        </div>
      </div>
      <div class="apply">
        <div class="block-header">
          <div class="header-name">申请表单</div>
        </div>
        <div class="apply-form">
          <div class="author-email">
            <div class="form-header">邮箱</div>
            <div class="emails">
              <input class="email-input" v-model="email" @focus="emailWarning = false"></input>
              <div :class="{ 'warning': emailWarning, 'none': !emailWarning }">请使用*.edu.cn后缀的邮箱申请</div>
            </div>
          </div>
          <div class="code">
            <div class="code-request" @click="getCode">获取验证码</div>
            <input class="code-input" v-model="codeInput"></input>
            <div :class="{ 'warning': codeWarning, 'none': !codeWarning }">验证码错误</div>
          </div>
          <div class="application">
            <div class="form-header" v-model="application">申请原因</div>
            <div>
              <textarea class="application-input" v-model="application"></textarea>
            </div>
          </div>
        </div>
        <div class="submit">
          <div class="submit-button" @click="submit()">提交</div>
          <div class="cancle-button" @click="cancle()">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthorInformation, emailVerification, apply } from "@/network/profile";

export default {
  name: "Apply",
  data() {
    return {
      intro: {
        authorID:"",
        realName:"",
        organization:"",
        userID:"",
        image:"",
        introduction:"",
      },

      codeInput: "",
      code: "",
      email: "",
      application: "",

      codeWarning: false,
      emailWarning: false,
    }
  },
  methods: {
    submit() {
      let authorID = this.$route.query.authorID
      let userID = this.$route.query.userID

      // 对邮箱进行正则判断
      var emailReg = /^\d{8}@(buaa.edu.cn)+$/;

      if (!emailReg.test(this.email)) this.emailWarning = true
      else if (this.codeInput != this.code) {
        this.codeWarning = true
        this.$notify.warning("验证码错误")
      }
      else if (this.application.length > 50) this.$notify.warning("申请理由不可超过50字")
      else {
        apply(userID, authorID, this.email, this.application)
        .then((res) => {
          if (res == 0) this.$notify.success("申请认证成功")
          else if (res == 1) {
            this.$notify.info("已经发送过待认证的申请")
            this.$router.go(-1)
          }
          else {
            this.$notify.warning("申请发送失败，请重试")
          }
        })
        .catch((err) => {
          this.$notify.error( { title: "网络错误", message: "请稍后重试~" } )
        })
      }
    },
    cancle() {
      this.$notify.info("已取消申请")
      this.$router.go(-1);
    },
    getCode() {
      // 对邮箱进行正则判断
      var emailReg = /^\d{8}@(buaa.edu.cn)+$/;

      if (!emailReg.test(this.email)) {
        this.emailWarning = true
        this.$notify.warning("请检查邮箱")
      } else {
        emailVerification(this.email)
        .then((code) => {
          if (code == null) this.$notify.warning("验证码出现异常，请重试")
          else this.code = code
        })
        .catch((err) => {
          this.$notify.error(
            {
              title: "网络错误",
              message: "请稍后重试~"
            }
          )
        })
      }
    }
  },
  watch: {
    application() {
      if (this.application.length == 201)
        this.$notify.warning("申请理由不可超过200字")
    }
  },
  created() {
    let authorID = this.$route.query.authorID
    let userID = this.$route.query.userID

    getAuthorInformation(authorID)
    .then((intro) => {
      this.intro = intro
    })
    .catch((err) => {
      this.$notify.error( { title: "网络错误", message: "请稍后重试~" } )
    })
  }
}
</script>

<style scoped>
.applyIntro {
  width: var(--width-main);
  font-family: Consolas;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding-top: 30px;
}

.intro {
  border: 1px solid #dddddd;
  width: 32%;
  background-color: white;
  height: 200px;
  display: flex;
  flex-direction: column;
}

.intro-img {
  border: 1px solid #dddddd;
  width: 25%;
  border-radius: 50%;
  margin-left: 37%;
  margin-top: 5px;
}

.intro-name {
  margin-top: 16px;
  background: #ececec;
  padding-top: 10px;
  height: 40px;
  text-align: center;
}

.block-header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  align-items: center;
}

.header-name {
  border-radius: 3px;
  background-color: #4F6EF2;
  width: fit-content;
  height: fit-content;
  padding: 5px;
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
}

.intro-intro {
  /*border: 1px solid red;*/
  height: 100%;
}

.apply {
  border: 1px solid #dddddd;
  margin-left: 3%;
  width: 65%;
  background-color: white;
  height: 600px;
}

.apply-form {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}

.form-header {
  font-size: 0.8rem;
  letter-spacing: 2px;
  padding-bottom: 5px;
}

.emails {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
}

.email-input {
  border: 1px solid #dddddd;
  width: 60%;
  height: 30px;
  padding-left: 5px;
  margin-bottom: 5px;
  transition: ease-in-out 0.3s;
}

.email-input:focus {
  border: 1px solid #4F6EF2;
  transition: ease-in-out 0.3s;
}

.application-input {
  border: 1px solid #dddddd;
  width: 100%;
  height: 300px;
  padding: 5px;
}

textarea {
  border-radius: 2px;
  outline: none;
  resize: none;
  transition: ease-in-out 0.3s;
}

textarea:focus {
  border: 1px solid #4F6EF2;
  transition: ease-in-out 0.3s;
}

.submit {
  height: 20%;
  display: flex;
  flex-direction: row;
  padding-top: 20px;
}

.submit-button {
  width: 100px;
  height: 30px;
  margin: 0 auto;
  padding: 8px;
  border-radius: 2px;
  text-align: center;
  background-color: #4F6EF2;
  color: white;
  font-size: 0.800rem;
  letter-spacing: 2px;
}

.submit-button:hover {
  cursor: pointer;
}

.cancle-button {
  width: 100px;
  height: 30px;
  margin: 0 auto;
  padding: 8px;
  border-radius: 2px;
  text-align: center;
  background-color: #ca5353;
  color: white;
  font-size: 0.800rem;
  letter-spacing: 2px;
}

.cancle-button:hover {
  cursor: pointer;
}

.warning {
  color: red;
  font-size: 0.800rem;
  letter-spacing: 2px;
  margin: 0 auto;
  margin-top: 8px;
}

.none {
  color: white;
  font-size: 0.800rem;
  letter-spacing: 2px;
}

.code {
  display: flex;
  flex-direction: row;
  /*border: 1px solid red;*/
  margin-bottom: 20px;
}

.code-request {
  color: white;
  background-color: #4F6EF2;
  padding: 5px;
  border-radius: 2px;
  font-size: 0.800rem;
  letter-spacing: 2px;
  margin-right: 93px;
  border: 1px solid #4F6EF2;
  transition: ease-in-out 0.3s;
}

.code-request:hover {
  color: #4F6EF2;
  background-color: white;
  border-radius: 2px;
  border: 1px solid #4F6EF2;
  transition: ease-in-out 0.3s;
  cursor: pointer;
}

.code-input {
  border: 1px solid #dddddd;
  border-radius: 2px;
  width: 200px;
  padding: 2px;
  padding-left: 5px;
  transition: ease-in-out 0.3s;
}

.code-input:focus {
  border: 1px solid #4F6EF2;
  transition: ease-in-out 0.3s;
}
</style>
