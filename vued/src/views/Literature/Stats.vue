<template>
  <div id="Stats">
    <div class="charts">
      <v-chart :options="option"></v-chart>
    </div>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import VeLine from "v-charts/lib/line.common";
import { getStats } from "network/literature";

require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

export default {
  name: "Stats",
  props: {
    literature: Object
  },
  created() {
    getStats(this.literature.literatureID).then(res => {
      this.option.series[0].data = res.collectTimes;
      this.option.series[1].data = res.commentTimes;
    });
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          textStyle: {
            fontSize: 15
          },
          data: ["收藏数", "评论数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "收藏数",
            type: "line",
            // stack: "总量",
            data: []
          },
          {
            name: "评论数",
            type: "line",
            // stack: "总量",
            data: []
          }
        ]
      }
    };
  },

  mounted() {},
  methods: {},
  components: {
    "v-chart": ECharts
  }
};
</script>

<style scoped>
#Stats {
  width: 1100px;
  margin: auto;
  display: flex;
}
.charts {
  background: white;
  border: 1px #ddd solid;
  width:90%;
  height: 400px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 25px 40px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
