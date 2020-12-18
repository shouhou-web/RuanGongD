<template>
  <div id="authorcard" class="authorcard">
    <div class="auth-top">
      <div class="auth-title">相关研究者</div>
    </div>
    <div class="auth-bottom">
      <div class="auth-part1">
        <div class="auth-part1-left">
          <div class="auth-name">{{ author.realName }}</div>
          <!-- <div class="auth-work">{{author.work}}</div> -->
          <div class="auth-workunit">{{ author.organization }}</div>
        </div>
        <div class="auth-part1-right">
          <!-- <img src="../img/test.jpg" alt="" class="l-root-card--reporter-pic" /> -->
          <img
            :src="require('@/assets/image/literature/' + author.image + '.jpg')"
            alt=""
            class="l-root-card--reporter-pic"
            @click="toAuthor(author.authorID)"
          />
        </div>
      </div>
      <div class="auth-part2">
        <div class="introduction">
          <span class="intro">个人简介：</span>
          <span>{{ author.introduction }}</span>
        </div>
      </div>
      <div class="auth-part3">
        <l-button @click="follow(author.authorID)">关注</l-button>
        <l-button @click="toAuthor(author.authorID)">个人门户</l-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authorcard",
  props: {
    author: {
      authorID: "",
      realName: "",
      organization: "",
      image: "",
      introduction: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    toAuthor(authorID) {
      this.$router.push({
        path: "/profile",
        query: {
          userID: authorID,
        },
      });
    },
    follow(authorID) {
      console.log("test");
    },
  },

  components: {},
};
</script>

<style scoped>
.authorcard {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 325px;
  height: 350px;
  border: 1px solid #dddddd;
  margin-top: 20px;
  margin-right: 20px;
  background: white;
}
.authorcard .auth-top {
  height: 65px;
  width: 100%;
  border-bottom-color: #dddddd;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.authorcard .auth-title {
  font-size: 18px;
}

.auth-bottom {
  display: flex;
  flex-direction: column;
  width: 80%;
  align-self: center;
  align-items: center;
}

.authorcard .auth-part1 {
  display: flex;
  width: 100%;
  /* background: rgb(243, 230, 230); */
}

.authorcard .auth-part1-left {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 15px;
  margin-top: 10px;
  margin-left: 7px;
  /* background: #000; */
}

.authorcard .auth-name {
  padding-top: 12px;
  font-weight: 600;
}

.authorcard .auth-workunit {
  padding-bottom: 8px;
  color: #777;
}

.authorcard .auth-part1-right {
  align-self: flex-end;
}

.authorcard .auth-part2 {
  height: 126px;
  margin-top: 10px;
  font-size: 13px;
  letter-spacing: 0.5px;
  line-height: 16px;
  margin-right: 25px;
  text-align: justify;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  overflow: hidden;
}

.authorcard .auth-part3 {
  margin-top: 15px;
  margin-left: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.authorcard .auth-part3 .l-button {
  margin-right: 30px;
}

.l-root-card--reporter-pic {
  border-radius: 30px;
  border: 1px solid#4F6EF2;
  cursor: pointer;
  height: 60px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 5px;
  margin-top: 10px;
  transition: 0.2s;
  width: 60px;
}

.l-root-card--reporter-pic:hover {
  box-shadow: 0px 0px 1px 2px rgba(224, 37, 62, 0.219);
  transition: 0.2s;
}

.l-button {
  padding-left: 18px;
  padding-right: 18px;
}

.intro {
  font-size: 14px;
  font-weight: 550;
}
</style>
