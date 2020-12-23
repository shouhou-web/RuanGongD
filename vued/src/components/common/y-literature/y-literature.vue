<template>
  <div class="one-follow-literature">
    <div class="yCard">
      <div class="title" @click="gotoLiterature()">{{ title }}</div>
      <div class="change-button" v-if="display" @click="clickChange">修改</div>
    </div>
    <div class="tags">
      <div v-for="(a_tag, i) in tags">
        <div class="leftpart-tags" v-if="i < 3">{{a_tag}}</div>
      </div>
    </div>
    <div class="authors">
      <div v-for="(one_author, i) in authors" class="author-list">
        <div class="authorname" @click="gotoIntro(one_author.userID, one_author.authorID)">{{one_author.realName}}</div>
      </div>
    </div>
<!--    <div class="read-time">-->
<!--      <div class="read-time-content">-->
<!--        {{read_time}} Reads-->
<!--      </div>-->
<!--    </div>-->
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
    display: {
      Boolean,
      default: false
    }
    // read_time: {
    //   type: Number,
    //   default: 0
    // }
  },
  methods: {
    gotoLiterature() {
      this.$router.push({ path: "/literature", query: { literatureID: this.id } })
      this.$notify.success("跳转ing")
    },
    gotoIntro(userID, authorID) {
      this.$router.push({ path: "/intro", query: { userID: userID, authorID: authorID } })
    },
    clickChange() {
      this.$emit("change", this.id)
    }
  },
  created() {
  }
}
</script>

<style scoped>
.one-follow-literature {
  width: 715px;
  height: auto;
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
  height: auto;
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
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: auto;
  margin-bottom: 15px;
}

.author-list {
  width: fit-content;
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

.yCard {
  display: flex;
  flex-direction: row;
}

.change-button {
  border-radius: 2px;
  min-width: fit-content;
  height: 22px;
  padding: 3px;
  margin-left: 80px;
  font-size: 0.8rem;
  border: 1px solid #4F6EF2;
  background-color: white;
  color: #4F6EF2;
  transition: ease-in-out 0.5s;
}

.change-button:hover {
  border: 1px solid #4F6EF2;
  background-color: #4F6EF2;
  color: white;
  transition: ease-in-out 0.5s;
  cursor: pointer;
}
</style>
