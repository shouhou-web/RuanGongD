<template>
  <!-- 文献详情页面 -->
  <div id="literature">
    <div class="left">
      <l-test>tests</l-test>
      <l-button>test</l-button>
    </div>
  </div>
</template>

<script>
import LTest from './childCpn/test.vue';
import Lefthead from './childCpn/lefthead.vue';

export default {
  name: "Literature",
  components: {
    LTest,
    Lefthead,
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
</style>
