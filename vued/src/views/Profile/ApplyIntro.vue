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
            <img :src="introImg" class="intro-img" v-if="introImg.length > 0">
            <img src="../../assets/image/no-img.png" class="intro-img" v-else>
          </div>
          <div class="intro-name">{{ introName }}</div>
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
              <div :class="{ 'warning': emailWarning, 'none': !emailWarning }">邮箱格式错误，请使用*.edu.cn后缀的邮箱申请</div>
            </div>
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
export default {
  name: "Apply",
  data() {
    return {
      introImg: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
      introName: "BUAASE",

      email: "",
      application: "",

      emailWarning: false,
    }
  },
  methods: {
    submit() {
      // 对邮箱进行正则判断
      var emailReg = /^\d{8}@(buaa.edu.cn)+$/;

      if (!emailReg.test(this.email)) this.emailWarning = true
      else if (this.application.length > 50) this.$notify.warning("申请理由不可超过50字")
      else {
        this.$notify.success("申请提交成功")
        this.$router.go(-1)
      }
    },
    cancle() {
      this.$notify.info("已取消申请")
      this.$router.go(-1);
    }
  },
  watch: {
    application() {
      if (this.application.length == 51)
        this.$notify.warning("申请理由不可超过50字")
    }
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
  margin-bottom: 30px;
}

.email-input {
  border: 1px solid #dddddd;
  width: 60%;
  height: 30px;
  padding-left: 5px;
  margin-bottom: 5px;
}

.application-input {
  border: 1px solid #dddddd;
  width: 100%;
  height: 300px;
  padding: 5px;
}

textarea {
  outline: none;
  resize: none;
}

.submit {
  height: 20%;
  display: flex;
  flex-direction: row;
  padding-top: 50px;
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
}

.none {
  color: white;
  font-size: 0.800rem;
  letter-spacing: 2px;
}
</style>
