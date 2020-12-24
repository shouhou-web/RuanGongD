<template>
  <div id="user-posts">
    <div v-if="posts.length != 0" class="posts">
      <div class="post-card" v-for="post in posts" :key="post.postId">
        <div class="card-header">
          <div class="title" @click="gotoPost(post.postId)">
            {{ post.postName }}
          </div>
          <div class="sector">
            {{ post.sectorName }}
          </div>
        </div>
        <div class="attr">
          <div class="post-reply-number">
            <v-icon size="0.875rem">
              comment
            </v-icon>
            {{ post.replyNum }}
          </div>
          <div class="post-view-number">
            <v-icon size="0.875rem">
              mdi-eye
            </v-icon>
            {{ post.viewNum }}
          </div>
          <div class="post-time">发布于 {{ post.createTime }}</div>
        </div>
        <div class="tags" v-if="post.tags.length >= 1 && post.tags[0] != ''">
          <div class="tag" v-for="tag in post.tags" :key="tag">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div class="none" v-else>
      <img src="../../../assets/image/no-img.png" class="none-img" />
    </div>
  </div>
</template>

<script>
import { getUserPosts } from "@/network/forum";
export default {
  name: "UserPosts",
  props: { userId: "" },
  data() {
    return {
      posts: []
    };
  },
  methods: {
    gotoPost(postId) {
      this.$router.push({
        path: "/forumPost",
        query: { postId: postId }
      });
    }
  },
  created() {
    console.log("userId = " + this.userId);
    getUserPosts(this.userId)
      .then(res => {
        console.log("getUserPosts");
        console.log(res);
        this.posts = res.posts;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
#user-posts {
  height: 100%;
}

.posts {
  max-height: 601px;
}

.post-card {
  width: 715px;
  border: 1px solid #dddddd;
  background-color: white;
  padding: 30px 25px 27px 25px;
  margin-bottom: 20px;
}

.card-header {
  height: 25px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
}

.title {
  font-size: 1rem;
  color: black;
  font-weight: 700;
  width: fit-content;
}

.title:hover {
  cursor: pointer;
}

.sector {
  display: flex;
  align-items: center;
  margin: 0 0 0 auto;
  border-radius: 3px;
  width: fit-content;
  height: fit-content;
  padding: 3px;
  font-size: 0.8rem;
  color: white;
  background-color: #4f6ef2;
}

.attr {
  display: flex;
  line-height: 1.3;
  flex-direction: row;
  height: fit-content;
  margin-bottom: 15px;
  font-size: 0.8rem;
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

.tags {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
}

.tag {
  border-radius: 3px;
  width: fit-content;
  padding: 3px;
  margin: 5px 10px 5px 0;
  font-size: 0.8rem;
  border: 1px solid #4f6ef2;
  background-color: white;
  color: #4f6ef2;
}

.none {
  height: 600px;
  border: 1px solid #dddddd;
  background-color: white;
}

.none-img {
  width: 30%;
  margin-left: 34%;
  margin-top: 180px;
}
</style>
