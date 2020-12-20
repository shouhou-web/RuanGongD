<template>
  <!-- Home -->
  <div id="home">
    <m-app-header></m-app-header>
    <!-- 主页面 -->
    <div class="logo">
      <img src="@/assets/image/home/logo.png" alt="" />
    </div>
    <search-advance
      @change-list="changeList"
      @change-time="changeTime"
      :isShow="true"
    />
    <div class="footer">
      <!-- 高被引论文 -->
      <div class="ciation">
        <div class="ciation__title">
          高被引论文
        </div>
        <div class="ciation__content">
          <ul>
            <li v-for="(item, index) in ciationList" :key="index">
              <div class="ciation__content__id">
                <i v-if="index == 0" class="icon--one">{{ index + 1 }}</i>
                <i v-else-if="index == 1" class="icon--two">{{ index + 1 }}</i>
                <i v-else-if="index == 2" class="icon--three">
                  {{ index + 1 }}
                </i>
                <i v-else class="icon--other">{{ index + 1 }}</i>
              </div>
              <div class="ciation__content__main">
                <div class="ciation__content__main__title">
                  {{ item.title }}
                </div>
                <div class="ciation__content__main__detail">
                  {{ item.author }}; {{ item.venue }}; {{ item.year }}
                </div>
              </div>
              <div class="ciation__content__num">
                {{ item.ciation }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 收藏论文 -->
      <div class="likes">
        <div class="likes__header">
          <span class="likes__header__title">热门论文</span>
          <span class="likes__header__aside">热度</span>
        </div>
        <div class="likes__main">
          <ul>
            <li
              class="likes__item"
              v-for="(item, index) in ciationList"
              :key="index"
            >
              <div class="likes__item__id">
                <i v-if="index == 0" class="icon--one">{{ index + 1 }}</i>
                <i v-else-if="index == 1" class="icon--two">{{ index + 1 }}</i>
                <i v-else-if="index == 2" class="icon--three">
                  {{ index + 1 }}
                </i>
                <i v-else class="icon--other">{{ index + 1 }}</i>
              </div>
              <div class="likes__item__title">
                {{ item.title }}
              </div>
              <div class="likes__item__num">
                {{ item.ciation }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchAdvance from "./childCpn/search-advance";
export default {
  name: "Home",
  data() {
    return {
      ciationList: [
        {
          id: "123",
          title: "论中国民族民间舞的风格与规格",
          author: "国华",
          venue: "人民音乐",
          year: "1984",
          ciation: 158
        },
        {
          id: "123",
          title: "论中国民族民间舞的风格与规格",
          author: "国华",
          venue: "人民音乐",
          year: "1984",
          ciation: 158
        },
        {
          id: "123",
          title: "论中国民族民间舞的风格与规格",
          author: "国华",
          venue: "人民音乐",
          year: "1984",
          ciation: 158
        },
        {
          id: "123",
          title: "论中国民族民间舞的风格与规格",
          author: "国华",
          venue: "人民音乐",
          year: "1984",
          ciation: 158
        },
        {
          id: "123",
          title: "论中国民族民间舞的风格与规格",
          author: "国华",
          venue: "人民音乐",
          year: "1984",
          ciation: 158
        },
        {
          id: "123",
          title: "论中国民族民间舞的风格与规格",
          author: "国华",
          venue: "人民音乐",
          year: "1984",
          ciation: 158
        },
        {
          id: "123",
          title: "论中国民族民间舞的风格与规格",
          author: "国华",
          venue: "人民音乐",
          year: "1984",
          ciation: 158
        },
        {
          id: "123",
          title: "论中国民族民间舞的风格与规格",
          author: "国华",
          venue: "人民音乐",
          year: "1984",
          ciation: 158
        },
        {
          id: "123",
          title: "论中国民族民间舞的风格与规格",
          author: "国华",
          venue: "人民音乐",
          year: "1984",
          ciation: 158
        },
        {
          id: "123",
          title: "论中国民族民间舞的风格与规格",
          author: "国华",
          venue: "人民音乐",
          year: "1984",
          ciation: 158
        }
      ],
      start: "",
      end: ""
    };
  },
  methods: {
    changeList(e) {
      this.searchList = e;
    },
    changeTime(e) {
      this.start = e.start;
      this.end = e.end;
    }
  },
  components: {
    searchAdvance
  }
};
</script>

<style scoped>
#home {
  background-color: #fff;
  min-height: 100vh;
  max-height: 100vh;
  overflow: auto;
}

.logo {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.logo img {
  width: 114px;
}

.footer {
  display: flex;
  justify-content: space-between;
  /* width: var(--width-main); */
  width: 1280px;
  margin: 40px auto;
}

.ciation {
  width: 850px;
}

.ciation__title,
.likes__header__title {
  font-size: 22px;
  line-height: 24px;
}

.ciation__content {
  height: 320px;
  margin-top: 30px;
}

.ciation__content ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ciation__content li {
  display: flex;
  justify-content: space-between;
  width: 403px;
  margin-bottom: 15px;
}

.ciation__content__id {
  height: 25px;
  line-height: 25px;
  width: 25px;
}

.ciation__content__id i {
  transform: scale(0.5);
}

.ciation__content__main {
  flex: 1;
  margin-left: 20px;
}

.ciation__content__main__title {
  width: 310px;
  font-size: 16px;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ciation__content__main__detail {
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  margin-top: 5px;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ciation__content__num {
  height: 25px;
  line-height: 25px;
  width: auto;
  text-align: right;
  color: #3951b3;
}

.likes {
  width: 350px;
}

.likes__header {
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.likes__header__aside {
  color: #666;
  font-size: 14px;
}

.likes__main li {
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 21px;
  line-height: 21px;
  margin-bottom: 13px;
}

.likes__item {
  cursor: pointer;
}

.likes__item:hover .likes__item__title {
  color: #315ef8 !important;
  font-weight: 600;
}

.likes__item:hover .likes__item__num {
  color: #666;
}

.likes__item__id {
  width: 21px;
  height: 21px;
}

.likes__item__id i {
  transform: scale(0.42);
}

.likes__item__title {
  margin-left: 15px;
  flex: 1;
  font-size: 14px;
  height: 21px;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.likes__item__num {
  width: 50px;
  float: right;
  font-size: 14px;
  color: #afafaf;
  height: 21px;
  text-align: right;
}

i {
  display: inline-block;
  height: 50px;
  width: 50px;
  vertical-align: middle;
  text-align: center;
  line-height: 50px;
  font-size: 32px;
  font-style: normal;
  transform-origin: left top;
}

.icon--one {
  background: url(https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/scholar_mid/static/protocol/https/xueshu/img/css_sprites_5b400ea.png) -10px -270px;
  color: #fff;
}

.icon--two {
  background: url(https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/scholar_mid/static/protocol/https/xueshu/img/css_sprites_5b400ea.png) -274px -150px;
  color: #fff;
}

.icon--three {
  background: url(https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/scholar_mid/static/protocol/https/xueshu/img/css_sprites_5b400ea.png) -274px -80px;
  color: #fff;
}

.icon--other {
  background: url(https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/scholar_mid/static/protocol/https/xueshu/img/css_sprites_5b400ea.png) -274px -10px;
  color: #999;
}
</style>
