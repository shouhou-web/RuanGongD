<template>
  <!-- 门户界面 -->
  <div id="intro" class="intro">
    <m-app-header></m-app-header>
    <div class="block-header">
      <div class="intro-profile">
        <div class="intro-profile-info">
          <div class="intro-headshot">
            <img :src="introImgSrc" class="headshot-img">
          </div>
          <div class="introName">
            <div class="intro-name">{{ introName }}</div>
            <div class="intro-pos">
              {{ introPos }}
            </div>
          </div>
          <div class="publish">
<!--            <div class="publish-button" @click="">发表文献</div>-->
            <create_literature></create_literature>
          </div>
        </div>
        <div class="profile-op">
          <div class="op-switch">
            <div class="op-all" @click="opSwitch(0)">个人文献</div>
            <div class="op-all" @click="opSwitch(1)">个人动态</div>
          </div>
          <div :class="{ 'bar': opID == 0, 'bar-change': opID == 1 }"></div>
        </div>
      </div>
    </div>
    <div class="intro-content">
      <div class="content-left">
        <my-literatures :userID="userID" v-if="opID == 0"></my-literatures>
        <user-posts :userId="userID" v-if="opID == 1"></user-posts>
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
        <div class="chart-part">
          <div class="chart-header">
            <div class="chart-type">pie chart</div>
            <div class="chart-name">文献tag统计</div>
          </div>
          <div class="oneChart-style" v-if="introLiteraturesTopTags != null"><v-chart :options="pieChart"></v-chart></div>
          <div class="oneChart-style" v-if="introLiteraturesTopTags == null"><img src="../../assets/image/no-data.png"></div>
        </div>
        <div class="followed">
          <div class="follow-part-head">follower (2)</div>
          <div class="following-content">
            <div class="one-following" v-for="(onefollowingUser, i) in followers">
              <img :src="onefollowingUser.imgSrc" class="intro-img img-plus">
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
import Create_literature from "@/views/Literature/childCpn/create_literature";

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
      introName: "猫猫头科研院",
      introPublish: 100,
      introMemberNum: 20,
      introImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
      introPos: "Bei jing China",

      userName: 'Ma Zhengchang',
      userDegree: 1,
      userID: '0',
      userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",

      followStatue: false,

      opID: 0,

      // 关注我的用户集合
      followers: [
        {
          followerID: 1,
          imgSrc: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3824999008,143707972&fm=26&gp=0.jpg",
          name: "Ma Hanyuan",
          intro: "Beihang University (BUAA)",
          isfollowed: true
        },
        {
          followerID: 2,
          imgSrc: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3824999008,143707972&fm=26&gp=0.jpg",
          name: "Ma Hanyuan",
          intro: "Beihang University (BUAA)",
          isfollowed: false
        },
      ],

      introLiteraturesPublishedData: [100, 200, 500, 100],
      introLiteraturesTopTags: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 15, name: '搜索引擎1'},
        {value: 153, name: '搜索引擎2'},
        {value: 122, name: '搜索引擎3'}
      ],
      introWorkInfo: {
        members: ['mgg', 'Tony', 'samshui', '1', '2', '3'],
        publishCount: [100, 200, 150, 1, 2, 200]
      },

      lineChart: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'cross'}
        },
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
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390],
          },
        ]
      },
      pieChart: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '相关标签',
            type: 'pie',
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '25',
                fontWeight: 'bold',
                fontFamily: 'SimSun',
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      },

      onefollowingLiterature: {
        title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
        authors: ["Ma Hanyuan"],
        tags: ["tag 1", "tag 2"],
        read_time: 10,
      }
    }
  },
  methods: {
    openAllMemberList() {
      this.$refs.allMember.showHover({
        title: "所有用户",
        submitBtn: null,
        cancelBtn: null
      })
    },
    retUserDegree(userDegree) {
      if (userDegree == 0) return "高中";
      else if (userDegree == 1) return "Bachelor of Engineering";
      else if (userDegree == 2) return "研究生";
      else if (userDegree == 3) return "博士生";
      else if (userDegree == 4) return "博士后";
      else return "";
    },
    cancleFollow() {
      this.$notify.info("已取消关注")
    },
    doFollow() {
      this.$notify.success("关注成功")
    },
    opSwitch(opID) {
      this.opID = opID
    }
  },
  created() {
    this.lineChart.series[0].data = this.introLiteraturesPublishedData;
    this.pieChart.series[0].data = this.introLiteraturesTopTags;
    this.barChart.xAxis.data = this.introWorkInfo.members;
    this.barChart.series[0].data = this.introWorkInfo.publishCount;

    // 进入个人门户
    let userID = this.$route.query.userID

  },
  components: {
    Create_literature,
    UserPosts,
    'v-chart': ECharts,
    'myLiteratures': MyLiteratures,
    'user-posts': UserPosts
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
}

.publish-button:hover {
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

.bar-change {
  background-color: #4F6EF2;
  border-radius: 2px;
  height: 2px;
  width: 50px;
  margin-top: 10px;
  margin-left: 110px;
  transition: ease-in-out 0.3s;
}

.oneChart-style {
  width: 280px;
  height: 280px;
  margin-left: 10%;
}

.profile-icon {
  width: 15px;
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

.members {
  width: 100%;
  height: auto;
  background-color: white;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
}

.member-header {
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 100%;
  border-bottom: 1px solid #dddddd;
  height: 30px;
  font-size: 0.8rem;
  color: #777777;
}

.member-img {
  width: 40px;
  border-radius: 50%;
  margin: 5px;
}

.imgs {
  padding-left: 8px;
}

.more-icon {
  width: 20px;
  border-radius: 50%;
  margin-bottom: 13px;
  margin-left: 13px;
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

.profile-icon {
  width: 15px;
}

.look-all {
  color: black;
  margin-left: 70%;
  display: flex;
  flex-direction: row;
}

.look-all:hover {
  cursor: pointer;
  border-bottom: 1px solid black;
}

.one-follow-literature {
  width: 100%;
  height: 170px;
  border: 1px solid #dddddd;
  background-color: white;
  padding: 30px 25px 27px 25px;
  margin-bottom: 20px;
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
  border-bottom: 1px solid black;
}

.tags {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
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
  border-bottom: 1px solid #000000;
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

.all-members-list-outter {
  margin: 0 auto;
  width: 400px;
  height: auto;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  max-height: 500px;
  overflow: auto;
}

.one-member {
  border: 1px solid #dddddd;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.one-member-headshot {
  margin-left: 5px;
  width: 60px;
  height: 60px;
  padding-top: 4px;
}

.member-headshot-style {
  width: 100%;
  border-radius: 50%;
  margin: 0 auto;
}

.one-member-info {
  width: 50%;
  max-width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 5%;
  padding-left: 2%;
}

.member-name {
  margin-left: 10px;
  width: 170px;
  height: fit-content;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 5px;
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.member-name:hover {
  cursor: pointer;
  width: fit-content;
  border-bottom: 1px solid black;
}

.member-degree {
  margin-left: 10px;
  width: 170px;
  height: fit-content;
  font-size: 0.7rem;
  color: #777777;
}

.one-member-follow-statue {
  padding-top: 26px;
  text-align: center;
  width: calc(97% - 170px - 60px);
  font-size: 0.7rem;
}

.one-member-follow-statue:hover {
  cursor: pointer;
}

.red-font {
  color: red;
}

.black-font {
  color: black;
}
</style>
