<template>
  <!-- 个人信息界面 -->
  <div id="profile">
    <div id="profile-firstlayer" class="firstlayer-outterstyle">
      <div id="headshot" class="headshot-style">
        <div id="img-statetag" class="imgtag-style">
          <div id="img" class="img-style"></div>
        </div>
        <div id="simpleinfo" class="simpleinfo-style">
          <div id="username" class="username-style">
            {{ userName }}
          </div>
          <div class="info-tags">
            <div id="userDegree" class="userdegree-style">
              {{ retUserDegree() }}
            </div>
            <div id="userDegree" class="userdegree-style">
              {{ retUserState() }}
            </div>
          </div>

        </div>
      </div>
      <div id="publish" class="publish-style">
        <div id="publish-button" class="publishbutton-style">发布</div>
      </div>
    </div>
    <div id="profile-secondlayer" class="secondlayer-outterstyle">
      <div class="choose-style">
        <div class="secondlayer-tagstyle" @click="changeChosenModle(0)">收藏</div>
        <div class="whiteblock"></div>
        <div class="secondlayer-tagstyle" @click="changeChosenModle(1)">关注</div>
      </div>
      <div class="chooseSlice-style">
        <div :class="{ 'sliceRight': this.chosenModle == true, 'sliceLeft': this.chosenModle == false}"></div>
      </div>
    </div>
    <div id="profile-fourthlayer" class="fourthlayer-outterstyle">
      <div id="leftpart" class="leftpart-style"></div>
      <div id="rightpart" class="rightpart-style"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      userName: 'Yu Haomiao',
      userState: 1,
      userDegree: 1,
      chosenModle: false
    };
  },
  methods: {
    retUserState() {
      if (this.userState == 0) return "管理员";
      else if (this.userState == 1) return "已认证用户";
      else if (this.userState == 2) return "未认证用户";
      else return "";
    },
    retUserDegree() {
      if (this.userDegree == 0) return "高中";
      else if (this.userDegree == 1) return "本科生";
      else if (this.userDegree == 2) return "研究生";
      else if (this.userDegree == 3) return "博士生";
      else if (this.userDegree == 4) return "博士后";
      else return "";
    },
    changeChosenModle(nowModle) {
      if (this.chosenModle != nowModle)
        this.chosenModle = !this.chosenModle;
      console.log("切换模式" + this.chosenModle);
    }
  },
  components: {},
};
</script>

<style scoped>
.firstlayer-outterstyle {
  background-color: white;
  width: 100vw;
  height: 150px;
  display: flex;
  flex-direction: row;
}

.fourthlayer-outterstyle {
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: row;
}

.leftpart-style {
  margin: 2%;
  width: 66%;
  height: 300px;
  background-color: white;
}

.rightpart-style {
  margin: 2%;
  width: 26%;
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
  border-radius: 5%;
  /* background-color: rgb(138, 157, 160); */
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605627415356&di=42ef36c7ce934ca22a1cbc05fac29c5d&imgtype=0&src=http%3A%2F%2Fww1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg);
  background-size: 80px 80px;
  cursor: pointer;
}

.simpleinfo-style {
  margin-top: 10px;
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
  text-align: center;
  background-color: rgba(223, 203, 137, 0.411);
  color: rgb(241, 125, 16);
  font-size: 1.5vh;
  cursor: pointer;
}

.username-style {
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 2vw;
  /*background-color: rgba(233, 233, 233, 0.651);*/
  margin-left: 10px;
  width: auto;
  max-height: 50px;
  color: #8eacc5;
}

.userdegree-style {
  padding: 5px;
  background-color: rgba(233, 233, 233, 0.651);
  text-align: center;
  margin: 5%;
  font-size: 1vh;
  font-family: Console;
  /*min-height: 40px;*/
  max-width: 90px;
  min-width: 50px;
  max-height: 50px;
}

.userinfo-style {
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
  background-color: rgba(168, 221, 241, 0.548);
  width: 120px;
  padding: 3%;
  margin-left: calc(50% - 60px);
  margin-top: 60px;
  cursor: pointer;
}

.secondlayer-outterstyle {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 40px;
  /*border: 1px solid red;*/
  background-color: white;
  justify-content: center;
}

.secondlayer-tagstyle {
  text-align: center;
  margin: auto 0;
  /*border: 1px solid black;*/
  height: auto;
  width: auto;
  font-size: larger;
  cursor: pointer;
}

.whiteblock {
  width: 20%;
  height: 100%;
}

.choose-style {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 80%;
  justify-content: center;
}

.chooseSlice-style {
  margin-top: 10px;
  width: 100vw;
  height: 10%;
  /*border: 1px solid black;*/
}

.sliceLeft {
  width: 5%;
  height: 100%;
  background-color: #8eacc5;
  margin-left: calc(38% - 20px);
  transition: all 300ms linear;
}

.sliceRight {
  width: 5%;
  height: 100%;
  margin-left: calc(58% + 10px);
  background-color: #96bf47;
  transition: all 300ms linear;
}

.info-tags {
  display: flex;
  flex-direction: row;
}
</style>
