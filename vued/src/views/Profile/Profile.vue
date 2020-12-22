<template>
  <!-- 个人信息界面 -->
  <div id="profile" class="profile">
    <m-app-header></m-app-header>
    <div class="profile-header">
      <div class="user-profile">
        <div class="profile-info">
          <div class="headshot">
            <img :src="user.image" class="headshot-img" v-if="user.image != null">
            <img src="../../assets/image/no-img.png" class="headshot-img" v-else>
            <a class="headshot__hide" title="修改头像" @click="openChangeHeadshot" v-if="isSelfProfile">
              <img src="../../assets/image/edit.png" class="headshot__inner--samll">
            </a>
          </div>
          <div class="username">
            <div class="user-nickname" @click="openChangeProfileHover">
              {{ user.username }}
              <img src="../../assets/icons/profile/edit.svg" class="profile-icon" @click="openChangeProfileHover">
            </div>
            <div class="user-degree" v-if="!isSelfProfile">
              {{ retUserDegree() }}
            </div>
            <div class="user-degree" v-else>
              <p v-if="this.$store.state.user.userDegree == 0">高中生 (High school)</p>
              <p v-else-if="this.$store.state.user.userDegree == 1">本科生 (UnderGraduates)</p>
              <p v-else-if="this.$store.state.user.userDegree == 2">研究生 (Graduate)</p>
              <p v-else-if="this.$store.state.user.userDegree == 3">博士生 (Doctor)</p>
              <p v-else-if="this.$store.state.user.userDegree == 4">博士后 (Post-Doctoral)</p>
              <p v-else>当前用户暂无该信息</p>
            </div>
            <div class="user-phone">{{ user.phoneNumber }}<p v-if="user.phoneNumber == null">暂无联系方式</p></div>
            <div class="user-email">{{ user.emailAddress }}<p v-if="user.emailAddress == null">暂无邮箱</p></div>
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
        <div class="user-intro" v-if="isSelfProfile">
          <div class="user-application">
            <!-- todo -->
            <div class="application">当前还未认证门户</div>
          </div>
        </div>
        <div class="user-follow">
          <div class="follow-header">
            <div class="follow-header-content">Follow</div>
          </div>
          <div class="following" v-if="followUsers.length > 0">
            <div class="follow-part-head">following ({{ followUsers.length }})</div>
            <div class="following-content">
              <div class="one-following" v-for="(onefollowingUser, i) in followUsers">
                <img :src="onefollowingUser.image" class="intro-img img-plus" @click="gotoIntro(onefollowingUser.userID, onefollowingUser.authorID)">
                <div class="following-info">
                  <div class="name-style">{{ onefollowingUser.username }}</div>
                  <div class="intro-style" @click="gotoIntro(onefollowingUser.userID, onefollowingUser.authorID)">{{ onefollowingUser.realName }}</div>
                </div>
                <div class="following-op" @click="cancleFollow(this.$store.state.user.userID, onefollowingUser.authorID)" v-if="isSelfProfile">unfollow</div>
              </div>
            </div>
          </div>
          <div v-else>
            <img src="../../assets/image/no-follow.png" class="img-none">
          </div>
        </div>
      </div>
    </div>
    <m-hover ref="changeProfile" @submit="submitEdit" @cancel="cancel">
      <div class="edit">
        <div class="edit-header">
          <div :class="{'edit-button': editOp != 0, 'edit-button-chosen': editOp == 0}" @click="changeEditOp(0)">修改用户名</div>
          <div :class="{'edit-button': editOp != 1, 'edit-button-chosen': editOp == 1}" @click="changeEditOp(1)">修改邮箱</div>
          <div :class="{'edit-button': editOp != 2, 'edit-button-chosen': editOp == 2}" @click="changeEditOp(2)">修改其他信息</div>
        </div>
        <div class="edit-body">
          <div class="edit-username" v-if="editOp == 0">
            <img src="../../assets/icons/profile/userName.svg" class="degree-icon">
            <input class="hover-input" v-model="newNickName"></input>
          </div>
          <div class="edit-email" v-else-if="editOp == 1">
            <div class="input-email">
              <img src="../../assets/icons/profile/email.svg" class="degree-icon">
              <input class="hover-input" v-model="newEmail" @focusout="checkEmail"></input>
              <div :class="{ 'warning': emailWarning, 'none': !emailWarning }">邮箱格式不正确</div>
              <div v-if="getRightEmail" class="code">
                <div class="code-request" @click="requestCode">获取验证码</div>
                <input v-model="editCode" class="code-input"></input>
              </div>
            </div>
            <div class="get-code"></div>
          </div>
          <div class="edit-other" v-else-if="editOp == 2">
            <div>
              <img src="../../assets/icons/profile/degree.svg" class="degree-icon">
              <img src="../../assets/icons/profile/phone.svg" class="phone-icon">
              <select v-model="newDegree" class="hover-input">
                <option v-for="option in options" v-bind:value="option.value">
                  {{ option.text }}
                 </option>
              </select>
            </div>
            <input class="hover-input" v-model="newPhone"></input>
          </div>
        </div>
<!--        <div class="edit-buttons">-->
<!--          <div class="edit-button-submit">提交</div>-->
<!--          <div class="edit-button-cancle">取消</div>-->
<!--        </div>-->
      </div>
    </m-hover>
    <m-hover ref="changeHeadshot" @cancel="cancel">
      <el-main>
        <el-upload
          :class="{ hide: hideUploadEdit }"
          :action="uploadPath"
          :multiple="false"
          list-type="picture-card"
          accept="image/jpg, image/jpeg, image/png"
          :data="postData"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-main>
    </m-hover>
  </div>
</template>

<script>
import { getToken } from "@/network/genToken";
import random from "string-random";
import yLiterature from '@/components/common/y-literature/y-literature'
import Favor from "@/views/Profile/Favor";
import {
  getUserFollowingList,
  getUserInformation,
  editProfile,
  editUserName,
  editUserEmailAddress,
  emailVerification,
  editUserImage
} from "@/network/profile";

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
        { text: '高中生 (High school)', value: '0' },
        { text: '本科生 (UnderGraduates)', value: '1' },
        { text: '研究生 (Graduate)', value: '2' },
        { text: '博士生 (Doctor)', value: '3' },
        { text: '博士后 (Post-Doctoral)', value: '4' },
      ],

      newNickName: "",
      newDegree: 0,
      newPhone: "",
      newEmail: "",
      editCode: "",
      newImageUrl: "",
      code: null,

      editOp: 0,
      emailWarning: false,
      getRightEmail: false,

      uploadPath: "https://upload-z1.qiniup.com", // 七牛云华北
      imgPathPrefix: "http://qlotpwg5r.hb-bkt.clouddn.com/",
      hideUploadEdit: false, // 是否隐藏上传按钮
      postData: {
        token: "",
        key: ""
      },
      fileList: [],
      imagePath: "" // 图片链接
    };
  },
  methods: {
    beforeUpload(file) {
      const checkFileType =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const checkFileSize = file.size / 1024 / 1024 < 5;
      if (!checkFileType) {
        this.$notify.info("上传图片必须是 jpeg/jpg/png 格式！");
      } else if (!checkFileSize) {
        this.$notify.info("上传图片大小不能超过 5MB！");
      }
      if (checkFileType && checkFileSize) this.postData.key = random(16);
      return checkFileType && checkFileSize;
    },
    handleSuccess(file, response, fileList) {
      this.fileList = fileList;
      this.imagePath = this.imgPathPrefix + this.fileList[0].response.key;
      console.log(response, file, fileList);
      this.$store.commit("setImagePath", this.imagePath)
      this.hideUploadEdit = true;

      editUserImage(this.$store.state.user.userID, this.imagePath)
      .then((res) => {
        if (res == 0) this.$notify.success("头像修改成功")
        else if (res == -1) this.$notify.warning("头像修改失败")
      })
      .catch((err) => {
        this.$notify.error(
          {
            title: "网络错误",
            message: "请稍后重试~"
          })
      })
    },
    handleRemove() {
      this.hideUploadEdit = false;
    },
    handleExceed() {
      this.$notify.info("最多上传 1 张头像");
    },
    retUserDegree() {
      if (this.userDegree == 0) return "高中生 (High school)";
      else if (this.userDegree == 1) return "本科生 (UnderGraduates)";
      else if (this.userDegree == 2) return "研究生 (Graduate)";
      else if (this.userDegree == 3) return "博士生 (Doctor)";
      else if (this.userDegree == 4) return "博士后 (Post-Doctoral)";
      else return "";
    },
    openChangeProfileHover() {
      this.newDegree = this.user.userDegree
      this.$refs.changeProfile.showHover({
        title: "修改个人资料",
        submitBtn: "提交",
        cancelBtn: "取消"
      });
    },
    openChangeHeadshot() {
      this.$refs.changeHeadshot.showHover({
        title: "修改头像",
        cancelBtn: "取消"
      });
    },
    cancleFollow(userID, followID) {
      let followerID = userID
      let followedID = followID

      follow(followerID, followedID, 0)
      .then((res) => {
        if (res == 0)
          this.$notify.warning("取消关注失败，请刷新重试")
        else {
          this.$notify.success("取消关注成功")

          getUserFollowingList(followerID)
            .then((follow) => {
              this.followUsers = follow
            })
            .catch((err) => { this.$notify.error( { title: "网络错误", message: "请稍后重试~" } ) } )
        }
      })
      .catch((err) => {
        this.$notify.error(
          {
            title: "网络错误",
            message: "请稍后重试~"
          }
        )
      })
    },
    opSwitch(opID) {
      this.op = opID
    },
    gotoIntro(userID, authorID) {
      this.$router.push(
        {
          path: '/intro',
          query: {
            userID: userID,
            authorID: authorID
          }
        }
      )
    },
    requestCode() {
      emailVerification(this.newEmail)
      .then((code) => {
        console.log("code", code)
        if (code == null) this.$notify.warning("验证码出现异常，请重试")
        else {
          this.code = code
          this.$notify.success("获取验证码成功，请查看邮箱")
        }
      })
      .catch((err) => {
        this.$notify.error(
          {
            title: "网络错误",
            message: "请稍后重试~"
          }
        )
      })
    },
    submitEdit() {
      // name
      if (this.editOp == 0) {
        editUserName(this.user.userID, this.newNickName)
        .then((res) => {
          if (res == 0) {
            this.$notify.success("用户名修改成功")
            this.$store.commit("setUserName", this.newNickName)
            this.$refs.changeProfile.hideHover()
            this.editOp = 0
          }
          else if (res == 1) this.$notify.warning("该用户名已被您或他人使用")
          else if (res == -1) this.$notify.error("修改异常，请检查网络")
        })
        .catch((err) => {
          this.$notify.error( { title: "网络错误", message: "请稍后重试~" } )
        })
      }
      // email
      else if (this.editOp == 1) {
        // 对邮箱进行正则判断
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

        if (!emailReg.test(this.newEmail)) {
          this.emailWarning = true
          this.$notify.warning("请检查邮箱")
        }
        else {
          if (this.code == null) this.$notify.warning("请先获取验证码")
          else if (this.editCode != this.code) this.$notify.warning("验证码错误")
          else {
            editUserEmailAddress(this.user.userID, this.newEmail)
            .then((res) => {
              if (res == 0) {
                this.$notify.success("用户邮箱修改成功")
                this.$store.commit("setEmailAddress", this.newEmail)
                this.$refs.changeProfile.hideHover()
                this.editOp = 0
              }
              else if (res == 1) this.$notify.warning("邮箱已被使用")
              else if (res == -1) this.$notify.error("修改异常，请检查网络")
            })
            .catch((err) => {
              this.$notify.error( { title: "网络错误", message: "请稍后重试~" } )
            })
          }
        }
      }
      // others
      else if (this.editOp == 2) {
        editProfile(this.user.userID, this.user.realName, this.newDegree, this.user.image, this.user.organization, this.newPhone)
          .then((res) => {
            if (res == 0) {
              this.$notify.success("修改成功")
              this.$store.commit("setPhoneNumber", this.newPhone)
              this.$store.commit("setUserDegree", this.newDegree)
              this.$refs.changeProfile.hideHover()
              this.editOp = 0
            }
            else if (res == -1) this.$notify.error("修改异常，请检查网络")
          })
          .catch((err) => {
            this.$notify.error( { title: "网络错误", message: "请稍后重试~" } )
          })
      }
    },
    submit() {
    },
    cancel() {
      this.editOp = 0
    },
    changeEditOp(opID) {
      this.editOp = opID
    },
    checkEmail() {
      // 对邮箱进行正则判断
      var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

      if (!emailReg.test(this.newEmail)) {
        this.emailWarning = true
        this.getRightEmail = false
      }
      else {
        this.emailWarning = false
        this.getRightEmail = true
      }
    }
  },
  created() {
    this.postData.token = getToken();
    console.log("token = " + getToken());

    let userID = this.$route.query.userID;

    // 当前用户进入自己的主页
    if (userID == this.$store.state.user.userID) {
      this.user = this.$store.state.user;

      // console.log(this.user)

      this.newNickName = this.user.username
      this.userDegree = this.user.userDegree
      this.newPhone = this.user.phoneNumber

      // 获取个人信息：我的关注 + 我的收藏
      getUserFollowingList(userID)
        .then((follow) => {
          this.followUsers = follow
          // console.log("follow:", follow)
        })
        .catch((err) => { this.$notify.error( { title: "网络错误", message: "请稍后重试~" } ) } )
    }
    // 进入其他用户个人主页
    else {
      this.isSelfProfile = false

      // 获取当前用户对象
      getUserInformation(userID)
        .then((user) => {
          this.user = user
          // console.log("user", user)
        })
        .catch((err) => { this.$notify.error( { title: "网络错误", message: "请稍后重试~" } ) } )

      getUserIntro(this.user.authorID)
        .then((userIntro) => {
          this.userIntro = userIntro
          // console.log("intro", userIntro)
        })
    }
  },
  watch: {
    newEmail() {
      var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (emailReg.test(this.newEmail)) {
        this.emailWarning = false
        this.getRightEmail = true
      } else {
        this.emailWarning = true
        this.getRightEmail = false
      }
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
  max-width: 80%;
  border-radius: 50%;
  border: 1px solid #dddddd;
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
  margin-top: 4%;
  line-height: 1,2;
  color: #111;
  font-size: 1.375rem;
}

.user-nickname:hover {
  cursor: pointer;
}

.user-degree {
  max-width: fit-content;
  margin-left: 2%;
  margin-top: 1%;
  line-height: 1,2;
  color: #555;
  font-size: 0.875rem;
}

.user-phone {
  max-width: fit-content;
  margin-left: 2%;
  margin-top: 1%;
  line-height: 1,2;
  color: #555;
  font-size: 0.875rem;
}

.user-email {
  max-width: fit-content;
  margin-left: 2%;
  margin-top: 1%;
  line-height: 1,2;
  color: #555;
  font-size: 0.875rem;
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
  /*border: 1px solid #dddddd;*/
  width: 600px;
  margin-top: 20px;
  padding-bottom: 10px;
}

.edit-header {
  /*border-bottom: 1px solid #dddddd;*/
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
  margin-bottom: 10px;
}

.edit-buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.edit-button {
  border: 1px solid #4F6EF2;
  height: fit-content;
  padding: 5px;
  font-size: 0.8rem;
  color: #4F6EF2;
  border-radius: 2px;
  transition: ease-in-out 0.3s;
}

.edit-button:hover {
  cursor: pointer;
}

.edit-button-chosen {
  border: 1px solid #4f6ef2;
  height: fit-content;
  padding: 5px;
  font-size: 0.8rem;
  color: #ffffff;
  border-radius: 2px;
  background-color: #4F6EF2;
  transition: ease-in-out 0.3s;
}

.edit-button-chosen:hover {
  cursor: pointer;
}

.edit-button-submit {
  width: 15%;
  text-align: center;
  border: 1px solid #4f6ef2;
  height: fit-content;
  padding: 5px;
  font-size: 0.8rem;
  color: #ffffff;
  border-radius: 2px;
  background-color: #4F6EF2;
  transition: ease-in-out 0.3s;
}

.edit-button-submit:hover {
  border: 1px solid #4f6ef2;
  height: fit-content;
  padding: 5px;
  font-size: 0.8rem;
  color: #4F6EF2;
  border-radius: 2px;
  background-color: white;
  transition: ease-in-out 0.3s;
  cursor: pointer;
}

.edit-button-cancle {
  width: 15%;
  text-align: center;
  border: 1px solid red;
  height: fit-content;
  padding: 5px;
  font-size: 0.8rem;
  color: #ffffff;
  border-radius: 2px;
  background-color: red;
  transition: ease-in-out 0.3s;
}

.edit-button-cancle:hover {
  border: 1px solid red;
  height: fit-content;
  padding: 5px;
  font-size: 0.8rem;
  color: red;
  border-radius: 2px;
  background-color: white;
  transition: ease-in-out 0.3s;
  cursor: pointer;
}

.edit-body {
  display: flex;
  flex-direction: column;
}

.edit-username {
  padding-top: 40px;
  border: 1px dashed #dddddd;
  height: 150px;
  transition: ease-in-out 0.3s;
}

.edit-email {
  padding-top: 40px;
  border: 1px dashed #dddddd;
  height: 200px;
  transition: ease-in-out 0.3s;
}

.edit-other {
  padding-top: 40px;
  border: 1px dashed #dddddd;
  height: 210px;
  transition: ease-in-out 0.3s;
}

.profile-icon {
  width: 15px;
}

.profile-icon:hover {
  cursor: pointer;
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
  margin-top: 10px;
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
  width: 65%;
  font-size: 0.9rem;
  padding: 5px;
  margin-top: 20px;
  margin-left: 17.5%;
  border: 1px solid #dddddd;
  transition: ease-in-out 0.5s;
}

.hover-input:focus {
  border: 1px solid #4F6EF2;
  transition: ease-in-out 0.5s;
}

.degree-icon {
  width: 25px;
  position: absolute;
  left: 90px;
  top: 180px;
}

.phone-icon {
  width: 25px;
  position: absolute;
  left: 90px;
  top: 230px;
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

.img-none {
  width: 100%;
}

select {
  outline: none;
}

.img-upload {
  margin: 0 auto;
  margin-top: 10px;
}

.warning {
  color: red;
  font-size: 0.800rem;
  letter-spacing: 2px;
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: 5px;
  margin-left: 17.5%;
}

.none {
  color: #ffffff;
  font-size: 0.800rem;
  letter-spacing: 2px;
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: 5px;
  margin-left: 17%;
}

.really-none {
  color: white;
  font-size: 0.800rem;
  letter-spacing: 2px;
  margin: 0 auto;
  margin-top: 8px;
  margin-left: 17%;
}

.code {
  display: flex;
  flex-direction: row;
  /*border: 1px solid red;*/
  margin-left: 17.5%;
}

.code-request {
  color: white;
  background-color: #4F6EF2;
  padding: 5px;
  border-radius: 2px;
  font-size: 0.800rem;
  letter-spacing: 2px;
  margin-right: 103px;
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

.upload_image {
  padding-top: 20px;
  /*border: 1px solid red;*/
  margin: 0 auto;
}
</style>
