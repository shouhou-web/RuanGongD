<template>
  <!-- 个人信息界面 -->
  <div id="profile" class="profile">
    <div id="profileLeftPart" class="leftPart">
      <div class="userImg">
        <img :src="userImgSrc" class="image">
      </div>
      <div class="userProfile-outter-style">
        <div class="userName">
          <img src="../../assets/icons/profile/userName.svg" class="icon-style">
          <div class="userProfile-inner-style">
            <div class="userNickName-style">{{ userNickName }}</div>
            <div class="userName-style">{{ userName }}</div>
          </div>
        </div>
        <div class="userDegree">
          <img src="../../assets/icons/profile/userDegree.svg" class="icon-style">
          <div class="userProfile-inner-style">
            <div class="userDegree-style">{{ retUserDegree() }}</div>
          </div>
        </div>
        <div class="userIntroSimple">
          <img src="../../assets/icons/profile/userIntro.svg" class="icon-style">
          <div class="userProfile-inner-style">
            <div class="userIntro-style">{{ userIntro }}</div>
          </div>
        </div>
      </div>
      <div class="userOp">
        <div class="op-style" title="关注该用户">
          <img src="../../assets/icons/profile/follow.svg" class="opIcon-style">
        </div>
        <div class="op-style" title="举报该用户">
          <img src="../../assets/icons/profile/report.svg" class="opIcon-style">
        </div>
        <div class="op-style" title="编辑信息">
          <img src="../../assets/icons/profile/editProfile.svg" class="opIcon-style">
        </div>
      </div>
      <div class="leftBottom"></div>
    </div>
    <div id="profileRightPart" class="rightPart">
      <div id="introDoor" :class="{ 'userIntroRight-style': userIntroState }">
        <div class="introTitle">
          I
          n
          t
          r
          o
        </div>
        <div class="introImg">
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2335021541,4046898952&fm=26&gp=0.jpg" class="introImg-style">
        </div>
        <div class="introInfo">
          <font>
            北京航空航天大学软件学院是2002年经国家教育部和国家计委联合批准成立的全国37所国家示范性软件学院之一，学院致力于培养全面和谐发展、创新型、国际化、市场急需的有爱国报国情怀的工程实用性人才。经过十多年的发展，软件学院在人才培养上逐渐形成了自己的培养模式和培养特色，受到业界普遍认可。
          </font>
        </div>
        <div class="gotoIntro" title="前往该门户主页">
          <img src="../../assets/icons/profile/rightArrow.svg" class="gotoIcon">
        </div>
      </div>
      <div id="userStorage" class="userStorage">
        <div id="myFavorite" class="favor">
          <div class="favorTag">收藏</div>
          <div class="favorites">
            <div class="one-favorite">
              <div class="favorTitle" title="查看文献">文献标题</div>
              <div class="author">
                <img src="../../assets/icons/profile/author.svg" class="icon-style2">
                <div class="authorName">马兔兔</div>
              </div>
              <div class="baseInfo">
                <img src="../../assets/icons/profile/tag.svg" class="icon-style2">
                <div class="authorName">12k</div>
              </div>
              <div class="favorContent">
                文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容
                文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容
              </div>
            </div>
            <div class="one-favorite">
              <div class="favorTitle" title="查看文献">文献标题</div>
              <div class="author">
                <img src="../../assets/icons/profile/author.svg" class="icon-style2">
                <div class="authorName">马兔兔</div>
              </div>
              <div class="baseInfo">
                <img src="../../assets/icons/profile/tag.svg" class="icon-style2">
                <div class="authorName">12k</div>
              </div>
              <div class="favorContent">
                文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容
                文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容
              </div>
            </div>
            <div class="one-favorite">
              <div class="favorTitle" title="查看文献">文献标题</div>
              <div class="author">
                <img src="../../assets/icons/profile/author.svg" class="icon-style2">
                <div class="authorName">马兔兔</div>
              </div>
              <div class="baseInfo">
                <img src="../../assets/icons/profile/tag.svg" class="icon-style2">
                <div class="authorName">12k</div>
              </div>
              <div class="favorContent">
                文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容
                文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容
              </div>
            </div>
            <div class="one-favorite">
              <div class="favorTitle" title="查看文献">文献标题</div>
              <div class="author">
                <img src="../../assets/icons/profile/author.svg" class="icon-style2">
                <div class="authorName">马兔兔</div>
              </div>
              <div class="baseInfo">
                <img src="../../assets/icons/profile/tag.svg" class="icon-style2">
                <div class="authorName">12k</div>
              </div>
              <div class="favorContent">
                文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容
                文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容
              </div>
            </div>
            <div class="one-favorite">
            <div class="favorTitle" title="查看文献">文献标题</div>
            <div class="author">
              <img src="../../assets/icons/profile/author.svg" class="icon-style2">
              <div class="authorName">马兔兔</div>
            </div>
            <div class="baseInfo">
              <img src="../../assets/icons/profile/tag.svg" class="icon-style2">
              <div class="authorName">12k</div>
            </div>
            <div class="favorContent">
              文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容
              文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容文献内容
            </div>
          </div>
          </div>
        </div>
        <div id="myFollow" class="follow">
          <div class="followTag">关注</div>
          <div class="follows">
            <div class="one-follow">
              <div class="follow-img">
                <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1285063713,2753463619&fm=26&gp=0.jpg" class="follow-img-style" title="进入该用户主页">
              </div>
              <div class="follow-info">
                <div class="one-info-userNickName">
                  <img src="../../assets/icons/profile/userName.svg" class="icon-style2">
                  <div class="inner-style">MGG</div>
                  <div class="one-info-userName">(Ma Hanyuan)</div>
                </div>
                <div class="one-info-userDegree">
                  <img src="../../assets/icons/profile/userDegree.svg" class="icon-style2">
                  <div class="inner-style-not-important">本科生</div>
                </div>
                <div class="one-info-intro">
                  <img src="../../assets/icons/profile/userIntro.svg" class="icon-style2">
                  <div class="inner-style-not-important">猫猫头公司</div>
                </div>
              </div>
              <div class="follow-op">
                <div class="unfollow">
                  <img src="../../assets/icons/profile/unfollow.svg" class="icon-style2-pointer" title="取消关注">
                </div>
                <div class="message">
                  <img src="../../assets/icons/profile/message.svg" class="icon-style2-pointer" title="发送消息">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      // 用户信息
      userName: 'Yu Haomiao',
      userNickName: 'samshui',
      userDegree: 1,
      userIntroState: true,
      userIntro: "北航软件学院",
      userImgSrc: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2660483526,1880492462&fm=26&gp=0.jpg",

      // user收藏文献集合
      favorLiteratures: [],

      // user关注用户集合
      followUsers: []
    };
  },
  methods: {
    retUserDegree() {
      if (this.userDegree == 0) return "高中";
      else if (this.userDegree == 1) return "本科生";
      else if (this.userDegree == 2) return "研究生";
      else if (this.userDegree == 3) return "博士生";
      else if (this.userDegree == 4) return "博士后";
      else return "";
    },
  },
  components: {},
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
}

.leftPart {
  display: flex;
  flex-direction: column;
  width: 20vw;
  height: 99vh;
  background-color: white;
  align-items: center;
  min-width: 240px;
}

.userProfile-outter-style {
  width: 100%;
  margin-top: 30px;
  border-right: 2px dashed #f1cdcd;
  padding: 5px;
}

.follow-userProfile-outter-style {

}

.userImg {
  margin-top: 10px;
  width: 120px;
  height: 120px;
  min-width: 120px;
  min-height: 120px;
}

.image {
  border: 1px solid #acacac;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow:10px 10px 10px rgba(214, 179, 179, 0.5);
}

.follow-img-style {
  border: 1px solid #acacac;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow:10px 10px 10px rgba(214, 179, 179, 0.5);
  cursor: pointer;
}

.userName {
  width: 100%;
  /*border: 1px solid red;*/
  font-family: Consolas,"Microsoft YaHei";
  display: flex;
  flex-direction: row;
}

.userProfile-inner-style {
  /*border: 1px solid gray;*/
  display: flex;
  flex-direction: column;
  margin: auto 0;
  margin-left: 35px;
}

.userNickName-style {
  display: flex;
  flex-direction: row;
  font-size: 20px;
}

.userName-style {
  font-size: 15px;
  color: #999999;
}

.follow-userProfile-inner-style {
  /*border: 1px solid gray;*/
  display: flex;
  flex-direction: column;
  margin: auto 0;
  margin-left: 10px;
}

.follow-userNickName-style {
  display: flex;
  flex-direction: row;
  font-size: 20px;
}

.follow-userName-style {
  font-size: 15px;
  color: #999999;
}

.icon-style {
  width: 20px;
  height: 20px;
  margin: auto 0;
  margin-left: 50px;
}

.icon-style2 {
  width: 20px;
  height: 20px;
  margin: auto 0;
}

.icon-style2-pointer {
  width: 20px;
  height: 20px;
  margin: auto 0;
  cursor: pointer;
}

.userDegree {
  margin-top: 15px;
  width: 100%;
  /*border: 1px solid red;*/
  font-family: Consolas,"Microsoft YaHei";
  display: flex;
  flex-direction: row;
}

.userDegree-style {
  font-size: 0.7vw;
  color: #999999;
  letter-spacing: 5px;
}

.userIntroSimple {
  margin-top: 20px;
  width: 100%;
  /*border: 1px solid red;*/
  font-family: Consolas,"Microsoft YaHei";
  display: flex;
  flex-direction: row;
}

.userIntro-style {
  font-size: 0.7vw;
  color: #999999;
  letter-spacing: 5px;
}

.userOp {
  margin: auto 0;
  margin-top: 30px;
  width: 80%;
  height: 50px;
  display: flex;
  flex-display: row;
  justify-content: space-between;
  transition: ease-in-out 0.5s;
  border: 1px solid #e9d5d5;
  padding-left: 18px;
  padding-right: 18px;
}

.userOp:hover {
  transition: ease-in-out 0.5s;
  box-shadow:10px 10px 10px rgba(214, 179, 179, 0.5);
}

.op-style {
  margin: auto 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.opIcon-style {
  width: 20px;
  height: 20px;
  margin: 10px;
}

.leftBottom {
  width: 100%;
  height: 10vh;
  background-color: #e83015;
}

.rightPart {
  display: flex;
  flex-direction: column;
}

.userIntroRight-style {
  margin-top: 10px;
  border: 1px solid #e83015;
  border-radius: 5px;
  background-color: white;
  margin-left: 10vw;
  width: 60vw;
  height: 20vh;
  display: flex;
  flex-direction: row;
}

.introTitle {
  min-width: 3%;
  height: 100%;
  background-color: #e83015;
  color: white;
  font-size: 2vw;
  writing-mode: vertical-rl;
  text-align: center;
  font-family: "Comic Sans MS";
}

.introImg {
  display: flex;
  margin-left: 2%;
  width: 140px;
  height: 100%;
  align-items: center;
  border-right: 1px solid #c4c4c4;
}

.introInfo {
  min-width: 50%;
  max-width: 50%;
  height: 100%;
  /*border: 1px solid black;*/
  margin-left: 10%;
  font-size: 1vw;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-family: "FangSong";
}


.gotoIntro {
  display: flex;
  align-items: center;
  width: 5vw;
  height: 100%;
  /*background-color: #e83015;*/
  margin-left: 10%;
  transition: ease-in-out 0.5s;
}

.introImg-style {
  min-width: 120px;
  max-width: 120px;
  border: 1px solid #acacac;
  border-radius: 5px;
  box-shadow:10px 10px 10px rgba(214, 179, 179, 0.5);
}

.gotoIcon {
  transition: ease-in-out 0.5s;
  max-width: 40px;
  min-width: 40px;
  cursor: pointer;
}

.gotoIcon:hover {
  transform: translateX(20px);
  transition: ease-in-out 1s;
  cursor: pointer;
}

.userStorage {
  display: flex;
  flex-direction: row;
  border: 1px solid #e83015;
  margin-left: 3vw;
  margin-top: 3vh;
  width: 75vw;
  height: 65vh;
  background-color: white;
}

.favor {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #e83015;
  width: 60%;
  height: 100%;
}

.favorTag {
  max-width: 60px;
  min-width: 60px;
  text-align: center;
  color: white;
  font-size: 1.5vh;
  background-color: #e83015;
  padding: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.favorites {
  /*border: 1px solid black;*/
  width: 100%;
  height: calc(100% - 26px);
  overflow: scroll;
}

.favorites::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.favorites::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color: #e83015;
}

.favorites::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(236, 186, 186, 0.2);
  background   : none;
  border-radius: 10px;
}

.one-favorite {
  margin-top: 10px;
  margin-left: 5%;
  padding: 5px;
  width: 90%;
  border: 1px solid #ecdfdf;
  height: auto;
  transition: ease-in-out 0.5s;
}

.one-favorite:hover {
  box-shadow:10px 10px 10px rgba(214, 179, 179, 0.5);
  transition: ease-in-out 0.5s;
}

.favorTitle {
  max-width: fit-content;
  min-width: fit-content;
  font-size: 1.5vw;
  padding-bottom: 3px;
  border-bottom: 1px solid #bababa;
  cursor: pointer;
}

.favorContent {
  color: #676767;
  font-size: 0.8vw;
  font-family: Consolas, "FangSong";
  line-height: 1.5em;
}

.author {
  /*border: 1px solid red;*/
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.authorName {
  margin-top: 5px;
  margin-left: 10px;
  font-size: 0.6vw;
}

.baseInfo {
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}

.follow {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #e83015;
  width: 35%;
  height: 100%;
  margin-left: 5%;
}

.followTag {
  max-width: 60px;
  min-width: 60px;
  text-align: center;
  color: white;
  font-size: 1.5vh;
  background-color: #e83015;
  padding: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.follows {
  /*border: 1px solid black;*/
  width: 100%;
  height: calc(100% - 26px);
  overflow: scroll;
}

.follows::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.follows::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color: #e83015;
}

.follows::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(236, 186, 186, 0.2);
  background   : none;
  border-radius: 10px;
}

.one-follow {
  display: flex;
  flex-direction: row;
  border: 1px solid #ecdfdf;
  margin-top: 10px;
  margin-left: 5%;
  padding: 5px;
  width: 90%;
  height: auto;
  transition: ease-in-out 0.5s;
}

.one-follow:hover {
  box-shadow:10px 10px 10px rgba(214, 179, 179, 0.5);
  transition: ease-in-out 0.5s;
}

.follow-img {
  width: 20%;
  height: 100%;
}

.follow-info {
  margin-left: 5%;
  width: 60%;
  min-height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.follow-op {
  margin-left: 5%;
  width: 10%;
  min-height: 100%;
  max-height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}

.one-info-userNickName {
  display: flex;
  flex-direction: row;
  font-size: 1vw;
  font-family: Consolas;
  align-items: center;
}

.one-info-userName {
  margin-left: 5px;
  font-size: 0.8vw;
  font-family: Consolas;
  color: #868686;
}

.one-info-userDegree {
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  font-size: 0.8vw;
  font-family: Consolas;
  align-items: center;
}

.one-info-intro {
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  font-size: 0.8vw;
  font-family: Consolas;
  align-items: center;
}

.inner-style {
  margin-left: 5px;
}

.inner-style-not-important {
  margin-left: 5px;
  font-size: 0.7vw;
  color: #999999;
  letter-spacing: 5px;
}

.unfollow {
  min-height: 50%;
  max-height: 50%;
  /*border: 1px solid red;*/
  display: flex;
  align-content: center;
}

.message {
  min-height: 50%;
  max-height: 50%;
  /*border: 1px solid red;*/
  display: flex;
  align-content: center;
}
</style>
