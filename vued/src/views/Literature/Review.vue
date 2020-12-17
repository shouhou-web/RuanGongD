<template>
  <div id="Review">
    <!-- <div class="comments">
      <ul>
        <li v-for="(item, index) in commentList" class="commentcard">
            <div class="cardtop">
                <div class="cardimage">

                </div>
                <div class="">

                </div>
            </div>
            <div class="cardbottom">
                {{item.comment}}
            </div>
        </li>
      </ul>
    </div> -->
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
  </div>
</template>

<script>
export default {
  name: "Review",
  data() {
    return {
      comments: [
        {
          postCommentID: "123",
          postID: "456",
          userID: "789",
          image: "test",
          username: "lw",
          content: "圣杯战争是TYPE-MOON出品的《Fate/stay night》和《Fate/Zero》等Fate系列作品中出现的概念。围绕着能实现持有者心愿的“圣杯”的争夺战，就是广义上的圣杯战争。 [1] 本来“降灵仪式·英灵召唤”是用来拯救灵长世界的决战魔术，立于七个属性顶点的七名英灵——冠位(Grand)从者会现身将阻碍着灵长世界发展的大灾害给讨灭。而人类为了自己的方便，将这种魔术降格而成的召唤系统就是圣杯战争了。",
          commentTime: "2020-12-17",
        },
        {
          postCommentID: "123",
          postID: "456",
          userID: "789",
          image: "test",
          username: "lw",
          content: "圣杯战争是TYPE-MOON出品的《Fate/stay night》和《Fate/Zero》等Fate系列作品中出现的概念。围绕着能实现持有者心愿的“圣杯”的争夺战，就是广义上的圣杯战争。 [1] 本来“降灵仪式·英灵召唤”是用来拯救灵长世界的决战魔术，立于七个属性顶点的七名英灵——冠位(Grand)从者会现身将阻碍着灵长世界发展的大灾害给讨灭。而人类为了自己的方便，将这种魔术降格而成的召唤系统就是圣杯战争了。",
          commentTime: "2020-12-17",
        },
        {
          postCommentID: "123",
          postID: "456",
          userID: "789",
          image: "test",
          username: "lw",
          content: "圣杯战争是TYPE-MOON出品的《Fate/stay night》和《Fate/Zero》等Fate系列作品中出现的概念。围绕着能实现持有者心愿的“圣杯”的争夺战，就是广义上的圣杯战争。 [1] 本来“降灵仪式·英灵召唤”是用来拯救灵长世界的决战魔术，立于七个属性顶点的七名英灵——冠位(Grand)从者会现身将阻碍着灵长世界发展的大灾害给讨灭。而人类为了自己的方便，将这种魔术降格而成的召唤系统就是圣杯战争了。",
          commentTime: "2020-12-17",
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
.comments{
    width: 700px;
      background: white;
      height: 1000px;
}
.commentcard{
    border: 1px #ddd solid;
}
.comment-container {
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
.card-divider {
  height: 1px;
  background: rgb(223, 223, 223);
  margin: 10px 0 10px 0;
}
.card-header {
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  position: relative;
}
.avatar {
  position: relative;
  /* margin-left: 20px; */
  display: flex;
  align-items: center;
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
.comment-time {
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-left: auto;
  font-size: 0.8rem;
  color: #555;
}
.comment-action {
  display: flex;
  align-items: center;
}
.card-item {
  padding-bottom: 3px;
  display: block;
  margin: 0;
}
.post-content {
  height: fit-content;
  line-height: 1.35;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>
