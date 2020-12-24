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
            :src="author.image"
            alt=""
            class="l-root-card--reporter-pic"
            @click="toAuthor(authorID)"
          />
        </div>
      </div>
      <div class="auth-part2">
        <div class="introduction" v-if="this.author.introduction != 0">
          <span class="intro">个人简介：</span>
          <span>{{ author.introduction }}</span>
        </div>
        <!-- 没有个人简介的情况 -->
        <div class="introduction" v-if="this.author.introduction.length == 0">
          <span class="intro">暂无个人简介</span>
        </div>
      </div>
      <div class="auth-part3" >
        <l-button @click="followAuthor(author.userID)" v-if="!isFollowed" :disabled="isFollowed == null" class="follow1">
          关注
        </l-button>
        <l-button
          @click="followAuthor(author.userID)"
          v-if="isFollowed"
          class="isfollowed follow1"
          :disabled="isFollowed == null"
        >
          已关注
        </l-button>
        <l-button @click="toAuthor(authorID)">个人门户</l-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getIntroFollowStatus,
  follow,
  getAuthorInformation,
} from "network/profile";

export default {
  name: "Authorcard",
  props: {
    authorID: String,
  },
  data() {
    return {
      author: {},
      // author: {
      //   authorID: "123",
      //   realName: "阿尔托莉雅",
      //   organization: "不列颠",
      //   userID: "",
      //   image:
      //     "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=66747141,2601833110&fm=26&gp=0.jpg",
      //   introduction:
      //     "身份为古不列颠传说中的亚瑟王。性格忠诚正直，谦逊有礼，个性认真。因有圣剑Excalibur的传承，在第四、五次圣杯战争中一直以“Saber”职阶被召唤到现世。"
      // },
      // author: {},
      isFollowed: null,
    };
  },
  methods: {
    //跳转到个人门户
    toAuthor(authorID) {
      this.$router.push({
        path: "/intro",
        query: {
          authorID: authorID,
        },
      });
    },
    //关注和取消关注
    followAuthor(userID) {
      //已关注，要取消关注
      if (this.isFollowed) {
        follow(this.$route.query.userID, userID, 0) //缺少authorid找userid的步骤
          .then((res) => {
            if (res == 0) {
              this.$notify.success("取消关注成功");
            } else if (res == -1) {
              this.$notify.error("取消关注失败，请重试");
            }
          });
      }
      //未关注，要关注作者
      else {
        follow(this.$route.query.userID, userID, 1) //缺少authorid找userid的步骤
          .then((res) => {
            if (res == 0) {
              this.$notify.success("关注成功");
            } else if (res == -1) {
              this.$notify.error("关注失败，请重试");
            }
          });
      }
      this.isFollowed = !this.isFollowed;
    },
  },
  created() {
    if (this.$store.state.user != null)
      getIntroFollowStatus(this.$store.state.user.userID, this.authorID).then(
        (res) => {
          console.log("followStatus", res);
          //已关注
          if (res == 1) {
            this.isFollowed = true;
          }
          //未关注
          else if (res == 2) {
            this.isFollowed = false;
          }
        }
      );
    getAuthorInformation(this.authorID).then((res) => {
      this.author = res;
      console.log(this.authorID);
      console.log("作者card");
      console.log(this.author);
      console.log(res);
    });
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
  height: fit-content;
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
  align-self: center;
  align-items: center;
  padding: 0 10% 20px;
}

.authorcard .auth-part1 {
  display: flex;
  width: 100%;
  align-items: center;
  /* background: rgb(243, 230, 230); */
}

.authorcard .auth-part1-left {
  font-size: 15px;
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
  /* padding-top: 10px; */
  padding-right: 15px;
}

.authorcard .auth-part2 {
  margin-top: 10px;
  font-size: 13px;
  letter-spacing: 0.5px;
  line-height: 16px;
  margin-right: 25px;
  text-align: justify;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}

.authorcard .auth-part3 {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  width: 90%;
}

.authorcard .auth-part3 .l-button {
  width: 100px;
}

.authorcard .auth-part3 .isfollowed {
  background: #c6e2ff;
  color: #777;
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

.follow1{
  margin-right: 20px;
}
</style>
