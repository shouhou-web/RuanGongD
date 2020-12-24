<template>
  <!-- 门户界面 -->
  <div id="intro" class="intro">
    <m-app-header></m-app-header>
    <div class="block-header">
      <div class="intro-profile">
        <div class="intro-profile-info">
          <div class="intro-headshot">
            <img :src="intro.image" class="headshot-img">
            <a class="headshot__hide" title="修改头像" @click="openChangeHeadshot" v-if="isSelfIntro">
              <img src="../../assets/image/edit.png" class="headshot__inner--samll">
            </a>
          </div>
          <div class="introName">
            <div class="introName-top">
              <div class="intro-name-header">
                <div class="edit-head">
                  <div class="user-name" v-if="isApplied">{{ intro.username }} <font class="intro-name">({{ intro.realName }})</font></div>
                  <div class="user-name" v-else>{{ intro.realName }}</div>
                  <img src="../../assets/icons/profile/edit.svg" class="profile-icon" @click="openChangeProfileHover" v-if="isSelfIntro && isApplied">
                  <img src="../../assets/icons/profile/report.svg" class="profile-icon" @click="openReportIntro" v-if="!isSelfIntro && isApplied">
                </div>
              </div>
            </div>
            <div class="intro-pos">{{ intro.organization }}</div>
            <div class="intro-pos">{{ intro.phoneNumber }}</div>
            <div class="intro-pos">{{ intro.emailAddress }}</div>
          </div>
          <div :class="{'publish': !isSelfIntro, 'publish-n': isSelfIntro}">
            <div v-if="isApplied && isSelfIntro" class="publish-button" @click="gotoPublish">发表文献</div>
            <div v-if="isApplied && !isSelfIntro && !isFollowing" class="publish-button" @click="followIntro">关注</div>
            <div v-if="isApplied && !isSelfIntro && isFollowing" class="publish-button-nice" @click="cancleFollowIntro">已关注</div>
            <div v-if="!isApplied" class="publish-button-apply" @click="applyIntro">申请认证当前门户</div>
            <div v-if="!isSelfIntro && isApplied" class="publish-button" @click="isSend = true" style="margin-top: 20px">私信</div>
            <create-consultation
              :display="isSend"
              :senderId="user.userID"
              :receiverId="intro.userID"
              @closeDialog="closeSend"></create-consultation>
          </div>
        </div>
        <div class="profile-op">
          <div class="op-switch">
            <div class="op-all" @click="opSwitch(0)">个人文献</div>
            <div class="op-all" @click="opSwitch(1)" v-if="isApplied">个人动态</div>
            <div class="op-all" @click="opSwitch(2)" v-if="isApplied">收藏文献</div>
          </div>
          <div :class="{ 'bar': opID == 0, 'bar-change-1': opID == 1, 'bar-change-2': opID == 2 }"></div>
        </div>
      </div>
    </div>
    <div class="intro-content">
      <div class="content-left">
        <manage :authorID="this.$route.query.authorID" v-if="opID == 0"></manage>
        <user-posts :userId="intro.userID" v-if="opID == 1 && isApplied"></user-posts>
        <favor :userID="intro.userID" v-if="opID == 2 && isApplied"></favor>
      </div>
      <div class="content-right">
        <div class="chart-part">
          <div class="chart-header">
            <div class="chart-type">line chart</div>
            <div class="chart-name">文献发布量统计</div>
          </div>
          <div class="oneChart-style" v-if="introLiteraturesPublishedData != null"><v-chart :options="lineChart"></v-chart></div>
          <div class="oneChart-style" v-if="introLiteraturesPublishedData == null"><img src="../../assets/image/no-data.png"></div>
        </div>
        <div class="followed">
          <div class="follow-part-head">follower ({{ followers.length }})</div>
          <div class="following-content" v-if="followers.length > 0">
            <div class="one-following" v-for="(onefollowingUser, i) in followers">
              <img :src="onefollowingUser.image" class="intro-img img-plus">
              <div class="following-info">
                <div class="name-style">{{ onefollowingUser.name }}</div>
                <div class="intro-style">{{ onefollowingUser.intro }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <m-hover ref="changeProfile" @submit="submitEdit" @cancel="cancel">
      <div class="edit">
        <div class="edit-header">
          <div :class="{'edit-button': editOp != 0, 'edit-button-chosen': editOp == 0}" @click="changeEditOp(0)">修改门户名</div>
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
      <el-main class="img-load">
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

    <m-hover ref="report" @submit="reportIntro" @cancel="cancel">
      <div class="report-body">
        <textarea class="report-text" placeholder="请输入举报理由" v-model="reportContents"></textarea>
      </div>
    </m-hover>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import MyLiteratures from "@/views/Profile/MyLiteratures";
import UserPosts from "@/views/Forum/childCpn/user-posts";
import create_literature from "@/views/Literature/childCpn/create_literature";
import Favor from "@/views/Profile/Favor";
import Manage from "@/views/Literature/Manage";
import {
  getIntroFollowStatus,
  getPublishState,
  getAuthorInformation,
  follow,
  editUserImage,
  editUserName,
  editUserEmailAddress,
  editProfile,
  emailVerification,
  editIntroRealName,
  reportGate
} from "@/network/profile";
import CreateConsultation from "@/views/Forum/childCpn/create-consultation";
import random from "string-random";
import { getToken } from "@/network/genToken";

require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default {
  name: "Intro",
  data() {
    return {
      user: {},
      intro: {},

      isSelfIntro: false,
      isFollowing: false,
      isApplied: false,

      opID: 0,

      // 关注我的用户集合
      followers: [],

      // 门户发布文献数据
      introLiteraturesPublishedData: [],

      lineChart: {
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value}' },
          axisPointer: { snap: true }
        },
        series: [
          {
            name: '发布量',
            type: 'line',
            smooth: true,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ]
      },

      isSend: false,

      uploadPath: "https://upload-z1.qiniup.com", // 七牛云华北
      imgPathPrefix: "http://qlotpwg5r.hb-bkt.clouddn.com/",
      hideUploadEdit: false, // 是否隐藏上传按钮
      postData: {
        token: "",
        key: ""
      },
      fileList: [],
      imagePath: "", // 图片链接

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

      reportContents: ""
    }
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
          console.log("img-res", res)
          if (res == 0) {
            this.$notify.success("头像修改成功")
            this.$store.commit("setImagePath", this.imagePath)
            this.intro.image = this.imagePath
          }
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
    opSwitch(opID) {
      this.opID = opID
    },
    gotoPublish() {
      this.$router.push(
        {
          path: "/publication",
          query: {
            authorID: this.intro.authorID
          }
      })
    },
    followIntro() {
      follow(this.$store.state.user.userID, this.intro.userID, 1)
      .then((res) => {
        if (res == -1) this.$notify.warning("关注失败，请重试")
        else {
          this.$notify.success("关注成功")
          this.isFollowing = true
        }
      })
      .catch((err) => {
        this.$notify.error( { title: "网络错误", message: "请稍后重试~" } )
      })
    },
    cancleFollowIntro() {
      follow(this.$route.query.userID, this.intro.authorID, 0)
      .then((res) => {
        if (res == -1) this.$notify.warning("取消关注失败，请重试")
        else {
          this.$notify.success("取消关注成功")
          this.isFollowing = false
        }
      })
      .catch((err) => {
        this.$notify.error( { title: "网络错误", message: "请稍后重试~" } )
      })
    },
    applyIntro() {
      this.$router.push(
        {
          path: "/applyIntro",
          query: {
            authorID: this.intro.authorID
          }
        })
    },
    closeSend() {
      this.isSend = false
    },
    openChangeHeadshot() {
      this.$refs.changeHeadshot.showHover({
        title: "修改头像",
        cancelBtn: "取消"
      });
    },
    openReportIntro() {
      this.$refs.report.showHover({
        title: "举报门户",
        submitBtn: "提交",
        cancelBtn: "取消"
      });
    },
    cancel() {},
    submitEdit() {
      // name
      if (this.editOp == 0) {
        editUserName(this.intro.userID, this.newNickName)
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
            editUserEmailAddress(this.intro.userID, this.newEmail)
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
        editProfile(this.intro.userID, this.intro.realName, this.newDegree, this.intro.image, this.intro.organization, this.newPhone)
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
    reportIntro() {
      if (this.reportContents.length < 50) {
        this.$notify.info("举报理由不得少于50字")
      } else {
        let authorID = this.$route.query.authorID
        let reporterID = this.$store.state.user.userID

        console.log("author:", authorID)
        console.log("reporter:", reporterID)

        if (authorID != null) {
          reportGate(reporterID, this.reportContents, authorID)
          .then((res) => {
            console.log(res)
            if (res == 0) this.$notify.success("举报成功")
            else this.$notify.warning("举报失败，请重试")
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
    changeEditOp(opID) {
      this.editOp = opID
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
    },
    openChangeProfileHover() {
      this.newDegree = this.intro.userDegree
      this.$refs.changeProfile.showHover({
        title: "修改个人资料",
        submitBtn: "提交",
        cancelBtn: "取消"
      });
    },
  },
  created() {
    this.postData.token = getToken();
    this.user = this.$store.state.user

    // 进入个人门户
    let authorID = this.$route.query.authorID
    let authorUserID = this.$route.query.userID
    let see = this.$route.query.see

    if (see == null) this.opID = 0
    else this.opID = see

    // 获取intro
    getAuthorInformation(authorID)
    .then((intro) => {
      console.log("intro: ", intro)
      this.intro = intro

      // 该门户是否被认领
      if (intro.userID == null) this.isApplied = false
      else this.isApplied = true
    })
    .catch((err) => {
      this.$notify.error(
        {
          title: "网络错误",
          message: "请稍后重试~"
        }
      )
    })

    // 判断当前门户状态
    getIntroFollowStatus(this.$store.state.user.userID, authorID)
    .then((res) => {
      if (res == 0) this.isSelfIntro = true
      else if (res == 1) this.isFollowing = true
      else if (res == 2) {
        this.isSelfIntro = false
        this.isFollowing = false
      }
      else if (res == -1) this.$notify.error("获取当前门户信息出错，请重试")
      else this.isApplied = false
    })
    .catch((err) => {
      this.$notify.error(
        {
          title: "网络错误",
          message: "请稍后重试~"
        }
      )
    })

    // 获取门户信息：文献发布量
    getPublishState(authorID)
    .then((publish) => {
      this.introLiteraturesPublishedData = publish
      this.lineChart.series[0].data = this.introLiteraturesPublishedData;
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
  computed:{
    authorIDIN() {
      return this.$route.query.authorID;
    }
  },
  watch: {
    authorIDIN(newVal) {
      this.postData.token = getToken();
      this.user = this.$store.state.user

      // 进入个人门户
      let authorID = this.$route.query.authorID
      let authorUserID = this.$route.query.userID
      let see = this.$route.query.see

      if (see == null) this.opID = 0
      else this.opID = see

      // 获取intro
      getAuthorInformation(authorID)
        .then((intro) => {
          console.log("intro: ", intro)
          this.intro = intro

          // 该门户是否被认领
          if (intro.userID == null) this.isApplied = false
          else this.isApplied = true
        })
        .catch((err) => {
          this.$notify.error(
            {
              title: "网络错误",
              message: "请稍后重试~"
            }
          )
        })

      // 判断当前门户状态
      getIntroFollowStatus(this.$store.state.user.userID, authorID)
        .then((res) => {
          if (res == 0) this.isSelfIntro = true
          else if (res == 1) this.isFollowing = true
          else if (res == 2) {
            this.isSelfIntro = false
            this.isFollowing = false
          }
          else if (res == -1) this.$notify.error("获取当前门户信息出错，请重试")
          else this.isApplied = false
        })
        .catch((err) => {
          this.$notify.error(
            {
              title: "网络错误",
              message: "请稍后重试~"
            }
          )
        })

      // 获取门户信息：文献发布量
      getPublishState(authorID)
        .then((publish) => {
          this.introLiteraturesPublishedData = publish
          this.lineChart.series[0].data = this.introLiteraturesPublishedData;
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
  },
  components: {
    CreateConsultation,
    Favor,
    create_literature,
    UserPosts,
    'v-chart': ECharts,
    'myLiteratures': MyLiteratures,
    'user-posts': UserPosts,
    'favor': Favor,
    'manage': Manage
  },
};
</script>

<style scoped>
.intro {
}

.block-header {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  height: 193px;
  background-color: white;
  width: 100%;
}

.intro-profile {
  width: var(--width-main);
  height: 100%;
  /*border: 1px solid black;*/
  margin: 0 auto;
}

.intro-profile-info {
  width: 100%;
  height: 145px;
  /*border: 1px solid yellow;*/

  display: flex;
  flex-direction: row;
}

.intro-headshot {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-top: 15px;
}

.headshot-img {
  margin: 0 auto;
    width: 170%;
    left: -35%;
    border: 1px solid #dddddd;
    position: absolute;
}

.introName {
  width: 665px;
  height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
}

.introName-top {
  display: flex;
  flex-direction: row;
}

.intro-name-header {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.edit-head {
  display: flex;
  flex-direction: row;
}

.user-name {
  /* margin-left: 12px;
  margin-top: 40px;
  margin-bottom: 5px; */
}

.intro-name {
  line-height: 1.2;
  color: #888888;
  font-size: 0.8rem;
}

.intro-pos {
  max-width: fit-content;
  margin-top: 7px;
  line-height: 1.2;
  color: #555;
  font-size: 0.875rem;
  cursor: pointer;
}

.publish {
  width: calc(100% - 130px - 665px);
  height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.publish-n {
  width: calc(100% - 130px - 665px);
  height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  align-items: center;
}

.publish-button {
  margin: 0 auto;
  padding: 10px;
  width: 70%;
  /*border: 1px solid black;*/
  border-radius: 2px;
  text-align: center;
  background-color: #4F6EF2;
  color: white;
  font-size: 0.800rem;
  letter-spacing: 2px;
  border: 1px solid #4F6EF2;
  transition: ease-in-out 0.3s;
}

.publish-button:hover {
  color: #4F6EF2;
  background-color: white;
  border: 1px solid #4F6EF2;
  cursor: pointer;
  transition: ease-in-out 0.3s;
}

.publish-button-nice {
  margin: 0 auto;
  padding: 10px;
  width: 70%;
  /*border: 1px solid black;*/
  border-radius: 2px;
  text-align: center;
  background-color: white;
  color: #4F6EF2;
  border: 1px solid #4F6EF2;
  font-size: 0.800rem;
  letter-spacing: 2px;
  transition: ease-in-out 0.3s;
}

.publish-button-nice:hover {
  border: 1px solid red;
  color: red;
  cursor: pointer;
  transition: ease-in-out 0.3s;
}

.publish-button-apply {
  margin: 0 auto;
  padding: 10px;
  width: 70%;
  /*border: 1px solid black;*/
  border-radius: 2px;
  text-align: center;
  background-color: #96bf47;
  color: white;
  border: 1px solid #96bf47;
  font-size: 0.800rem;
  letter-spacing: 2px;
  transition: ease-in-out 0.3s;
}

.publish-button-apply:hover {
  border: 1px solid #96bf47;
  color: #96bf47;
  background-color: white;
  transition: ease-in-out 0.3s;
  cursor: pointer;
}

.op-switch {
  display: flex;
  flex-direction: row;
}

.op-all {
  margin-top: 20px;
  font-size: 0.8rem;
  margin-left: 20px;
  margin-right: 20px;
}

.op-all:hover {
  cursor: pointer;
}

.bar {
  background-color: #4F6EF2;
  border-radius: 2px;
  height: 2px;
  width: 50px;
  margin-top: 10px;
  margin-left: 20px;
  transition: ease-in-out 0.3s;
}

.bar-change-1 {
  background-color: #4F6EF2;
  border-radius: 2px;
  height: 2px;
  width: 50px;
  margin-top: 10px;
  margin-left: 110px;
  transition: ease-in-out 0.3s;
}

.bar-change-2 {
  background-color: #4F6EF2;
  border-radius: 2px;
  height: 2px;
  width: 50px;
  margin-top: 10px;
  margin-left: 202px;
  transition: ease-in-out 0.3s;
}

.oneChart-style {
  width: 280px;
  height: 280px;
  margin-left: 10%;
}

.intro-content {
  margin: 0 auto;
  margin-top: 30px;
  width: var(--width-main);
  /*margin: 0 auto;*/
  height: 100%;
  display: flex;
  flex-direction: row;
}

.content-left {
  width: 65%;
  height: 100%;
  /*border: 1px solid #ddd;*/
  /*background-color: white;*/
  display: flex;
  flex-direction: column;
}

.chart-part {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  border: 1px solid #ddd;
  background-color: white;
  margin-bottom: 20px;
}

.followed {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  border: 1px solid #ddd;
  background-color: white;
  margin-bottom: 20px;
}


.follow-part-head {
  width: 100%;
  height: 54px;
  /*border: 1px solid red;*/
  font-size: 0.7rem;
  padding: 5%;
  color: #777777;
}

.following-content {
  border-top: 1px solid #ddd;
  padding-top: 10px;
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

.intro-style:hover {
  cursor: pointer;
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

.content-right {
  display: flex;
  flex-direction: column;
  margin-left: 3%;
  width: 32%;
  height: 100%;
}

.chart-header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  padding-left: 20px;
  align-items: center;
}

.chart-type {
  font-size: 0.8rem;
  color: #8a8a8a;
  margin-bottom: 5px;
}

.chart-name {
  border-radius: 3px;
  background-color: #4F6EF2;
  width: fit-content;
  height: fit-content;
  padding: 5px;
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  margin-left: 45%;
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
  transition: ease-in-out 0.3s;
}

.intro-headshot:hover .headshot__hide {
  opacity: 1;
  cursor: pointer;
  transition: ease-in-out 0.3s;
}

.headshot__inner--samll {
  border-radius: 50%;
  height: 40%;
  width: 40%;
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
  /* margin-left: 20px;
  margin-top: 30px; */
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

select {
  outline: none;
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

.img-load {
  margin-left: 60px;
}

.report-body {
  margin-top: 10px;
}

.report-text {
  width: 100%;
  height: 100px;
}

textarea {
  padding: 5px;
  border: 1px solid #dddddd;
  resize: none;
  outline: none;
}
</style>
