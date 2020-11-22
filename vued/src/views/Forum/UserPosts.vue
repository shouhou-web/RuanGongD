<template>
  <!-- 一个用户的所有动态 -->
  <div id="UserPosts">
    <div class="tempdisplay">
      <create-post></create-post>
      <!-- 先暂时放这 -->
    </div>
  </div>
</template>

<script>
import CreatePost from "./childCpn/create-post.vue";
export default {
  name: "UserPosts",
  data() {
    return {};
  },
  methods: {},
  components: { CreatePost },
};
</script>

<style scoped>
.tempdisplay {
  display: flex;
  justify-content: center;
  margin: 40px auto;
  width: 80%;
}
</style>
