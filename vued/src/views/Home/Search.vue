<template>
  <!-- 检索结果 -->
  <div id="search">
    <m-header bgColor="#fff"></m-header>
    <search-advance :initSearch="$route.query"/>
  </div>
</template>

<script>
import searchAdvance from "./childCpn/search-advance";
export default {
  name: "Search",
  data() {
    return {};
  },
  created(){
    console.log(this.$route.query)
  },
  methods: {},
  components: {
    searchAdvance
  },
};
</script>

<style scoped>

</style>
