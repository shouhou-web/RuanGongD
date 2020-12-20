<template>
  <div id="authercard" class="authercard">
    <div class="auth-top">
      <div class="auth-title">相关研究者</div>
    </div>
    <div class="auth-bottom">
      <div class="auth-part1">
        <div class="auth-part1-left">
          <div class="auth-name">{{author.realName}}</div>
          <div class="auth-work">{{author.work}}</div>
          <div class="auth-workunit">{{author.organization}}</div>
        </div>
        <div class="auth-part1-right">
          <!-- <img src="../img/test.jpg" alt="" class="l-root-card--reporter-pic" /> -->
          <img :src="require('@/assets/image/literature/' + author.image+ '.jpg')" alt="" class="l-root-card--reporter-pic" />
        </div>
      </div>
      <div class="auth-part2">
        个人简介：{{author.introduction}}
      </div>
      <div class="auth-part3">
        <l-button>关注</l-button>
        <l-button>个人门户</l-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authercard",
  props:{
    author: {
      authorID:"",
      realName:"",
      work:"",
      organization:"",
      image:"",
      introduction:"",
    }
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.authercard {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 325px;
  height: 350px;
  border: 1px solid #95a5a6;
  margin-top: 20px;
  margin-right: 20px;
  background: white;
}
.authercard .auth-top {
  height: 65px;
  width: 100%;
  border-bottom-color: black;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.authercard .auth-title {
  font-size: 18px;
}

.auth-bottom {
  display: flex;
  flex-direction: column;
  width: 80%;
  align-self: center;
  align-items: center;
}

.authercard .auth-part1 {
  display: flex;
  width: 100%;
  /* background: rgb(243, 230, 230); */
}

.authercard .auth-part1-left {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 15px;
  margin-top: 10px;
  margin-left: 7px;
  /* background: #000; */
}

.authercard .auth-name {
  font-weight: 600;
}

.authercard .auth-work {
  color: #777;
}

.authercard .auth-workunit {
  color: #777;
}

.authercard .auth-part1-right {
  align-self: flex-end;
}

.authercard .auth-part2 {
  margin-top: 10px;
  font-size: 13px;
  letter-spacing:0.5px;
  line-height: 16px;
  margin-right: 25px;
  text-align: justify;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  overflow: hidden;
}

.authercard .auth-part3 {
  margin-top: 15px;
  margin-left: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.authercard .auth-part3 .l-button {
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

.l-button{
  padding-left: 18px;
  padding-right: 18px;
}
</style>
