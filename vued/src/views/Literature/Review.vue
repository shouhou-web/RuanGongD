<template>
  <div id="Review">
    <div class="main">
    <!-- 评论区 -->
    <div class="comment-container" v-if="comments.length >= 1">
      <div class="card">
        <!-- <div
          class="child-card"
          v-for="comment in comments"
          :key="comment.floor"
        > -->
        <div
          class="child-card"
          v-for="(comment,index) in comments"
        >
          <div class="card-divider" v-if="index != 0"></div>
          <div class="card-header">
            <div class="avatar">
              <v-btn
                fab
                icon
                x-small
                @click="jumpToProfile(comment.userID)"
              >
                <v-avatar size="32px">
                  <img :src="comment.image" />
                </v-avatar>
              </v-btn>
            </div>
            <div class="commenter-name">
              {{ comment.username }}
            </div>
            <div class="comment-time">
              {{ comment.commentTime }}
            </div>
            <div class="comment-action" v-if="$store.state.user!=null">
              <v-btn
                icon
                v-if="comment.userID == $store.state.user.userID"
                @click="showDelete(comment.postCommentID)"
              >
                <!-- 是作者：可以删除评论 -->
                <v-icon> mdi-delete </v-icon>
              </v-btn>
              <v-btn icon v-else @click="showReport(comment.postCommentID)">
                <!-- 不是作者：可以举报评论 -->
                <v-icon> mdi-alert-octagon </v-icon>
              </v-btn>
            </div>
          </div>
          <div class="card-item">
            <div class="comment-content">
              {{ comment.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="nocomment">
      <div class="nocomment-content">
文章暂无评论
      </div>
      
    </div>
    <div class="input-container" v-if="$store.state.user!=null">
      <div class="card">
        <div class="card-header">
          <div class="avatar">
            <v-avatar size="48px">
              <img :src="$store.state.user.image" />
            </v-avatar>
          </div>
          <div class="poster-name">
            {{ $store.state.user.username }}
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
                @click="handleComment()"
              >
                <font color="white">发表</font>
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </div>
    <!-- 举报对话框  -->
    <v-dialog v-model="reportDialog" max-width="600">
      <v-card elevation="3">
        <v-card-title>举报评论</v-card-title>
        <v-card-text>
          <el-form
            :model="reportForm"
            label-width="80px"
            
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
                :rules="reportRule"
              ></el-input>
            </el-form-item>
          </el-form>
        </v-card-text>
        <v-card-actions>
          <div class="footer">
            <v-btn color="var(--color-main)" @click="handleReport()">
              <font color="white">举报</font>
            </v-btn>
            <v-btn @click="reportDialog = false">取消</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card elevation="3">
        <div>
          <v-card-title>删除评论</v-card-title>
          <v-card-text> 是否真的要删除这条评论？ </v-card-text>
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

  </div>
</template>

<script>
import {
  getPostInfo,
  deletePost,
  reportComment,
  deleteComment
} from "network/forum.js";
import { getComment, comment } from "network/literature";

export default {
  name: "Review",
  props: {
    literature: Object
  },
  created() {
    getComment(this.literature.literatureID)
      .then(res => {
        console.log("文献评论", res);
        if (res == null) this.comments = [];
        else this.comments = res;
console.log("文献评论长度"+this.comments.length);
console.log(this.comment);
      });
      
      
  },
  data() {
    return {
      commentContent: "",
      commentFormValid: false,
      reportDialog: false, // 是否展示举报界面
      deleteDialog: false, // 是否展示删除界面
      deleteCommentId: "",
      commentContent: "",
      commentFormValid: false,
      reportForm: {
        reportContent: "",
        reportCommentId: ""
      },
      reportFormValid: false,
      commentRule: [
        v => !!v,
        v =>
          (v.length <= 800 && v.length >= 5) ||
          "评论内容长度在 5-800 个字符之间"
      ],
      reportRule: [
        v => !!v,
        v =>
          (v.length <= 600 && v.length >= 5) ||
          "举报内容长度在 5-600 个字符之间"
      ],
      comments: []
    };
  },
  methods: {
    jumpToProfile(userId) {
      console.log("jump to " + userId);
      this.$router.push({
        path: "/profile",
        query: {
          userID: userId
        }
      });
    },
    showDelete(commentId) {
      this.deleteDialog = true;
      if (commentId == -1) {
        this.deletePost = true;
      } else {
        this.deletePost = false;
        this.deleteCommentId = commentId.toString();
        console.log(this.deleteCommentId);
      }
    },
    showReport(commentId) {
      this.reportDialog = true;
      this.reportForm.reportContent = "";
      this.reportForm.reportCommentId = commentId.toString();
    },
    handleReport() {
      console.log(this.$store.state.user.userID,
        this.reportForm.reportCommentId,
        this.reportForm.reportContent);
      reportComment(
        this.$store.state.user.userID,
        this.reportForm.reportCommentId,
        this.reportForm.reportContent
      )
        .then(res => {
          console.log("report comment");
          console.log(res);
          if (res.result == "true") {
            this.reportDialog = false;
            this.$notify({
              title: "操作成功",
              message: "举报成功！请等候管理员处理",
              type: "success"
            });
          } else {
            this.$notify.error({
              title: "操作失败",
              message: "举报失败，请稍后再试。"
            });
          }
        })
        .catch(err => {
          this.$notify.error({
            title: "操作失败",
            message: "举报失败，请稍后再试。"
          });
          console.log(err);
        });
    },

    handleDelete() {
      console.log(this.deleteCommentId);
      deleteComment(this.$store.state.user.userID, this.deleteCommentId)
        .then(res => {
          console.log("delete comment");
          console.log(res);
          if (res.result == "true") {
            this.deleteDialog = false;

            for (var i = 0; i < this.comments.length; i++) {
              if (this.deleteCommentId == this.comments[i].postCommentID)
                this.comments.splice(i, 1);
            }
            // if (this.comments[0] && this.comments[0].floor == 3)
            //   this.comments[0].floor--;
            // for (var i = 1; i < this.comments.length; i++) {
            //   if (this.comments[i].floor - this.comments[i - 1].floor == 2)
            //     this.comments[i].floor--;
            // }
            // FIXME: 跳到其他页面，再使用浏览器的返回时，无法持久存放修改后的数据

            this.$notify({
              title: "操作成功",
              message: "删除成功！",
              type: "success"
            });
          } else {
            this.$notify.error({
              title: "操作失败",
              message: "删除失败，请稍后再试。"
            });
          }
        })
        .catch(err => {
          this.$notify.error({
            title: "操作失败",
            message: "删除失败，请稍后再试。"
          });
          console.log(err);
        });
    },

    handleComment() {
      comment(this.$store.state.user.userID, this.literature.literatureID, this.commentContent)
        .then(res => {
          console.log("评论成功");
          if (res == 0) {
            var len = this.comments.length;
            this.comments.push({
              userID: this.$store.state.user.userID,
              username: this.$store.state.user.username,
              image: this.$store.state.user.image,
              // floor: len + 2,
              content: this.commentContent,
              commentTime: "刚刚"
            });
            this.commentContent = "";
            this.$notify.success("评论发表成功！");
          } else {
            this.$notify.error("评论失败，请稍后再试。");
          }
        })
        .catch(err => {
          console.log("comment post");
          this.$notify.error("评论失败");
          console.log(err);
        });
    }
  },
  components: {}
};
</script>

<style scoped>
#Review {
  width: 1100px;
  margin: auto;
  display: flex;

  margin-top: 20px;

  flex-direction: column;
}

.main{
  width: 700px;
  display: flex;
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
  /* margin-bottom: 30px; */
  border: 1px solid #ddd;
  /* box-shadow: 0 0px 2px rgba(0, 0, 0, 0.18), 0 1px 3px rgba(0, 0, 0, 0.12); */
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
  justify-content: flex-end;
  margin: auto;
  padding-bottom: 10px;
  width: 80%;
}
.footer .v-btn {
  margin-right: 20px;
}
.report-content {
  margin-top: 10px;
}
.nocomment{
  width: 100%;
  height:60px;
  background: white;
  border: 1px solid #ddd;
  /* border-bottom: 0; */
  display: flex;
  /* justify-content:center; */
  align-items:center;
}

.nocomment-content{
  margin-left: 25px;
  font-size: 16px;
}
</style>
