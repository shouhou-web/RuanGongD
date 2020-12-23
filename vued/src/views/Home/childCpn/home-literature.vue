<template>
  <div id="ciation">
    <!-- <div class="ciation__title">
      {{ title }}
    </div> -->
    <div class="ciation__content">
      <ul>
        <li
          @click="toLiterature(item)"
          v-for="(item, index) in list"
          :key="index"
        >
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
              {{ item.authors[0].realName }}; {{ item.venue }}; {{ item.year }}
            </div>
          </div>
          <div class="ciation__content__num">
            {{ item.citation }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeLiterature",
  props: {
    list: Array,
    title: String
  },
  data() {
    return {};
  },
  methods: {
    toLiterature(item) {
      console.log(item);
      this.$router.push({
        path: "/literature",
        query: {
          literatureID: item.literatureID
        }
      });
    }
  }
};
</script>

<style scoped>
#ciation {
  /* height: 350px; */
  width: 830px;
  margin: 0 auto;
}

.ciation__title {
  font-size: 22px;
  line-height: 24px;
  text-align: center;
}

.ciation__content {
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

.ciation__content__main__title:hover {
  cursor: pointer;
  color: var(--color-tint);
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
