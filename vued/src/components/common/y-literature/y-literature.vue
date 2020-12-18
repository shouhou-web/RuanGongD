<template>
  <div class="one-follow-literature">
    <div class="title" @click="gotoLiterature()">{{ title }}</div>
    <div class="tags">
      <div v-for="(a_tag, i) in tags">
        <div class="leftpart-tags">{{a_tag}}</div>
      </div>
    </div>
    <div class="authors">
      <div v-for="(one_author, i) in authors" class="author-list">
        <img :src="one_author.userImgSrc" class="authorImg">
        <div class="authorname" @click="gotoIntro(one_author.userID, one_author.authorID)">{{one_author.userName}}</div>
      </div>
    </div>
    <div class="read-time">
      <div class="read-time-content">
        {{read_time}} Reads
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "y-literature",
  props: {
    title: String,
    id: String,
    authors: Array,
    tags: Array,
    read_time: {
      type: Number,
      default: 0
    }
  },
  methods: {
    gotoLiterature() {
      this.$notify.success("跳转ing")
    },
    gotoIntro(userID, authorID) {
      this.$router.push({ path: "/intro", query: { userID: userID, authorID: authorID } })
    }
  }
}
</script>

<style scoped>
.one-follow-literature {
  width: 715px;
  height: 170px;
  border: 1px solid #dddddd;
  background-color: white;
  padding: 30px 25px 27px 25px;
  margin-bottom: 20px;
}

.title {
  font-size: 0.9rem;
  color: black;
  font-weight: 700;
  width: fit-content;
  height: 25px;
  line-height: 20px;
  padding-left: 5px;
  margin-bottom: 5px;
  transition: ease-in-out 0.3s;
}

.title:hover {
  color: #4F6EF2;
  transition: ease-in-out 0.3s;
  cursor: pointer;
}

.tags {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}

.first-tag {
  border-radius: 3px;
  width: fit-content;
  padding: 3px;
  margin: 5px;
  font-size: 0.8rem;
  color: white;
  background-color: #4F6EF2;
}

.first-tag:hover {
  cursor: pointer;
}

.leftpart-tags {
  border-radius: 3px;
  width: fit-content;
  padding: 3px;
  margin: 5px;
  font-size: 0.8rem;
  border: 1px solid #4F6EF2;
  background-color: white;
  color: #4F6EF2;
  transition: ease-in-out 0.5s;
}

.leftpart-tags:hover {
  cursor: pointer;
  border: 1px solid white;
  background-color: #4F6EF2;
  color: white;
  transition: ease-in-out 0.5s;
}

.authors {
  width: 100%;
  height: 25px;
  margin-bottom: 5px;
}

.author-list {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  align-items: center;
}

.authorImg {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: 1.5px;
  margin-left: 5px;
}

.authorname {
  font-size: 0.8rem;
  color: #000000;
  margin-left: 5px;
  margin-top: 5px;
}

.authorname:hover {
  cursor: pointer;
}

.read-time {
  width: 100%;
  height: 25px;
  font-size: 0.8rem;
  color: #999999;
  padding-left: 5px;
}

.read-time-content {
  height: 100%;
  margin-top: 3px;
}

</style>
