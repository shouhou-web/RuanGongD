<template>
  <!-- 发布文献 -->
  <div id="publication">
    <CreateLiterature></CreateLiterature>
  </div>
</template>

<script>
  import CreateLiterature from "./childCpn/create_literature";
export default {
  name: "Publication",
  data() {
    return {};
  },
  methods: {},
  components: { CreateLiterature },
};
</script>

<style scoped></style>
