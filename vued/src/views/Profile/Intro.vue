<template>
  <!-- 门户界面 -->
  <div id="intro">
    <div class="intro-style">
      <div class="introName-style">{{ introName }}</div>
      <div class="introTag-style">
        <div class="introTag">{{ introPublish }}</div>
        <div class="introTag">{{ introMemberNum }}</div>
      </div>
    </div>
    <div class="chartTypeChoose-style">
      <div class="chartChooseButton-style">门户文献发布统计</div>
      <div class="chartChooseButton-style">门户文献tag云图</div>
      <div class="chartChooseButton-style">门户人员活跃度</div>
    </div>
    <div id="charts" class="charts-style">
      <div class="oneChart-style"><v-chart :options="lineChart"></v-chart></div>
      <div class="oneChart-style"><v-chart :options="pieChart"></v-chart></div>
      <div class="oneChart-style"><v-chart :options="barChart"></v-chart></div>
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
      lineChart: {
        title: {
          text: '文献发表量',
          subtext: '猫猫头科研院',
          left: 'center'
        },
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
        title: {
          text: '文献TAG统计',
          subtext: '猫猫头科研院',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 0,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
        title: {
          text: '门户人员活跃度',
          subtext: '猫猫头科研院',
          left: 'center'
        },
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
.chartTypeChoose-style {
  display: flex;
  flex-direction: row;
  background-color: white;
}

.chartChooseButton-style {
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
}

.charts-style {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.oneChart-style {
  margin: 100px;
  width: 300px;
  height: 300px;
}

.intro-style {
  width: 100vw;
  height: 150px;
  /*border: 1px solid red;*/
}

.introName-style {
  font-size: 2vw;
}

.introTag-style {
  display: flex;
  flex-direction: row;
}

.introTag {
  background-color: #e0e0e0;
  max-width: fit-content;
  min-width: fit-content;
  padding: 3px;
  margin-right: 20px;
}
</style>
