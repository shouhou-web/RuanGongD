<template>
  <!-- 论坛主界面 -->
  <div id="forumHome"></div>
</template>

<script>
export default {
  name: "ForumHome",
  data() {
    return {
      sectors: [
        {
          sectorId: "01",
          sectorName: "测试分区",
          postNum: "1022",
          userId: "01",
          userAvatar: "https://imgchr.com/i/D8l2Oe",
          userName: "测试用户",
          postId: "01",
          postName: "测试动态",
          editTime: "MM月dd日 HH:mm"
        }
      ]
    };
  },
  methods: {},
  components: {}
};
</script>

<style scoped></style>
