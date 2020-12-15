<template>
  <!-- 文献详情页面 -->
  <div id="literature">
    <!-- <l-leftmenu class="leftmenu"></l-leftmenu> -->
    <!-- <div class="main"> -->
    <m-app-header></m-app-header>
    <div class="info-top-all">
      <div class="info-top">
        <div class="top-left">
          <div class="title content">
            <h2 class="li-title">{{ literature.title }}</h2>
          </div>
          <div class="authorname content">
            <span class="lable">作者：</span>
            <el-link href="?" target="_blank">{{
              literature.authorName
            }}</el-link>
            <!-- <a href="???"></a> -->
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
          <div class="doi content">
            <span class="lable">DOI：</span>
            <span>{{ literature.DOI }}</span>
          </div>
          <div class="classification content">
            <span class="lable">分类：</span>

            <el-link
              v-for="(item, index) in literature.classification"
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
                round="true"
                type="primary"
                @click="star()"
              >
                <i
                  :class="{
                    'el-icon-star-off': staroff,
                    'el-icon-star-on': staron,
                  }"
                ></i>
                <!-- <i :class="{'el-icon-star-off':true}"></i> -->
                <span> 收藏</span>
              </l-button>
              <l-button size="small" round="true" type="primary">
                <i class="el-icon-edit"></i>
                <span> 引用</span>
              </l-button>
              <l-button size="small" round="true" type="primary">
                <i class="el-icon-edit"></i>
                <span> 分享</span>
              </l-button>
              <l-button size="small" round="true" type="primary">
                <i class="el-icon-edit"></i>
                <span> ？？？</span>
              </l-button>
            </div>
            <div class="button-right">
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
            :class="[currentIndex == index ? 'op-item--active' : '']"
            v-for="(item, index) in navList"
            :key="index"
          >
            <div class="pointer"></div>
            <div class="op-content">
              {{ item.name }}
            </div>
            <!-- <div class="op-bar"></div> -->
          </li>
        </ul>
      </div>
    </div>

    <div class="info-bottom">
      <div class="liter">
        <ul>
          <li v-for="(item, index) in referList">
            <!-- <l-test class="litercard" :refer="refermsg"></l-test> -->
            <l-followlicard class="litercard" :refer="item"></l-followlicard>
          </li>
        </ul>
      </div>

      <div class="authercard">
        <div class="auth-top">
          <div class="auth-title">相关研究者</div>
        </div>
        <div class="auth-bottom">
          <div class="auth-part1">
            <div class="auth-part1-left">
              <div class="auth-name">阿尔托莉雅</div>
              <div class="auth-work">saber</div>
              <div class="auth-workunit">工作单位：不列颠</div>
            </div>
            <div class="auth-part1-right">
              <img
                src="./img/test.jpg"
                alt=""
                class="l-root-card--reporter-pic"
              />
            </div>
          </div>
          <div class="auth-part2">
            个人简介：身份为古不列颠传说中的亚瑟王。性格忠诚正直，谦逊有礼，个性认真。因有圣剑Excalibur的传承，在第四、五次圣杯战争中一直以“Saber”职阶被召唤到现世.身份为古不列颠传说中的亚瑟王。性格忠诚正直，谦逊有礼，个性认真。因有圣剑Excalibur的传承，在第四、五次圣杯战争中一直以“Saber”职阶被召唤到现世
          </div>
          <div class="auth-part3">
            <l-button>关注</l-button>
            <l-button>个人门户</l-button>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import LTest from "./childCpn/test.vue";
import LFollowlicard from "./childCpn/followlicard.vue";
import LLeftmenu from "./childCpn/leftmenu.vue";

export default {
  name: "Literature",
  components: {
    LTest,
    LLeftmenu,
    LFollowlicard,
  },
  data() {
    return {
      literature: {
        literatureID: "123",
        title: "Saber我的",
        authorID: "123456",
        authorName: "lw",
        abstract:
          "Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的",
        keyWord: [
          {
            id: 1,
            str: "Saber我的",
          },
          {
            id: 2,
            str: "Saber我的",
          },
          {
            id: 3,
            str: "Saber我的",
          },
        ],
        DOI: "123456",
        classification: [
          {
            id: 1,
            str: "fate",
          },
          {
            id: 2,
            str: "stay",
          },
          {
            id: 3,
            str: "night",
          },
        ],
      }, //文献
      staroff: true,
      staron: false,
      referList: [
        {
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: ["Saber", "Lancer"],
          tags: ["tag 1", "tag 2"],
          time: "2020-11-26",
          img: ["../img/test.jpg", "../img/test.jpg", "../img/test.jpg"],
          brief:
            "Tumor suppressor genes can be inactivated by several mechanisms and, in a majority of cases, both alleles need to be affected. One of the mechanisms of inactivation is due to deletions ranging from dozen to hundreds of nucleotides; such deletions are often missed by variant callers. HomDelDetect is a method to detect such homozygous deletions in cancer models, such as cancer cell lines and potentially patient tumor derived xenografts. This method can be applied to partial exome, whole exome, whole genome sequencing, and RNA-seq data. We applied our method across a panel of CCLE cancer cell lines and observed good concordance with SNP array-based analysis and also detected deletions which have been missed by variant callers and by SNP arrays, demonstrating the ability of HomDelDetect to improve the annotations of tumor suppressor genes in cancer models. This article is protected by copyright. All rights reserved​",
          read_time: 10,
        },
        {
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: ["Saber", "Lancer"],
          tags: ["tag 1", "tag 2"],
          time: "2020-11-26",
          img: ["../img/test.jpg", "../img/test.jpg", "../img/test.jpg"],
          brief:
            "Tumor suppressor genes can be inactivated by several mechanisms and, in a majority of cases, both alleles need to be affected. One of the mechanisms of inactivation is due to deletions ranging from dozen to hundreds of nucleotides; such deletions are often missed by variant callers. HomDelDetect is a method to detect such homozygous deletions in cancer models, such as cancer cell lines and potentially patient tumor derived xenografts. This method can be applied to partial exome, whole exome, whole genome sequencing, and RNA-seq data. We applied our method across a panel of CCLE cancer cell lines and observed good concordance with SNP array-based analysis and also detected deletions which have been missed by variant callers and by SNP arrays, demonstrating the ability of HomDelDetect to improve the annotations of tumor suppressor genes in cancer models. This article is protected by copyright. All rights reserved​",
          read_time: 10,
        },
      ],
      refermsg: {
        title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
        authors: ["Saber", "Lancer"],
        tags: ["tag 1", "tag 2"],
        time: "2020-11-26",
        img: ["../img/test.jpg", "../img/test.jpg", "../img/test.jpg"],
        brief:
          "Tumor suppressor genes can be inactivated by several mechanisms and, in a majority of cases, both alleles need to be affected. One of the mechanisms of inactivation is due to deletions ranging from dozen to hundreds of nucleotides; such deletions are often missed by variant callers. HomDelDetect is a method to detect such homozygous deletions in cancer models, such as cancer cell lines and potentially patient tumor derived xenografts. This method can be applied to partial exome, whole exome, whole genome sequencing, and RNA-seq data. We applied our method across a panel of CCLE cancer cell lines and observed good concordance with SNP array-based analysis and also detected deletions which have been missed by variant callers and by SNP arrays, demonstrating the ability of HomDelDetect to improve the annotations of tumor suppressor genes in cancer models. This article is protected by copyright. All rights reserved​",
        read_time: 10,
      },
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
          name: "文献评论",
          router: "comment",
        },
        {
          name: "相关动态",
          router: "news",
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
  },
  computed: {
    currentIndex() {
      switch (this.$route.path) {
        case "/literature/reference":
          return 0;
        case "/message/invitation":
          return 1;
        case "/message/comment":
          return 2;
        case "/message/system":
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
.top-right {
  width: 250px;
  margin-top: 50px;
}
.top-right > .a1 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
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
  margin-top: 20px;
  margin-right: 30px;
  cursor: pointer;
}
.op-content {
  font-size: 14px;
  padding-bottom: 5px;
}

.op-item--active,
.op-item:hover {
  /* color: #2faee3; */
  color: var(--color-tint);
  /* text-decoration:underline */
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

.info-bottom {
  width: 1100px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.info-bottom .authercard {
  width: 325px;
  height: 350px;
  border: 1px solid #95a5a6;
  margin-top: 20px;
  margin-right: 20px;
  background: white;
  /* background: rgb(245, 240, 240); */
}

/*.authercard的样式在这块定义*/
.authercard {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.authercard .auth-top {
  height: 65px;
  width: 100%;
  border-bottom-color: black;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.authercard .auth-title {
  font-size: 18px;
}

.auth-bottom {
  display: flex;
  flex-direction: column;
  width: 80%;
  align-self: center;
  align-items: center;
}

.authercard .auth-part1 {
  display: flex;
  width: 100%;
  /* background: rgb(243, 230, 230); */
}

.authercard .auth-part1-left {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 15px;
  margin-top: 10px;
  /* background: #000; */
}

.authercard .auth-name{
  font-weight: 600;
}

.authercard .auth-work{
  color: #777;
}

.authercard .auth-workunit{
  color: #777;
}

.authercard .auth-part1-right {
  align-self: flex-end;
}

.authercard .auth-part2{
  margin-top: 10px;
  font-size: 13px;
  margin-right: 25px;
  text-align: justify;
    display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 8;
overflow: hidden;
}

.authercard .auth-part3{
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.authercard .auth-part3 .l-button{
  margin-right: 30px;
}

.l-root-card--reporter-pic {
  border-radius: 30px;
  border: 1px solid #e83015;
  cursor: pointer;
  height: 60px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 5px;
  margin-top: 10px;
  transition: 0.2s;
  width: 60px;
}

.l-root-card--reporter-pic:hover {
  box-shadow: 0px 0px 1px 2px rgba(224, 37, 62, 0.219);
  transition: 0.2s;
}
/*完*/
.info-bottom .litercard {
  width: 700px;
  /* height: 450px; */
  /* border: 3px solid #95a5a6; */
  /* margin-top: 5px; */
  /* background: rgb(245, 240, 240); */
}
.title {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}
.abstract {
  display: flex;
  text-align: left;
}
.lable {
  display: inline-block;
  width: 56px;
  font-weight: 700;
}
.content {
  margin-top: 15px;
  font-size: 14px;
}
.el-link {
  margin-right: 8px;
}
.button {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
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
