<template>
  <!-- 门户界面 -->
  <div id="intro" class="intro">
    <m-header></m-header>
    <div class="intro-header">
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
            <div class="publish-button">邀请同事加入门户</div>
          </div>
        </div>
        <div class="profile-op">
          <div class="op-all">about</div>
          <div class="bar"></div>
        </div>
      </div>
    </div>
    <div class="intro-content">
      <div class="content-left">
        <div class="members">
          <div class="member-header">
            <div>all members (100)</div>
            <div class="look-all">
              <div>look all</div>
              <img src="../../assets/icons/profile/look.svg" class="profile-icon">
            </div>
          </div>
          <div class="imgs">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg" class="member-img">
            <img src="../../assets/icons/profile/more.svg" class="more-icon">
          </div>
        </div>
        <div class="literatures">
          <div class="one-follow-literature">
            <div class="title">{{ onefollowingLiterature.title }}</div>
            <div class="tags">
              <div class="tag" v-for="(a_tag, i) in onefollowingLiterature.tags">
                <div :class="{'first-tag': i==0, 'leftpart-tags': i != 0}">{{a_tag}}</div>
              </div>
            </div>
            <div class="authors">
              <div v-for="(name, i) in onefollowingLiterature.authors" class="author-list">
                <img :src="userImgSrc" class="authorImg">
                <div class="authorname">{{name}}</div>
              </div>
            </div>
            <div class="read-time">
              <div class="read-time-content">
                {{onefollowingLiterature.read_time}} Reads
              </div>
            </div>
            <div class="literature-ops">
              <div class="one-op"></div>
            </div>
          </div>
          <div class="one-follow-literature">
            <div class="title">{{ onefollowingLiterature.title }}</div>
            <div class="tags">
              <div class="tag" v-for="(a_tag, i) in onefollowingLiterature.tags">
                <div :class="{'first-tag': i==0, 'leftpart-tags': i != 0}">{{a_tag}}</div>
              </div>
            </div>
            <div class="authors">
              <div v-for="(name, i) in onefollowingLiterature.authors" class="author-list">
                <img :src="userImgSrc" class="authorImg">
                <div class="authorname">{{name}}</div>
              </div>
            </div>
            <div class="read-time">
              <div class="read-time-content">
                {{onefollowingLiterature.read_time}} Reads
              </div>
            </div>
            <div class="literature-ops">
              <div class="one-op"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="chart-part">
          <div class="chart-header">
            <div class="chart-type">line chart</div>
            <div class="chart-name">门户文献发布量统计</div>
          </div>
          <div class="oneChart-style"><v-chart :options="lineChart"></v-chart></div>
        </div>
        <div class="chart-part">
          <div class="chart-header">
            <div class="chart-type">pie chart</div>
            <div class="chart-name">门户文献tag统计</div>
          </div>
          <div class="oneChart-style"><v-chart :options="pieChart"></v-chart></div>
        </div>
        <div class="chart-part">
          <div class="chart-header">
            <div class="chart-type">bar chart</div>
            <div class="chart-name">门户活跃用户统计</div>
          </div>
          <div class="oneChart-style"><v-chart :options="barChart"></v-chart></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'

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
      introImgSrc: "https://i1.rgstatic.net/ii/institution.image/AS%3A267456919080961%401440778106588_l",
      introPos: "Beijing China",
      userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
      lineChart: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [{
            lte: 6,
            color: 'green'
          }, {
            gt: 6,
            lte: 8,
            color: 'red'
          }, {
            gt: 8,
            lte: 14,
            color: 'green'
          }, {
            gt: 14,
            lte: 17,
            color: 'red'
          }, {
            gt: 17,
            color: 'green'
          }]
        },
        series: [
          {
            name: '发布量',
            type: 'line',
            smooth: true,
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
          }
        ]
      },
      pieChart: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: 'TAG',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      },
      barChart: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: ['mgg', 'Tue', 'Tony', 'Thu', 'samshui', 'Sat', 'who']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      },
      onefollowingLiterature: {
        title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
        authors: ["Ma Hanyuan"],
        tags: ["tag 1", "tag 2"],
        read_time: 10,
      }
    }
  },
  methods: {},
  components: {
    'v-chart': ECharts
  },
};
</script>

<style scoped>
.intro {
  font-family: Consolas;
}

.intro-header {
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
  line-height: 1,2;
  color: #111;
  font-size: 1.375rem;
}

.intro-pos {
  max-width: fit-content;
  margin-left: 2%;
  margin-top: 1%;
  line-height: 1,2;
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

.op-all {
  margin-top: 20px;
  font-size: 0.8rem;
  margin-left: 30px;
}

.bar {
  background-color: #4F6EF2;
  border-radius: 2px;
  height: 2px;
  width: 50px;
  margin-top: 10px;
  margin-left: 20px;
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
  margin-left: 40%;
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
  margin-top: 20px;
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
</style>
