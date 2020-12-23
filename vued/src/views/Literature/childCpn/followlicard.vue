<template>
  <div class="one-follow-literature">
    <!-- <y-literature
      :title="refer.title"
      :id="refer.literatureID"
      :authors="refer.authors"
      :tags="refer.keyWord"
      :read_time="refer.year"
    ></y-literature> -->

    <div class="title" @click="toLiterature(refer.literatureID)">{{ refer.title }}</div>
    <div class="test1">
      <div class="authors">
        <div v-for="(item, index) in refer.authors" class="author-list" v-if="index<3">
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=249589786,2941481629&fm=26&gp=0.jpg" class="authorImg" />
          <div class="authorname" @click="toAuthor(item.autherID)">{{ item.realName }}</div>
        </div>
      </div>
      <div class="time">
        {{ refer.year }}
      </div>
    </div>

    <div class="brief">
      {{ refer.abstract }}
    </div>
    <div class="keyWord">
      <div v-for="(item, index) in refer.keyWord" class="keyWord-list" v-if="index<3">
          <div class="key">{{ item}}</div>
        </div>
    </div>
    <!-- <div class="read-time">
      <div class="read-time-content">{{ refer.readTimes }} Reads</div>
    </div> -->
    <div class="literature-ops">
      <div class="one-op"></div>
    </div>
  </div>
</template>

<script>
import YLiterature from "@/components/common/y-literature/y-literature";

export default {
  name: "Message",
  props: {
    refer: Object
  },
  components: {
    YLiterature
  },
  created() {
    console.log("followingcard"+this.refer);
  },
  methods: {
    toAuthor(authorID) {
      this.$router.push({
        path: "/intro",
        query: {
          userID: authorID
        }
      });
    },
    toLiterature(literatureID) {
      this.$router.push({
        path: "/literature",
        query: {
          literatureID: literatureID
        }
      });
      location.reload();
    }
  }
};
</script>

<style scoped>
.one-follow-literature {
  width: 100%;
  /* height: 200px; */
  border: 1px solid #dddddd;
  /* background-color: white; */
  padding: 30px 25px 18px 25px;
  margin-top: 20px;
  background: white;
}

.liter-img {
  width: 120px;
  height: 120px;
  display: inline-block;
  border: 1px solid #dddddd;
  background: #e2ebf0;
}

.one-follow-literature > .test1 {
  display: flex;
  /* align-items: center; */
}

.time {
  font-size: 12px;
  margin-left: 12px;
}

.title {
  font-size: 0.9rem;
  color: black;
  font-weight: 700;
  width: fit-content;
  height: 25px;
  line-height: 20px;
  padding-left: 5px;
  margin-top: 10px;
  margin-bottom: 5px;
}

.title:hover {
  cursor: pointer;
  border-bottom: 1px solid black;
}

.authors {
  height: 25px;
  margin-bottom: 5px;
  display: flex;
  justify-self: start;
}

.author-list {
  display: flex;
  flex-direction: row;
  margin-right: 10px;
  align-items: center;
}

.authorImg {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-top: 1.5px;
  margin-left: 5px;
}

.authorname {
  font-size: 0.8rem;
  color: #000000;
  margin-left: 5px;
}

.authorname:hover {
  cursor: pointer;
  border-bottom: 1px solid #000000;
}

.time {
  align-self: flex-end;
  margin-left: 40px;
  padding-bottom: 10px;
}

/* .read-time {
  width: 100%;
  height: 25px;
  font-size: 0.8rem;
  color: #999999;
  padding-left: 5px;
}

.read-time-content {
  height: 100%;
  margin-top: 3px;
} */

.brief {
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
}

.literature-ops {
  margin: 0 auto;
  width: 100%;
  height: calc(100% - 75px - 32px);
  display: flex;
}

.keyWord {
  display: flex;
  font-size: 14px;
  color: #999999;
  margin-bottom: 8px;
}
.keyWord-list {
  margin-right: 10px;
  margin-left: 5px;
}
</style>
