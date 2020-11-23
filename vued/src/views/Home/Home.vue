<template>
  <!-- Home -->
  <div id="home">
    <m-header bgColor="#ffffff">
      <div slot="right">
        导航栏右部
      </div>
    </m-header>
    <!-- 主页面 -->
    <div class="logo">
      <img src="@/assets/image/logo.png" alt="" />
    </div>
    <search-advance @change-list="changeList" @change-time="changeTime" />
    <!-- 时间选择 -->
  </div>
</template>

<script>
import searchAdvance from "./childCpn/search-advance";
export default {
  name: "Home",
  data() {
    return {
      searchList: [],
      start: "",
      end: ""
    };
  },
  methods: {
    changeList(e) {
      this.searchList = e;
    },
    changeTime(e) {
      this.start = e.start;
      this.end = e.end;
    }
  },
  components: {
    searchAdvance
  }
};
</script>

<style scoped>
#home {
  background-color: #fff;
  min-height: 100vh;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.logo img {
  width: 114px;
}
</style>
