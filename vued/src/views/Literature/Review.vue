<template>
  <div id="Review">
    <!-- 评论区 -->
    <div class="comment-container" v-if="comments.length >= 1">
      <div class="card">
        <div
          class="child-card"
          v-for="comment in comments"
          :key="comment.floor"
        >
          <div class="card-divider" v-if="comment.floor != 1"></div>
          <div class="card-header">
            <div class="avatar">
              <v-btn fab icon x-small @click="jumpToProfile(comment.commenterId)">
                <v-avatar size="32px">
                  <img :src="comment.commenterAvatar" />
                </v-avatar>
              </v-btn>
            </div>
            <div class="commenter-name">
              {{ comment.commenterName }}
            </div>
            <div class="comment-time">
              {{ comment.commentTime }}
            </div>
            <div class="comment-action">
              <v-btn
                icon
                v-if="comment.commenterId == userId"
                @click="showDelete(comment.commentId)"
              >
                <!-- 是作者：可以删除评论 -->
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
              <v-btn icon v-else @click="showReport(comment.commentId)">
                <!-- 不是作者：可以举报评论 -->
                <v-icon>
                  mdi-alert-octagon
                </v-icon>
              </v-btn>
            </div>
          </div>
          <div class="card-item">
            <div class="comment-content">
              {{ comment.commentContent }}
            </div>
          </div>
        </div>
      </div>

      <div class="input-container">
        <div class="card">
          <div class="card-header">
            <div class="avatar">
              <v-avatar size="48px">
                <img :src="userAvatar" />
              </v-avatar>
            </div>
            <div class="poster-name">
              {{ userName }}
            </div>
          </div>
          <div class="card-item">
            <v-form v-model="commentFormValid" class="comment-form">
              <v-textarea
                ref="commentarea"
                v-model="commentContent"
                outlined
                counter
                rows="4"
                auto-grow
                required
                color="var(--color-main)"
                :rules="commentRule"
              ></v-textarea>
              <div class="post-reply-button">
                <v-btn
                  color="var(--color-main)"
                  :disabled="!commentFormValid"
                  @click="handleComment"
                >
                  <font color="white">发表</font>
                </v-btn>
              </div>
            </v-form>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Review",
  data() {
    return {
      userId: "123",
      userName: "Codevka",
      userAvatar: "https://i.loli.net/2020/11/26/soiOjIlZFpELuTW.png",

      commentContent: "",
      commentFormValid: false,
      commentRule: [
        (v) => !!v,
        (v) =>
          (v.length <= 800 && v.length >= 5) ||
          "评论内容长度在 5-800 个字符之间",
      ],

      comments: [
        {
          commentId: "1",
          commenterId: "123",
          commenterName: "BI",
          commenterAvatar: "https://i.loli.net/2020/11/27/9fbGvYknV8KejFS.png",
          floor: 2,
          commentContent: "AI nb!",
          commentTime: "今天 11:45",
        },
        {
          commentId: "2",
          commenterId: "2333",
          commenterName: "AI",
          commenterAvatar: "https://i.loli.net/2020/11/27/3tz2XEraSwl8skK.png",
          floor: 1,
          commentContent: "BI nb!",
          commentTime: "1926-08-17",
        },
        {
          commentId: "3",
          commenterId: "21",
          commenterName: "Spam  Bot",
          commenterAvatar: "https://i.loli.net/2020/11/30/jm2i7g9qL61SkE8.png",
          floor: 4,
          commentContent:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          commentTime: "刚刚",
        },
      ],
    };
  },
  methods: {
      jumpToProfile(userId) {
      console.log("jump to " + userId);
      this.$router.push({
        path: "/profile",
        query: {
          userID: userId,
        },
      });
    },
      showDelete(commentId) {
      this.deleteDialog = true;
      if (commentId == -1) {
        this.deletePost = true;
      } else {
        this.deletePost = false;
        this.deleteCommentId = commentId;
      }
    },
    showReport(commentId) {
      this.reportDialog = true;
      this.reportForm.reportContent = "";
      if (commentId == -1) {
        this.reportPost = true;
      } else {
        this.reportPost = false;
        this.reportForm.reportCommentId = commentId;
      }
    },
    handleComment() {
      commentPost(this.userId, this.postId, this.commentContent)
        .then((res) => {
          console.log("comment post");
          console.log(res);
          if (res.data.result == "true") {
            this.commentContent = "";
            this.$notify.success("评论发表成功！");
          } else {
            this.$notify.error("评论失败，请稍后再试。");
          }
        })
        .catch((err) => {
          this.$notify.error("评论失败，请稍后再试。");
          console.log(err);
        });
    },
  },
  components: {},
  created() {
    this.postId = this.$route.query.postId;
    // this.userId = this.$store.state.userID; // TODO 等待统一
    // TODO 获取 userName, userAvatar
    console.log("postId: " + this.postId + "\nuserId: " + this.userId);
    this.comments.sort(function(a, b) {
      return a.floor - b.floor;
    }); // 对 comments 按楼层升序排序
  },
};
</script>

<style scoped>
#Review{
    width: 1100px;
  margin: auto;
  display: flex;

  margin-top: 20px;

  flex-direction: column;
}

.comment-container {
  width: 700px;
  min-width: 400px;
}

.input-container {
  width: 100%;
  min-width: 400px;
  margin: 0 auto;
 background: white;

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
  background: white;
}

.card-header {
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  position: relative;
}

.card-item {
  padding-bottom: 3px;
  display: block;
  margin: 0;
}

.avatar {
  position: relative;
  /* margin-left: 20px; */
  display: flex;
  align-items: center;
}

.poster-name {
  display: flex;
  align-items: center;
  font-size: 1.15rem;
  font-weight: bold;
  margin-left: 10px;
}

.post-reply-button {
  height: fit-content;
}

.card-divider {
  height: 1px;
  background: rgb(223, 223, 223);
  margin: 10px 0 10px 0;
}

.commenter-name {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  font-weight: bold;
  margin-left: 10px;
}

.comment-action {
  display: flex;
  align-items: center;
}

.comment-time {
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-left: auto;
  font-size: 0.8rem;
  color: #555;
}

.comment-form {
  margin-top: 20px;
}

.comment-content {
  height: fit-content;
  line-height: 1.2;
  font-size: 0.9rem;
  margin-top: 10px;
  margin-bottom: 15px;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding-bottom: 10px;
  width: 40%;
}
</style>
