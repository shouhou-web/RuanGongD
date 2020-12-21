<template>
  <div id="author">
    <el-popover placement="right" trigger="hover">
      <div class="authercard">
        <div class="auth-bottom">
          <div class="auth-part1">
            <div class="auth-part1-left">
              <div class="auth-name">{{ author.realName }}</div>
              <div class="auth-workunit">{{ author.organization }}</div>
            </div>
            <div class="auth-part1-right">
              <!-- <img src="../img/test.jpg" alt="" class="l-root-card--reporter-pic" /> -->
              <img
                :src="author.image"
                alt=""
                class="l-root-card--reporter-pic"
              />
            </div>
          </div>
          <div class="auth-part2">
            <div class="introduction" v-if="this.author.introduction != 0">
              <span class="intro">个人简介：</span>
              <span>{{ author.introduction }}</span>
            </div>
            <!-- 没有个人简介的情况 -->
            <div
              class="introduction"
              v-if="this.author.introduction.length == 0"
            >
              <span class="intro">暂无个人简介</span>
            </div>
          </div>
          <div class="auth-part3" v-if="isFollowed != null">
            <l-button @click="followAuthor(author.userID)" v-if="!isFollowed"
              >关注</l-button
            >
            <l-button
              @click="followAuthor(author.userID)"
              v-if="isFollowed"
              class="isfollowed"
              >已关注</l-button
            >
          </div>
        </div>
      </div>

      <el-link href="?" target="_blank" slot="reference">{{
        author.realName
      }}</el-link>
    </el-popover>
  </div>
</template>

<script>
import { getIntroFollowStatus, follow } from "network/profile";
export default {
  name: "Author",
  props: {
    author: Object
  },
  data() {
    return {
      isFollowed: null
    };
  },
  methods: {
    //关注和取消关注
    followAuthor(userID) {
      console.log("test");
      //已关注，要取消关注
      if (this.isFollowed) {
        follow(this.$route.query.userID, userID, 0) //缺少authorid找userid的步骤
          .then(res => {
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
          .then(res => {
            if (res == 0) {
              this.$notify.success("关注成功");
            } else if (res == -1) {
              this.$notify.error("关注失败，请重试");
            }
          });
      }
      this.isFollowed = !this.isFollowed;
    }
  },
  created() {
    if (this.$store.state.user != null)
      getIntroFollowStatus(
        this.$store.state.user.userID,
        this.author.authorID
      ).then(res => {
        //已关注
        if (res == 1) this.isFollowed = true;
        //未关注
        else if (res == 2) this.isFollowed = false;
      });
  },
  components: {}
};
</script>

<style scoped>
#author {
  display: inline;
}
.authercard {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 325px;
  border: 1px solid #95a5a6;
  background: white;
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
  letter-spacing: 0.5px;
  margin-right: 25px;
  text-align: justify;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.authercard .auth-part3 {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
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

.l-button {
  padding-left: 18px;
  padding-right: 18px;
}

.intro {
  font-size: 14px;
  font-weight: 550;
}

.auth-part3 .isfollowed {
  background: #c6e2ff;
  color: #777;
}

.auth-part3 .l-button {
  margin-right: 30px;
  width: 90px;
}
</style>
