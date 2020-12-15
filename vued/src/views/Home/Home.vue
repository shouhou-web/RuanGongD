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
                <i class="icon--one">{{ index + 1 }}</i>
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
      <div class="likes"></div>
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
          year: "1984"
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
  width: var(--width-main);
  margin: 40px auto;
}

.ciation {
  width: 850px;
}

.ciation__title {
  font-size: 22px;
  line-height: 24px;
}

.ciation__content {
  height: 320px;
  margin-top: 30px;
}

.ciation__content__id {
  height: 25px;
  line-height: 25px;
  width: 25px;
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
  transform: scale(0.5);
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
