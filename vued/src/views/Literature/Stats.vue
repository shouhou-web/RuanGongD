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

require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

export default {
  name: "Stats",
  data() {
    return {
      referTimes:[1,2,3,4,5,6,7,8,9,10,11,12],
      collectTimes:[1,2,3,4,5,6,7,8,9,10,11,12],
      readTimes:[1,2,3,4,5,6,7,8,9,10,11,12],
      commentTimes:[1,2,3,4,5,6,7,8,9,10,11,12],
      option: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          textStyle: {
            fontSize: 15,
          },
          data: ["被引数", "收藏数", "阅读数", "评论数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "二月",
            "二月",
            "二月",
            "二月",
            "二月",
            "二月",
            "二月",
            "二月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "被引数",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "收藏数",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "阅读数",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "评论数",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {},
  components: {
    "v-chart": ECharts,
  },
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
  width: 100%;
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
