<template>
  <!-- 个人信息界面 -->
  <div id="profile">
    <div id="profile-firstlayer" class="firstlayer-outterstyle">
      <div id="headshot" class="headshot-style">
        <div id="img-statetag" class="imgtag-style">
          <div id="img" class="img-style" @click="changeheadshot()"></div>
          <div id="userstate" class="userstate-style" @click="alertIdent()">未认证用户</div>
        </div>
        <div id="simpleinfo" class="simpleinfo-style">
          <div id="username" class="username-style">Yu Haomiao</div>
          <div id="userinfo" class="userinfo-style">This is Samshui's intro,welcome to my homepage and wish you can use this web softly.</div>
        </div>
      </div>
      <div id="publish" class="publish-style">
        <div id="publish-button" class="publishbutton-style" @click="alertPublish()">发布</div>
      </div>
    </div>
    <div id="profile-secondlayer" class="secondlayer-outterstyle">
      <div id="leftpart" class="leftpart-style"></div>
      <div id="rightpart" class="rightpart-style"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {};
  },
  methods: {
    changeheadshot() {
      this.$message.success("点击头像");
    },
    alertIdent() {
      this.$message.info("您还未认证");
    },
    alertPublish() {
      this.$message.error("您还未认证，无法发表内容");
    }
  },
  components: {},
};
</script>

<style scoped>
.firstlayer-outterstyle {
  margin-left: 5vw;
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;
  width: 90vw;
  height: 150px;
  display: flex;
  flex-direction: row;
}

.secondlayer-outterstyle {
  margin-left: 5vw;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.336);
  border-radius: 5px;
  width: 90vw;
  height: 450px;
  display: flex;
  flex-direction: row;
}

.leftpart-style {
  margin: 2%;
  width: 46%;
  height: 300px;
  background-color: white;
}

.rightpart-style {
  margin: 2%;
  width: 46%;
  height: 200px;
  background-color: white;
}

.headshot-style {
  display: flex;
  flex-direction: row;
  margin-left: 20%;
  min-width: 100px;
  width: 20%;
}

.img-style {
  margin: 15%;
  min-width: 80px;
  min-height: 80px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* background-color: rgb(138, 157, 160); */
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605627415356&di=42ef36c7ce934ca22a1cbc05fac29c5d&imgtype=0&src=http%3A%2F%2Fww1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg);
  background-size: 80px 80px;
}

.simpleinfo-style {
  width: calc(90% - 80px);
  height: auto;
}

.publish-style {
  width: 20%;
  margin-left: 30%;
}

.imgtag-style {
  width: calc(80px + 10%);
  display: flex;
  flex-direction: column;
}

.userstate-style {
  padding: 3px;
  width: auto;
  height: auto;
  min-width: 80px;
  border-radius: 5px;
  text-align: center;
  background-color: rgba(223, 203, 137, 0.411);
  color: rgb(241, 125, 16);
  font-size: 1.5vh;
}

.username-style {
  border-radius: 5px;
  padding: 5px;
  background-color: rgba(233, 233, 233, 0.651);
  width: 90%;
  margin: 5%;
  font-size: 2vh;
  font-family: Console;
  overflow: auto;
  max-height: 40px;
}

.userinfo-style {
  border-radius: 5px;
  padding: 5px;
  background-color: rgba(233, 233, 233, 0.651);
  width: 90%;
  height: auto;
  max-height: 60%;
  margin: 5%;
  margin-top: 10%;
  overflow: auto;
  font-size: 1vh;
  font-family: Console;
}

.publishbutton-style {
  text-align: center;
  border-radius: 5px;
  background-color: rgba(168, 221, 241, 0.548);
  width: 120px;
  padding: 3%;
  margin-left: calc(50% - 60px);
  margin-top: 60px;
}
</style>
