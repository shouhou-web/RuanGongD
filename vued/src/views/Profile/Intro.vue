<template>
  <!-- 门户界面 -->
  <div id="intro" class="intro">
    <m-app-header></m-app-header>
    <div class="block-header">
      <div class="intro-profile">
        <div class="intro-profile-info">
          <div class="intro-headshot">
            <img :src="intro.image" class="headshot-img">
          </div>
          <div class="introName">
            <div class="intro-name">{{ intro.realName }}</div>
            <div class="intro-pos">
              {{ intro.organization }}
            </div>
          </div>
          <div class="publish">
            <create_literature v-if="isApplied && isSelfIntro"></create_literature>
            <div v-if="isApplied && !isSelfIntro && !isFollowing" class="publish-button">关注</div>
            <div v-if="isApplied && !isSelfIntro && isFollowing" class="publish-button-nice" @click="cancleFollowIntro">已关注</div>
            <div v-if="!isApplied" class="publish-button-apply" @click="applyIntro">申请认证当前门户</div>
          </div>
        </div>
        <div class="profile-op">
          <div class="op-switch">
            <div class="op-all" @click="opSwitch(0)">个人文献</div>
            <div class="op-all" @click="opSwitch(1)">个人动态</div>
            <div class="op-all" @click="opSwitch(2)" v-if="isSelfIntro">收藏文献</div>
          </div>
          <div :class="{ 'bar': opID == 0, 'bar-change-1': opID == 1, 'bar-change-2': opID == 2 }"></div>
        </div>
      </div>
    </div>
    <div class="intro-content">
      <div class="content-left">
<!--        <my-literatures :userID="intro.userID" v-if="opID == 0"></my-literatures>-->
        <manage :userID="intro.userID"></manage>
        <user-posts :userId="intro.userID" v-if="opID == 1"></user-posts>
        <favor :userID="intro.userID" v-if="opID == 2"></favor>
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
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import MyLiteratures from "@/views/Profile/MyLiteratures";
import UserPosts from "@/views/Forum/childCpn/user-posts";
import create_literature from "@/views/Literature/childCpn/create_literature";
import Favor from "@/views/Profile/Favor";
import Manage from "@/views/Literature/Manage";
import { getIntroFollowStatus, getPublishState, getAuthorInformation, follow } from "@/network/profile";

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
      intro: {
        // authorID:"",
        // realName:"",
        // organization:"",
        // userID:"",
        // image:"",
        // introduction:"",
      },

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
    }
  },
  methods: {
    opSwitch(opID) {
      this.opID = opID
    },
    cancleFollowIntro() {
      follow(this.$route.query.userID, this.intro.authorID, 0)
      .then((res) => {
        if (res == -1) this.$notify.warning("取消关注失败，请重试")
        else this.$notify.success("取消关注成功")
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
            userID: this.$route.query.userID,
            authorID: this.intro.authorID
          }
        })
    }
  },
  created() {
    // 进入个人门户
    let authorID = this.$route.query.authorID
    let userID = this.$route.query.userID

    // 获取intro
    getAuthorInformation(authorID)
    .then((intro) => {
      this.intro = intro

      // 该门户是否被认领
      if (intro.userID = null) this.isApplied = false
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
    getIntroFollowStatus(userID, authorID)
    .then((res) => {
      if (res == 0) this.isSelfIntro = true
      else if (res == 1) this.isFollowing = true
      else if (res == 2) {
        this.isSelfIntro = false
        this.isFollowing = false
      }
      else if (res == -1) this.$notify.error("获取当前门户信息出错，请重试")
      else this.$notify.error("出现其他异常，请联系管理人员")
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
  components: {
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
  font-family: Consolas;
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
  width: 130px;
  height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  align-items: center;
}

.headshot-img {
  margin: 0 auto;
  border-radius: 50%;
  max-width: 80%;
}

.introName {
  width: 665px;
  height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  flex-direction: column;
}

.intro-name {
  margin-left: 2%;
  margin-top: 7%;
  line-height: 1.2;
  color: #111;
  font-size: 1.375rem;
}

.intro-pos {
  max-width: fit-content;
  margin-left: 2%;
  margin-top: 1%;
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
</style>
