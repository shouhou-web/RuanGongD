<template>
  <div id="app">
    <m-header>
      <template v-slot:left>
        导航栏左部
      </template>
      <template v-slot:right>
        导航栏右部
      </template>
    </m-header>
    <router-view></router-view>
    <!-- 全局加载组件 -->
    <fullscrren-loading class="loading"></fullscrren-loading>
  </div>
</template>

<script>
import FullscrrenLoading from "components/common/fullscreen-loading/FullscreenLoading";
export default {
  name: "App",
  components: {
    FullscrrenLoading
  },
  created() {
    if (sessionStorage.getItem("user") != null) {
      // 获取本地临时存储
      this.$store.commit("login", JSON.parse(sessionStorage.getItem("user")));
    }
  }
};
</script>

<style>
@import "assets/css/base.css";
#app {
  min-height: 100vh;
}
</style>
