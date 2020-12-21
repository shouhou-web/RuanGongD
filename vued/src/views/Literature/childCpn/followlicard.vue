<template>
  <div class="one-follow-literature">
    <div class="title" @click="toLiterature(refer.literatureID)">{{ refer.title }}</div>
    <div class="test1">
      <div class="authors">
        <div v-for="(item, index) in refer.authorList" class="author-list">
          <img :src="item.image" class="authorImg" />
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
      <div v-for="(item, index) in refer.keyWord" class="keyWord-list">
          <div class="key">{{ item}}</div>
        </div>
    </div>
    <div class="read-time">
      <div class="read-time-content">{{ refer.readTimes }} Reads</div>
    </div>
    <div class="literature-ops">
      <div class="one-op"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    refer: {
      literatureID: "",
      title: "",
      authorList: [
        //作者列表
        {
          authorID: "",
          realName: "",
          image: "", //头像
        },
      ],
      abstract: "", //摘要
      keyWord: [],
      year: "", //文献年份
      readTimes: 0, //阅读次数
    }, //文献
  },
  methods: {
    toAuthor(authorID) {
      this.$router.push({
        path: "/profile",
        query: {
          userID: authorID,
        },
      });
    },
    toLiterature(literatureID){
      this.$router.push({
        path: "/literature",
        query: {
          userID: literatureID,
        },
      });
    }
  },
  components: {},
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
}

.authorname:hover {
  cursor: pointer;
  border-bottom: 1px solid #000000;
}

.time{
  align-self:flex-end;
  margin-left: 40px;
  padding-bottom: 5px;
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

.keyWord{
  display: flex;
  font-size: 14px;
  color: #999999;
  margin-bottom: 8px;
}
.keyWord-list{
  margin-right: 10px;
  margin-left: 5px;
}
</style>
