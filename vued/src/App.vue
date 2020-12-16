<template>
  <div id="app">
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
    FullscrrenLoading,
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style>
@import "assets/css/base.css";
#app {
  min-height: 100vh;
}
</style>
