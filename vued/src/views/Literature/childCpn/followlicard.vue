<template>
  <div class="one-follow-literature">
    <div class="liter-img" v-for="(item, i) in refer.img">
      <img :src="item" alt="" />
    </div>
    <div class="title">{{ refer.title }}</div>
    <div class="test1">
      <div class="tags">
        <div class="tag" v-for="(a_tag, i) in refer.tags">
          <div :class="{ 'first-tag': i == 0, 'leftpart-tags': i != 0 }">
            {{ a_tag }}
          </div>
        </div>
      </div>
      <div class="time">
        {{ refer.time }}
      </div>
    </div>

    <div class="authors">
      <div
        v-for="(name, i) in refer.authors"
        class="author-list"
      >
        <img :src="refer.userImgSrc" class="authorImg" />
        <div class="authorname">{{ refer.name }}</div>
      </div>
    </div>
    <div class="brief">
      {{ refer.brief }}
    </div>
    <div class="read-time">
      <div class="read-time-content">
        {{ refer.read_time }} Reads
      </div>
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
      title: "",
    authors: [],
    tags: [],
    time: "",
    img: [],
    brief: "",
    read_time: 0,
    }
    
  },
  methods: {},
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
  align-items: center;
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

.tags {
  /* width: 100%; */
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
  background-color: #4f6ef2;
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
  border: 1px solid #4f6ef2;
  background-color: white;
  color: #4f6ef2;
}

.leftpart-tags:hover {
  cursor: pointer;
}

.authors {
  width: 100%;
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
  margin-left: 2px;
}

.authorname:hover {
  cursor: pointer;
  border-bottom: 1px solid #000000;
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
}

.literature-ops {
  margin: 0 auto;
  width: 100%;
  height: calc(100% - 75px - 32px);
  display: flex;
}

.one-op {
}
</style>
