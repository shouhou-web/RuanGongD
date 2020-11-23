<template>
  <div id="leftmenu" @mouseenter="over()" @mouseleave="leave()">
    <div class="list-item">
      <i class="el-icon-eleme"></i>
      <a v-if="dis" href="www.baidu.com">导航啦</a>
    </div>
    <div class="list-item">
      <i class="el-icon-eleme"></i>
      <a v-if="dis" href="www.baidu.com">导航啦</a>
    </div>
    <div class="list-item">
      <i class="el-icon-eleme"></i>
      <a v-if="dis" href="www.baidu.com">导航啦</a>
    </div>
    <div class="list-item">
      <i class="el-icon-eleme"></i>
      <a v-if="dis" href="www.baidu.com">导航啦</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "leftmenu",
  data() {
    return {
      dis: false,
      timer: ""
    };
  },
  methods: {
    over() {
      clearTimeout(this.timer); //清除延迟执行
      this.timer = setTimeout(() => {
        //设置延迟执行
        this.dis = true;
      }, 100);
    },
    leave() {
      this.dis = false;
    },
  },
  components: {},
};
</script>

<style scoped>
#leftmenu{
  width: 40px;
		height: 600px;
		transition: width 0.3s;
		background: #c7ecee;
}
#leftmenu:hover{
  width: 120px;
}
.list-item{
  display: flex;
  flex-direction: row;
  align-content: center;
  margin-top: 30px;
  font-size: 18px;
  height: 18px;
}

.list-item > a {
  font-size:16px;
  margin-left: 5px;
}
</style>
