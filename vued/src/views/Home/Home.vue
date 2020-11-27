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
      <img src="@/assets/image/home/logo.png" alt="" />
    </div>
    <search-advance @change-list="changeList" @change-time="changeTime" :isShow="true"/>
    <div class="footer">
      <div class="item1"></div>
      <div class="item2"></div>
      <div class="item3"></div>
    </div>
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

.footer {
  display: flex;
  justify-content: space-between;
  width: var(--width-main);
  margin: 40px auto;
}

.item1,
.item2,
.item3 {
  background-color: #eee;
  width: 300px;
  height: 350px;
}
</style>
