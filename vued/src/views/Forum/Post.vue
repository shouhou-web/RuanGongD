<template>
  <!-- 动态页面 -->
  <div id="post">
    <m-header></m-header>

    <!-- 动态 -->
    <div class="post-container">
      <div class="card">
        <div class="card-item">
          <div class="post-header">
            <div class="avatar">
              <v-avatar size="48px"> <img :src="postInfo.creatorAvatar"/></v-avatar>
            </div>
            <div class="name">
              {{ postInfo.creatorName }}
            </div>
            <div class="action">
              <v-btn icon v-if="isAuthor == true">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
              <v-btn icon v-else>
                <v-icon>
                  mdi-alert-octagon
                </v-icon>
              </v-btn>
            </div>
          </div>
          <div class="post-body">
            <div class="post-name">{{ postInfo.postName }}</div>
            <div class="post-attr">
              <div class="post-reply-number">
                <v-icon size="0.875rem">
                  mdi-reply
                </v-icon>
                {{ postInfo.replyNum }}
              </div>
              <div class="post-view-number">
                <v-icon size="0.875rem">
                  mdi-eye
                </v-icon>
                {{ postInfo.viewNum }}
              </div>
              <div class="post-time">发布于 {{ postInfo.createTime }}</div>
            </div>
            <div class="post-content">{{ postInfo.postContent }}</div>
            <div class="post-tags">
              <div class="tag-item" v-for="tag in postInfo.postTags" :key="tag">
                <div class="tag-content">{{ tag }}</div>
              </div>
            </div>
            <div class="post-reply-button" @click="jumpToReply">
              <v-btn color="#4F6EF2">
                <font color="white">回复动态</font>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 评论区 -->
    <div class="comment-container">
      <div class="card">
        <div class="card-header"></div>
        <div class="card-item"></div>
      </div>
    </div>

    <!-- 输入评论 -->
    <div class="input-container">
      <div class="card">
        <div class="card-header"></div>
        <div class="card-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostInfo } from "network/forum.js";
export default {
  name: "post",
  data() {
    return {
      isAuthor: false,
      userId: "1",
      postId: "123",
      postInfo: {
        creatorId: "1",
        creatorName: "Codevka",
        creatorAvatar: "https://i.loli.net/2020/11/26/soiOjIlZFpELuTW.png",
        postName: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        postContent:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createTime: "2020-11-26",
        postTags: ["Lorem", "ipsum", "dolor"],
        viewNum: "1926",
        replyNum: "817",
      },
      comments: [
        {
          commenterId: "123",
          commenterName: "BI",
          commenterAvatar: "https://i.loli.net/2020/11/27/9fbGvYknV8KejFS.png",
          floor: 2,
          commentContent: "AI nb!",
          commentTime: "10分钟前",
        },
        {
          commenterId: "2333",
          commenterName: "AI",
          commenterAvatar: "https://i.loli.net/2020/11/27/3tz2XEraSwl8skK.png",
          floor: 1,
          commentContent: "BI nb!",
          commentTime: "今天 08:37",
        },
      ],
    };
  },
  methods: {
    jumpToReply() {
      // 聚焦到回复输入框
      console.log("jump!");
    },
  },
  components: {},
  created() {
    this.postId = this.$route.query.postId;
    this.userId = this.$route.state.userID; // TODO 等待统一
    console.log("postId: " + this.postId + "\nuserId: " + this.userId);
    getPostInfo(this.userId, this.postId)
      .then((res) => {
        console.log("getPostInfo");
        console.log(res);
        this.postInfo.postName = res.data.postName;
        this.postInfo.postContent = res.data.postContent;
        this.postInfo.replyNum = res.data.replyNum;
        this.postInfo.viewNum = res.data.viewNum;
        this.postInfo.creatorId = res.data.creatorId;
        this.postInfo.creatorAvatar = res.data.creatorAvatar;
        this.postInfo.createTime = res.data.createTime;
        this.postInfo.postTags = res.data.tags;
        this.comments = res.data.comments;
      })
      .cache((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.post-container {
  width: 600px;
  height: 100%;
  margin: 0 auto;
}

.comment-container {
  width: 600px;
  margin: 0 auto;
}

.input-container {
  width: 600px;
  margin: 0 auto;
}

.card {
  width: initial;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.18), 0 1px 3px rgba(0, 0, 0, 0.12);
  padding: 20px 30px 20px 30px;
}

.card-item {
  padding-bottom: 7.5px;
  display: block;
  margin: 0;
}

.post-header {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  position: relative;
  /* height: 100px; */
}

.avatar {
  position: relative;
  /* margin-left: 20px; */
  display: flex;
  align-items: center;
}

.name {
  display: flex;
  align-items: center;
  width: 500px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
}

.action {
  display: flex;
  align-items: flex-end;
}

.post-body {
  padding-top: 20px;
}

.post-name {
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.2;
  font-size: 1.375rem;
  height: fit-content;
}

.post-attr {
  display: flex;
  line-height: 1.3;
  flex-direction: row;
  height: fit-content;
  margin-bottom: 5px;
  font-size: 13px;
  color: #555;
}

/* TODO 这里 CSS 需要调整 */

.post-reply-number {
  width: 45px;
}

.post-view-number {
  width: 380px;
}

.post-time {
  display: inline;
  justify-content: flex-end;
  align-items: flex-end;
}

.post-content {
  height: fit-content;
  line-height: 1.25;
  font-size: 14px;
  margin-bottom: 15px;
}

.post-reply-button {
  height: fit-content;
}

.post-tags {
  margin-bottom: 30px;
  height: fit-content;
}

.tag-item {
  display: inline;
  text-align: center;
  padding-right: 10px;
}

.tag-content {
  font-size: 0.8rem;
  display: inline-block;
  line-height: 1.3;
  color: #555;
  padding: 5px;
  background-color: #ddd;
  padding-top: 0.16em;
  padding-bottom: 0.16em;
  margin-top: -0.16em;
  margin-bottom: -0.16em;
  border-radius: 9999px;
  white-space: nowrap;
}
</style>
