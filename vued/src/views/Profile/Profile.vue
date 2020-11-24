<template>
  <!-- 个人信息界面 -->
  <div id="profile" class="profile">
    <m-header></m-header>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      // 用户信息
      userName: 'Yu Haomiao',
      userNickName: 'samshui',
      userDegree: 1,
      userIntroState: true,
      userIntro: "北航软件学院",
      userImgSrc: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2660483526,1880492462&fm=26&gp=0.jpg",

      // user收藏文献集合
      favorLiteratures: [],

      // user关注用户集合
      followUsers: []
    };
  },
  methods: {
    retUserDegree() {
      if (this.userDegree == 0) return "高中";
      else if (this.userDegree == 1) return "本科生";
      else if (this.userDegree == 2) return "研究生";
      else if (this.userDegree == 3) return "博士生";
      else if (this.userDegree == 4) return "博士后";
      else return "";
    },
  },
  components: {},
};
</script>

<style scoped>

</style>
