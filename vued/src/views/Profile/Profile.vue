<template>
  <!-- 个人信息界面 -->
  <div id="profile" class="profile">
    <m-app-header></m-app-header>
    <div class="profile-header">
      <div class="user-profile">
        <div class="profile-info">
          <div class="headshot">
            <img :src="user.image" class="headshot-img">
            <a class="headshot__hide" title="修改头像" @click="openChangeHeadshot">
              <img src="../../assets/image/edit.png" class="headshot__inner--samll">
            </a>
          </div>
          <div class="username">
            <div class="user-nickname">{{ user.username }}</div>
            <div class="user-degree" @click="openChangeProfileHover">
              {{ retUserDegree() }}
              <img src="../../assets/icons/profile/edit.svg" class="profile-icon">
            </div>
          </div>
        </div>
        <div class="profile-op">
          <div class="op-favor">收藏文献</div>
          <div class="bar"></div>
        </div>
      </div>
    </div>
    <div class="profile-content">
      <div class="content-left">
        <favor :userID="user.userID"></favor>
      </div>
      <div class="content-right">
        <div class="user-intro">
          <div class="user-application">
            <div class="application" @click="applyForIntro()">申请加入门户</div>
          </div>
        </div>
        <div class="user-follow">
          <div class="follow-header">
            <div class="follow-header-content">Follow</div>
          </div>
          <div class="following">
            <div class="follow-part-head">following ({{ followUsers.length }})</div>
            <div class="following-content" v-if="followUsers.length > 0">
              <div class="one-following" v-for="(onefollowingUser, i) in followUsers">
                <img :src="onefollowingUser.imgSrc" class="intro-img img-plus">
                <div class="following-info">
                  <div class="name-style">{{ onefollowingUser.name }}</div>
                  <div class="intro-style">{{ onefollowingUser.intro }}</div>
                </div>
                <div class="following-op" @click="cancleFollow(onefollowingUser.followingID)">unfollow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <m-hover ref="changeProfile" @submit="submit" @cancel="cancel">
      <div class="change-profile-outter">
        <div class="change-nickname">
          <div class="hover-input-header">change nickname</div>
          <div class="hover-input">
            <input v-model="newNickName"></input>
          </div>
        </div>
        <div class="change-degree">
          <div class="hover-input-header">change degree</div>
          <div>
            <select v-model="newDegree" class="hover-input">
              <option v-for="option in options" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </m-hover>
    <m-hover ref="changeHeadshot" @submit="submit" @cancel="cancel"></m-hover>
  </div>
</template>

<script>
import yLiterature from '@/components/common/y-literature/y-literature'
import Favor from "@/views/Profile/Favor";
import { getUserFollowingList, getUserInformation } from "@/network/profile";

export default {
  name: "Profile",
  data() {
    return {
      isSelfProfile: true,

      // user
      user: {},

      // 当前我的门户
      userIntro: {},

      // user收藏文献集合
      favorLiteratures: [],

      // user关注用户集合
      followUsers: [],

      options: [
        { text: '高中', value: '0' },
        { text: '本科生', value: '1' },
        { text: '研究生', value: '2' },
        { text: '博士生', value: '3' },
        { text: '博士后', value: '4' },
      ],

      newNickName: "",
      newDegree: 0
    };
  },
  created() {
    let userID = this.$route.query.userID;

    // 当前用户进入自己的主页
    if (userID == this.$store.state.user.userID) {
      this.user = this.$store.state.user;

      console.log(this.user)

      // 获取个人信息：我的关注 + 我的收藏
      getUserFollowingList(userID)
      .then((follow) => { this.followUsers = follow, console.log("follow:", follow) } )
      .catch((err) => { this.$notify.error( { title: "网络错误", message: "请稍后重试~" } ) } )
    }
    // 进入其他用户个人主页
    else {
      this.isSelfProfile = false

      // 获取当前用户对象
      getUserInformation(userID)
      .then((user) => { this.user = user, console.log("user", user) } )
      .catch((err) => { this.$notify.error( { title: "网络错误", message: "请稍后重试~" } ) } )

      getUserIntro(this.user.authorID)
      .then((userIntro) => { this.userIntro = userIntro, console.log("intro", userIntro)})
    }

    this.newNickName = this.user.username
    this.userDegree = this.user.userDegree
  },
  methods: {
    retUserDegree() {
      if (this.userDegree == 0) return "高中";
      else if (this.userDegree == 1) return "Bachelor of Engineering";
      else if (this.userDegree == 2) return "研究生";
      else if (this.userDegree == 3) return "博士生";
      else if (this.userDegree == 4) return "博士后";
      else return "";
    },
    openChangeProfileHover() {
      this.$refs.changeProfile.showHover({
        title: "修改个人资料",
        submitBtn: "取消",
        cancelBtn: "提交"
      });
    },
    openChangeHeadshot() {
      this.$refs.changeHeadshot.showHover({
        title: "修改头像",
        submitBtn: "取消",
        cancelBtn: "提交"
      });
    },
    cancleFollow(selectUserID) {
      this.$notify.info("已取消关注")
    },
    doFollow(selectUserID) {
      this.$notify.success("关注成功")
    },
    opSwitch(opID) {
      this.op = opID
    },
    gotoIntro(authorID) {
      this.$router.push({path: '/intro', query: { authorID: this.user.authorID }})
    },
    applyForIntro() {
      this.$router.push({path: '/applyIntro'})
    },
    submit() {

    },
    cancel() {

    }
  },
  components: {
    'y-literature': yLiterature,
    'favor': Favor
  },
};
</script>

<style scoped>
.profile {
  font-family: Consolas;
  /*letter-spacing: 2px;*/
}

.profile-header {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 100%;
  height: 193px;
  background-color: white;
}

.user-profile {
  width: var(--width-main);
  height: 100%;
  /*border: 1px solid black;*/
  margin: 0 auto;
}

.profile-info {
  width: 100%;
  height: 145px;
  /*border: 1px solid yellow;*/

  display: flex;
  flex-direction: row;
}

.headshot {
  width: 130px;
  height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  align-items: center;
  position: relative;
}

.headshot-img {
  margin: 0 auto;
  border-radius: 50%;
  max-width: 80%;
}

.headshot__hide {
  width: 104px;
  height: 104px;
  align-items: center;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  opacity: 0;
  position: absolute;
  left: 13px;
  top: 20px;
  right: 0;
  bottom: 0;
  transition: ease-in-out 0.3s;
}

.headshot:hover .headshot__hide {
  opacity: 1;
  cursor: pointer;
  transition: ease-in-out 0.3s;
}

.headshot__inner--samll {
  border-radius: 50%;
  height: 40%;
  width: 40%;
}

.username {
  width: 665px;
  height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  flex-direction: column;
}

.user-nickname {
  margin-left: 2%;
  margin-top: 7%;
  line-height: 1,2;
  color: #111;
  font-size: 1.375rem;
}

.user-degree {
  max-width: fit-content;
  margin-left: 2%;
  margin-top: 1%;
  line-height: 1,2;
  color: #555;
  font-size: 0.875rem;
  cursor: pointer;
}

.user-degree:hover {
  border-bottom: 1px solid #777777;
  color: #545454;
}

.publish {
  width: calc(100% - 130px - 665px);
  height: 100%;
}

.publish-button {
  margin: 0 auto;
  margin-top: 15%;
  padding: 10px;
  width: 70%;
  border-radius: 2px;
  text-align: center;
  background-color: #4F6EF2;
  color: white;
  font-size: 0.800rem;
  letter-spacing: 2px;
}

.profile-op {
  width: 100%;
  height: 47px;
  /*border: 1px solid gray;*/
  display: flex;
  flex-direction: column;
}


.op-favor {
  margin-top: 20px;
  font-size: 0.8rem;
  margin-left: 20px;
  margin-right: 30px;
  max-width: fit-content;
}

.op-favor:hover {
  cursor: pointer;
}

.bar {
  background-color: #4F6EF2;
  border-radius: 2px;
  height: 2px;
  width: 50px;
  margin-top: 10px;
  margin-left: 20px;
}

.profile-content {
  margin: 0 auto;
  margin-top: 30px;
  width: var(--width-main);
  /*margin: 0 auto;*/
  height: 100vh;
  display: flex;
  flex-direction: row;
}

.content-left {
  width: 65%;
  height: 100%;
  /*border: 1px solid #ddd;*/
  /*background-color: white;*/
}

.one-follow-literature {
  width: 100%;
  height: 170px;
  border: 1px solid #dddddd;
  background-color: white;
  padding: 30px 25px 27px 25px;
}

.title {
  font-size: 0.9rem;
  color: black;
  font-weight: 700;
  width: fit-content;
  height: 25px;
  line-height: 20px;
  padding-left: 5px;
  margin-bottom: 5px;
}

.title:hover {
  cursor: pointer;
  /*border-bottom: 1px solid black;*/
}

.tags {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}

.tag {
}

.first-tag {
  border-radius: 3px;
  width: fit-content;
  padding: 3px;
  margin: 5px;
  font-size: 0.8rem;
  color: white;
  background-color: #4F6EF2;
}

.first-tag:hover {
  cursor: pointer;
}

.leftpart-tags {
  border-radius: 3px;
  width: fit-content;
  padding: 3px;
  margin: 5px;
  font-size: 0.8rem;
  border: 1px solid #4F6EF2;
  background-color: white;
  color: #4F6EF2;
}

.leftpart-tags:hover {
  cursor: pointer;
}

.authors {
  width: 100%;
  height: 25px;
  margin-bottom: 5px;
}

.author-list {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  align-items: center;
}

.authorImg {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: 1.5px;
  margin-left: 5px;
}

.authorname {
  font-size: 0.8rem;
  color: #000000;
  margin-left: 2px;
}

.authorname:hover {
  cursor: pointer;
  /*border-bottom: 1px solid #000000;*/
}

.read-time {
  width: 100%;
  height: 25px;
  font-size: 0.8rem;
  color: #999999;
  padding-left: 5px;
}

.read-time-content {
  height: 100%;
  margin-top: 3px;
}

.literature-ops {
  margin: 0 auto;
  width: 100%;
  height: calc(100% - 75px - 32px);
  display: flex;
}

.one-op {
}

.content-right {
  margin-left: 3%;
  width: 32%;
  height: 100%;
}

.user-intro {
  width: 100%;
  height: 193;
  border: 1px solid #ddd;
  background-color: white;
}

.user-intro-header {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user-intro-header-content {
  margin-left: 5%;
  font-size: 0.8rem;
  color: #777;
}

.user-application {
  width: 100%;
  height: 100px;
}

.application {
  margin: 0 auto;
  margin-top: 55px;
  max-width: 50%;
  padding: 10px;
  color: white;
  background-color: #4F6EF2;
  border-radius: 2px;
  text-align: center;
  font-size: 0.800rem;
  letter-spacing: 2px;
}

.application:hover {
  cursor: pointer;
}

.user-intro-change {
  margin-top: -3px;
  margin-left: 37%;
  font-size: 0.8rem;
  color: #777;
  cursor: pointer;
}

.user-intro-change:hover {
  /*border-bottom: 1px solid #777777;*/
  color: #4a4a4a;
}

.user-intro-content {
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
  flex-direction: row;
}

.intro-content {
  width: calc(100% - 70px);
  height: 100px;
}

.intro-content-details {
  height: 100px;
}

.intro-font-1 {
  max-width: fit-content;
  color: #111111;
  font-weight: 700;
  font-size: 1rem;
  transition: ease-in-out 0.5s;
}

.intro-font-1:hover {
  /*border-bottom: 1px solid #777777;*/
  color: #4F6EF2;
  cursor: pointer;
  transition: ease-in-out 0.5s;
}

.intro-font-2 {
  margin-top: 18px;
  color: #111111;
  font-size: 0.8rem;
}

.intro-img {
  border: 1px solid #e3e3e3;
  width: 70px;
  height: 70px;
}

.img-plus {
  margin-left: 5%;
  border-radius: 50%;
}

.intro-img-details {
  max-width: 100%;
  max-height: 100%;
}

.intro-img-details:hover {
  cursor: pointer;
}

.user-follow {
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  background-color: white;
  margin-top: 30px;
}

.follow-header {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
}

.follow-header-content {
  margin-left: 5%;
  font-size: 0.8rem;
  color: #777;
}

.following {
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.follow-part-head {
  width: 100%;
  height: 54px;
  /*border: 1px solid red;*/
  font-size: 0.7rem;
  padding: 5%;
  color: #000000;
}

.following-content {
}

.following-info {
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  margin-top: 5%;
}

.one-following {
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
}

.name-style {
  font-size: 1rem;
  color: #555555;
}

.intro-style {
  font-size: 0.8rem;
  color: #999999;
}

.following-op {
  margin: 0 auto;
  color: red;
  font-size: 0.8rem;
  margin-top: 8%;
}

.following-op:hover {
  height: fit-content;
  border-bottom: 1px solid red;
  cursor: pointer;
}

.befollowed-op-followed {
  margin: 0 auto;
  color: #dddddd;
  font-size: 0.8rem;
  margin-top: 8%;
}

.befollowed-op-to-follow {
  margin: 0 auto;
  font-size: 0.8rem;
  margin-top: 8%;
}

.befollowed-op-to-follow:hover {
  height: fit-content;
  cursor: pointer;
  /*border-bottom: 1px solid black;*/
}

.befollowed-content {
  padding-bottom: 20px;
}

.edit {
  margin-left: 80px;
}

.profile-icon {
  width: 15px;
}

.change-profile-outter {
  width: 400px;
  height: auto;
  background-color: white;
}

.change-degree {
  margin-left: 60px;
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.change-nickname {
  margin-left: 60px;
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.hover-input-header {
  font-size: 0.9rem;
  color: #777777;
  transition: ease-in-out 0.5s;
}

.hover-input {
  font-size: 0.8rem;
  width: 70%;
  padding: 5px;
  margin-top: 5px;
  border: 1px solid #dddddd;
}

.hover-select {
  width: 70%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  margin-top: 5px;
  border: 1px solid #dddddd;
  font-size: 0.8rem;
}

.option {
}

</style>
