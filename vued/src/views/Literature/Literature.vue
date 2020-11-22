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
import LTest from '@/views/Literature/Literature.vue';
import Lefthead from './Literature-cpn/lefthead.vue';

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
  components: {},
};
</script>

<style scoped>
</style>
