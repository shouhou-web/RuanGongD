<template>
  <!-- 文献详情页面 -->
  <div id="literature">
    <m-app-header></m-app-header>
    <div class="info-top-all">
      <div class="info-top">
        <div class="top-left">
          <div class="title content">
            <h2 class="li-title">{{ literature.title }}</h2>
          </div>
          <div class="authorname content">
            <span class="lable">作者：</span>
            <ul class="author-ul">
              <li
                class="author"
                @click="toAuthor(item.authorID)"
                v-for="(item, index) in literature.authorList"
                :key="index"
              >
                <l-author :author="item"></l-author>
              </li>
            </ul>

            <!-- <el-link href="?" target="_blank">{{
              literature.authorName
            }}</el-link> -->
          </div>
          <div class="abstract content">
            <div>
              <span class="lable">摘要：</span>
            </div>

            <span>{{ literature.abstract }}</span>
          </div>
          <div class="keyword content">
            <span class="lable">关键词：</span>

            <el-link
              v-for="(item, index) in literature.keyWord"
              :key="index"
              href="???"
            >
              {{ item.str }}
            </el-link>
          </div>
          <div class="button">
            <div class="button-left">
              <l-button
                size="small"
                :round="true"
                type="primary"
                @click="star()"
              >
                <i
                  :class="{
                    'el-icon-star-off': staroff,
                    'el-icon-star-on': staron,
                  }"
                ></i>
                <span> 收藏</span>
              </l-button>
              <l-button size="small" :round="true" type="primary">
                <i class="el-icon-edit"></i>
                <span> 引用</span>
              </l-button>
              <l-button size="small" :round="true" type="primary">
                <i class="el-icon-edit"></i>
                <span> 分享</span>
              </l-button>
              <l-button size="small" :round="true" type="primary">
                <i class="el-icon-edit"></i>
                <span> ？？？</span>
              </l-button>
            </div>
            <div class="button-right">
              <l-button size="medium" type="primary" class="report">
                <i class="el-icon-edit"></i>
                <span> 举报文献 </span>
              </l-button>
              <l-button size="medium" type="primary" class="download">
                <i class="el-icon-edit"></i>
                <span> 下载文献 </span>
              </l-button>
            </div>
          </div>
        </div>
        <div class="top-right">
          <div class="a1">文献来源</div>
          <div class="a2">
            <div class="b1">
              <img src="./img/test.jpg" alt="" />
            </div>
            <div class="b2">xxxxxxxxx期刊</div>
          </div>
        </div>
      </div>
      <div class="liter-op">
        <ul class="liter-op">
          <li
            class="op-item"
            @click="toChild(index)"
            :class="[
              currentIndex == index ? 'op-item--active' : 'op-item--inside',
            ]"
            v-for="(item, index) in navList"
            :key="index"
          >
            <div class="pointer"></div>
            <div class="op-content">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import LFollowlicard from "./childCpn/followlicard.vue";
import LAuthor from "./childCpn/author.vue";
import { getLiterature } from "network/literature";

export default {
  name: "Literature",
  components: {
    LFollowlicard,
    LAuthor,
  },
  data() {
    return {
      literature: {
        literatureID: "123",
        title: "Saber我的",
        authorList: [
          {
            autherID: "123",
            realName: "阿尔托莉雅",
            organization: "不列颠",
            work: "",
            image: "test",
            introduction:
              "身份为古不列颠传说中的亚瑟王。性格忠诚正直，谦逊有礼，个性认真。因有圣剑Excalibur的传承，在第四、五次圣杯战争中一直以“Saber”职阶被召唤到现世.身份为古不列颠传说中的亚瑟王。性格忠诚正直，谦逊有礼，个性认真。因有圣剑Excalibur的传承，在第四、五次圣杯战争中一直以“Saber”职阶被召唤到现世",
          },
          {
            authorID: "",
            realName: "lw",
            work: "",
            image: "test",
            organization: "",
            introduction: "",
          },
          {
            authorID: "",
            realName: "lw",
            work: "",
            image: "test",
            organization: "",
            introduction: "",
          },
        ],

        abstract:
          "Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的",
        keyWord: [
          {
            str: "Saber我的",
          },
          {
            str: "Saber我的",
          },
          {
            str: "Saber我的",
          },
        ],
        download: "",
      }, //文献

      staroff: true,
      staron: false,
      navList: [
        {
          name: "参考文献",
          router: "reference",
        },
        {
          name: "相关文献",
          router: "relation",
        },
        {
          name: "数据统计",
          router: "stats",
        },
        {
          name: "文献评论",
          router: "review",
        },
      ],
    };
  },
  methods: {
    star() {
      (this.staroff = !this.staroff), (this.staron = !this.staron);
    },
    toChild(index) {
      let target = this.navList[index].router;
      this.$router.push("/literature/" + target);
    },
    toAuthor(authorID) {
      this.$router.push({
        path: "/profile",
        query: {
          userID: authorID,
        },
      });
    },
  },
  create(){
    getLiterature(this.$route.query.literatureID)
    .then(res => {
      this.literature = res; 
    })
  },
  computed: {
    currentIndex() {
      switch (this.$route.path) {
        case "/literature/reference":
          return 0;
        case "/literature/relation":
          return 1;
        case "/literature/stats":
          return 2;
        case "/literature/review":
          return 3;
      }
    },
  },
};
</script>

<style scoped>
#literature {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.leftmenu {
  position: absolute;
}
.main {
  display: flex;
  flex-direction: column;
  width: 1100px;
  min-width: 600px;
  height: 600px;
  /* background: #ecf0f1; */
  margin: 0 auto;
}
.info-top-all {
  width: 100%;
  background: white;
  /* padding-bottom: 10px; */
}
.info-top {
  justify-content: space-between;
  display: flex;
  margin: 0 auto;
  width: 1100px;
}
.top-left {
  /* background: #dfe6e9; */
  width: 750px;
}
.top-left .author {
  margin-right: 10px;
}
.top-left .author-ul {
  display: flex;
}
.top-right {
  width: 250px;
  margin-top: 30px;
}
.top-right > .a1 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}
.top-right > .a2 {
  display: flex;
}
.top-right > .a2 > .b1 > img {
  width: 150px;
}
.top-right > .a2 > .b2 {
  margin-top: 50px;
  margin-left: 20px;
}

.liter-op {
  width: 1100px;
  margin: auto;
  /* height: 47px; */
  display: flex;
  /* margin-bottom: 5px; */
  padding-left: 5px;
}
.op-item {
  margin-top: 10px;
  margin-right: 30px;
  cursor: pointer;
}
.op-content {
  font-size: 14px;
  padding-bottom: 5px;
}

.op-item--inside {
  color: #6b757b;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 17.5px;
  /* padding-left: 5px; */
  /* padding-right: 5px;
  margin-right: 25px; */
  position: relative;
}

.op-item--inside:before {
  background-color: var(--color-tint);
  bottom: 0px;
  content: "";
  height: 1.7px;
  left: 50%;
  position: absolute;
  transition: all 0.3s;
  width: 0;
}

.op-item--inside:hover {
  color: var(--color-tint);
}

.op-item--inside:hover:before {
  left: 0;
  right: 0;
  width: 100%;
}

.op-item--active {
  color: var(--color-tint);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 17.5px;
  position: relative;
}

.op-item--active:before {
  background-color: var(--color-tint);
  bottom: 0px;
  content: "";
  height: 1.7px;
  left: 0%;
  position: absolute;
  transition: all 0.3s;
  width: 100%;
}

.op-bar {
  background-color: #4f6ef2;
  border-radius: 2px;
  height: 2px;
  /* width: 50px; */
  align-items: flex-end;
  flex-grow: 1;
  /* margin-top: 10px;
  margin-left: 20px; */
}

.title {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}
.abstract {
  display: flex;
  text-align: left;
  letter-spacing: 0.5px;
}
.lable {
  display: inline-block;
  width: 56px;
  font-weight: 700;
}
.content {
  margin-top: 15px;
  font-size: 14px;
  display: flex;
}
.el-link {
  margin-right: 8px;
}
.button {
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  width: 100%;
}
.button .l-button {
  padding: 5px 13px;
  margin-right: 25px;
}
.button .download {
  justify-self: flex-end;
}
.el-menu {
  background: #e2ebf0;
}
</style>
