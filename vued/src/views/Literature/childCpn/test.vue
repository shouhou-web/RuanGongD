<template>
  <!-- 空白组件 -->
  <div id="blank">
    <el-popover
  placement="right"

  trigger="hover">
  <el-table :data="gridData">
    <el-table-column width="150" property="date" label="日期"></el-table-column>
    <el-table-column width="100" property="name" label="姓名"></el-table-column>
    <el-table-column width="300" property="address" label="地址"></el-table-column>
  </el-table>
  <el-link href="?" target="_blank" slot="reference">???</el-link>
</el-popover>

  </div>
</template>

<script>
export default {
  name: "Blank",
  props: {
    gotoAuthor: {
      authorID:"",
      realName:"",
      image:"",
      organization:"",
      introduction:"",
    },
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
#blank{
  display: inline;
}
</style>
