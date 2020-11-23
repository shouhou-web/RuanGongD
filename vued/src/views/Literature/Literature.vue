<template>
  <!-- 文献详情页面 -->
  <div id="literature">
    <l-leftmenu class="leftmenu">

    </l-leftmenu>
    <div class="main">
      ???
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script>
import LTest from './childCpn/test.vue';
import LLeftmenu from './childCpn/leftmenu.vue';

export default {
  name: "Literature",
  components: {
    LTest,
    LLeftmenu,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>
#literature{
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  margin-top: 20px;
}
.leftmenu{
  position: absolute;
}
.main{
  width: 800px;
  height: 600px;
  background: #c7ecee;
  margin-left: 200px;
}
.right{
  width: 300px;
  height: 600px;
  background: #c7ecee;
  margin-left: 80px;
}
</style>
