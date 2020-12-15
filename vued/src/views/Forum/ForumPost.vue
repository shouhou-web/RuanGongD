<template>
  <!-- 动态页面 -->
  <div id="formPost" data-app="true">
    <m-app-header></m-app-header>

    <!-- 动态内容 -->
    <div class="post-container">
      <div class="card">
        <div class="card-header">
          <div class="avatar">
            <v-btn fab icon @click="jumpToProfile(postInfo.creatorId)">
              <v-avatar size="48px">
                <img :src="postInfo.creatorAvatar" />
              </v-avatar>
            </v-btn>
          </div>
          <div class="poster-name">
            {{ postInfo.creatorName }}
          </div>
          <div class="post-action">
            <v-btn
              icon
              v-if="postInfo.creatorId == userId"
              @click="showDelete(-1)"
            >
              <!-- 是作者：可以删除动态 -->
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
            <v-btn icon v-else @click="showReport(-1)">
              <!-- 不是作者：可以举报动态 -->
              <v-icon>
                mdi-alert-octagon
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div class="card-item">
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
            <div class="post-reply-button" @click="jumpToComment">
              <v-btn color="var(--color-main)">
                <font color="white">评论动态</font>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            <div
              class="poster-tag"
              v-if="comment.commenterId == postInfo.creatorId"
            >
              楼主
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
            <div class="post-content">
              {{ comment.commentContent }}
            </div>
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

    <!-- 举报对话框  -->
    <v-dialog v-model="reportDialog" max-width="800">
      <v-card elevation="3">
        <v-card-title v-if="reportPost == true">举报动态</v-card-title>
        <v-card-title v-else>举报评论</v-card-title>
        <v-card-text>
          <el-form
            :model="reportForm"
            label-width="80px"
            :rules="reportRule"
            ref="reportForm"
          >
            <el-form-item label="举报理由" prop="reportContent">
              <el-input
                class="report-content"
                type="textarea"
                v-model="reportForm.reportContent"
                placeholder="请输入举报理由"
                :autosize="{ minRows: 5, maxRows: 12 }"
                resize="none"
                maxlength="801"
              ></el-input>
            </el-form-item>
          </el-form>
        </v-card-text>
        <v-card-actions>
          <div class="footer">
            <v-btn
              color="var(--color-main)"
              @click="handleReport('reportForm')"
            >
              <font color="white">举报</font>
            </v-btn>
            <v-btn @click="reportDialog = false">取消</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="800">
      <v-card elevation="3">
        <div v-if="deletePost == true">
          <v-card-title>删除动态</v-card-title>
          <v-card-text>
            是否真的要删除这条动态？
          </v-card-text>
        </div>
        <div v-else>
          <v-card-title>删除评论</v-card-title>
          <v-card-text>
            是否真的要删除这条评论？
          </v-card-text>
        </div>
        <v-card-actions>
          <div class="footer">
            <v-btn color="#ff6060" @click="handleDelete">
              <font color="white">删除</font>
            </v-btn>
            <v-btn @click="deleteDialog = false">取消</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  getPostInfo,
  reportPost,
  deletePost,
  reportComment,
  deleteComment,
  commentPost,
} from "network/forum.js";
import MHeader from "../../components/common/m-header/m-header.vue";

export default {
  name: "FormPost",
  data() {
    return {
      isAuthor: false,
      userId: "1",
      userName: "Codevka",
      userAvatar: "https://i.loli.net/2020/11/26/soiOjIlZFpELuTW.png",
      postId: "123",
      reportDialog: false, // 是否展示举报界面
      deleteDialog: false, // 是否展示删除界面
      reportPost: false,
      deletePost: false,
      deleteCommentId: "",
      commentContent: "",
      commentFormValid: false,
      reportForm: {
        reportContent: "",
        reportCommentId: "",
      },
      commentRule: [
        (v) => !!v,
        (v) =>
          (v.length <= 800 && v.length >= 5) ||
          "评论内容长度在 5-800 个字符之间",
      ],
      reportRule: {
        reportContent: [
          {
            required: true,
            message: "请输入举报理由",
            trigger: "blur",
          },
          {
            min: 5,
            max: 800,
            message: "举报理由长度在 5-800 个字符之间",
            trigger: "blur",
          },
        ],
      },
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
        citeId: "-1",
      },
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
        //   {
        //     commentId: "4",
        //     commenterId: "1234",
        //     commenterName: "CI",
        //     commenterAvatar: "https://i.loli.net/2020/11/27/3tz2XEraSwl8skK.png",
        //     floor: 3,
        //     commentContent: "DI nb!",
        //     commentTime: "8 分钟前",
        //   },
        //   {
        //     commentId: "3",
        //     commenterId: "21",
        //     commenterName: "Spam  Bot",
        //     commenterAvatar: "https://i.loli.net/2020/11/30/jm2i7g9qL61SkE8.png",
        //     floor: 4,
        //     commentContent:
        //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //     commentTime: "刚刚",
        //   },
        //   {
        //     commentId: "1233",
        //     commenterId: "1",
        //     commenterName: "Codevka",
        //     commenterAvatar: "https://i.loli.net/2020/11/26/soiOjIlZFpELuTW.png",
        //     floor: 5,
        //     commentContent: "No spam.",
        //     commentTime: "刚刚",
        //   },
      ],
    };
  },
  methods: {
    // 聚焦到评论输入框
    jumpToComment() {
      this.$refs.commentarea.focus();
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      );
      console.log("jump!");
    },

    jumpToProfile(userId) {
      console.log("jump to " + userId);
      this.$router.push({
        path: "/profile",
        query: {
          userID: userId,
        },
      });
    },

    reply() {
      console.log("reply");
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

    // 举报
    handleReport(formName) {
      let pass = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          pass = true;
        }
      });
      if (!pass) return;

      if (this.reportPost == true) {
        reportPost(this.userId, this.postId, this.reportForm.reportContent)
          .then((res) => {
            console.log("report post");
            console.log(res);
            if (res.data.result == "true") {
              this.reportDialog = false;
            } else {
              this.$notify.error("举报失败，请稍后再试。");
            }
          })
          .catch((err) => {
            this.$notify.error("举报失败，请稍后再试。");
            console.log(err);
          });
      } else {
        reportComment(
          this.userId,
          this.reportForm.reportCommentId,
          this.reportForm.reportContent
        )
          .then((res) => {
            console.log("report comment");
            console.log(res);
            if (res.data.result == "true") {
              this.reportDialog = false;
            } else {
              this.$notify.error("举报失败，请稍后再试。");
            }
          })
          .catch((err) => {
            this.$notify.error("举报失败，请稍后再试。");
            console.log(err);
          });
      }
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

    // 删除动态
    handleDelete() {
      if (this.deletePost == true) {
        deletePost(this.userId, this.postId)
          .then((res) => {
            console.log("delete post");
            console.log(res);
            if (res.data.result == "true") {
              this.deleteDialog = false;
              this.$notify.success("删除成功！");
              // TODO 返回（到哪？）
              // this.$router.push({
              //   path: "/",
              //   query: {},
              // });
            } else {
              this.$notify.error("删除失败，请稍后再试。");
            }
          })
          .catch((err) => {
            this.$notify.error("删除失败，请稍后再试。");
            console.log(err);
          });
      } else {
        deleteComment(this.userId, this.deleteCommentId)
          .then((res) => {
            console.log("delete comment");
            console.log(res);
            if (res.data.result == "true") {
              this.deleteDialog = false;
              this.$notify.success("删除成功！");
            } else {
              this.$notify.error("删除失败，请稍后再试。");
            }
          })
          .catch((err) => {
            this.$notify.error("删除失败，请稍后再试。");
            console.log(err);
          });
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

    // getPostInfo(this.userId, this.postId)
    //   .then((res) => {
    //     console.log("getPostInfo");
    //     console.log(res);
    //     this.postInfo.postName = res.data.postName;
    //     this.postInfo.postContent = res.data.postContent;
    //     this.postInfo.replyNum = res.data.replyNum;
    //     this.postInfo.viewNum = res.data.viewNum;
    //     this.postInfo.creatorId = res.data.creatorId;
    //     this.postInfo.creatorAvatar = res.data.creatorAvatar;
    //     this.postInfo.createTime = res.data.createTime;
    //     this.postInfo.postTags = res.data.tags;
    //     this.postInfo.citeId = res.data.citeId;
    //     this.comments = res.data.comments;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    this.comments.sort(function(a, b) {
      return a.floor - b.floor;
    }); // 对 comments 按楼层升序排序
  },
};
</script>

<style>
body,
html {
  scroll-behavior: smooth;
}

.post-container {
  /* width: 900px; */
  width: 61%;
  min-width: 400px;
  height: 100%;
  margin: 0 auto;
  margin-top: 50px;
}

.comment-container {
  width: 61%;
  min-width: 400px;
  margin: 0 auto;
}

.input-container {
  width: 61%;
  min-width: 400px;
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

.poster-name {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
}

.post-action {
  display: flex;
  align-items: center;
  margin-left: auto;
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
  margin-bottom: 15px;
  font-size: 13px;
  color: #555;
}

.post-reply-number {
  margin-right: 10px;
}

.post-time {
  display: inline;
  align-items: flex-end;
  margin-left: auto;
}

.post-content {
  height: fit-content;
  line-height: 1.35;
  font-size: 14px;
  margin-top: 10px;
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
  font-size: 0.67rem;
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

.card-divider {
  height: 1px;
  background: rgb(223, 223, 223);
  margin: 10px 0 10px 0;
}

.commenter-name {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
}

.poster-tag {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  color: white;
  padding: 5px;
  background-color: var(--color-main);
  margin: auto;
  margin-left: 10px;
  border-radius: 5px;
  height: fit-content;
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

.footer {
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding-bottom: 10px;
  width: 30%;
}

.el-input__inner,
.el-textarea__inner {
  border-color: rgba(158, 158, 158);
}

.el-input__inner:hover,
.el-textarea__inner:hover {
  border-color: rgba(36, 36, 36);
}

.el-input__inner:focus,
.el-textarea__inner:focus {
  border-color: rgba(64, 158, 255);
  border-width: 2px;
}
</style>
