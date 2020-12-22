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
                v-for="(item, index) in literature.authors"
                @click="toAuthor(item.userID, item.authorID)"
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
              v-if="index<3"
              href="javascript:void(0);"
            >
              <span @click="searchKey(item)">{{ item }}</span>
            </el-link>
          </div>
          <div class="doi content">
            <div>
              <span class="lable">DOI：</span>
            </div>

            <span>{{ literature.doi }}</span>
          </div>
          <div class="button">
            <div class="button-left">
              <l-button
                size="small"
                :round="true"
                type="primary"
                @click="collectLiterature()"
              >
                <i
                  :class="{
                    'el-icon-star-off': staroff,
                    'el-icon-star-on': staron
                  }"
                ></i>
                <span> 收藏</span>
              </l-button>
              <l-button
                size="small"
                :round="true"
                type="primary"
                @click="referFormat()"
              >
                <i class="el-icon-edit"></i>
                <span> 引用</span>
              </l-button>
              <!-- <l-button size="small" :round="true" type="primary">
                <i class="el-icon-position"></i>
                <span> 分享</span>
              </l-button> -->
            </div>
            <div class="button-right">
              <l-button
                size="medium"
                type="primary"
                class="report"
                @click="reportLi()"
              >
                <i class="el-icon-warning-outline"></i>
                <span> 举报文献 </span>
              </l-button>
              <l-button size="medium" type="primary" class="download">
                <i class="el-icon-download"></i>
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
            <div class="b2">{{ literature.venue }}</div>
          </div>
        </div>
      </div>
      <div class="liter-op">
        <ul class="liter-op">
          <li
            class="op-item"
            @click="toChild(index)"
            :class="[
              currentIndex == index ? 'op-item--active' : 'op-item--inside'
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

    <div data-app="true">
      <!-- 举报对话框  -->
      <v-dialog v-model="reportDialog" max-width="600">
        <v-card elevation="3">
          <v-card-title>举报文献</v-card-title>
          <v-card-text>
            <el-form
              :model="reportForm"
              label-width="80px"
              :rules="reportRule"
              ref="reportForm"
            >
              <el-form-item label="举报理由" prop="reportContent">
                <el-input
                  class="report-content"
                  type="textarea"
                  v-model="reportForm.reportContent"
                  placeholder="请输入举报理由"
                  :autosize="{ minRows: 5, maxRows: 12 }"
                  resize="none"
                  maxlength="801"
                ></el-input>
              </el-form-item>
            </el-form>
          </v-card-text>
          <v-card-actions>
            <div class="footer">
              <v-btn
                color="var(--color-main)"
                @click="handleReport('reportForm')"
              >
                <font color="white">举报</font>
              </v-btn>
              <v-btn @click="reportDialog = false">取消</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <m-hover ref="hover">
        <div class="hover-referformat1">
          MLA格式引文：{{ literature.MLAformat }}
        </div>
        <el-divider></el-divider>
        <div class="hover-referformat2">
          APA格式引文：{{ literature.APAformat }}
        </div>
      </m-hover>
    </div>
    <router-view
      v-if="literature != null"
      :literature="literature"
    ></router-view>
  </div>
</template>

<script>
import LFollowlicard from "./childCpn/followlicard.vue";
import LAuthor from "./childCpn/author.vue";
import { getLiterature, collect, reportLiterature } from "network/literature";
import {
  getPostInfo,
  deletePost,
  reportComment,
  deleteComment,
  commentPost
} from "network/forum.js";
import { search } from "network/search.js";
import { getAuthorInformation } from '../../network/literature';

export default {
  name: "Literature",
  components: {
    LFollowlicard,
    LAuthor
  },
  data() {
    return {
      literature: null,
      // literature: {
      //   literatureID: "123",
      //   title: "Saber我的",
      //   authorList: [
      //     {
      //       autherID: "123",
      //       realName: "阿尔托莉雅",
      //       organization: "不列颠",
      //       userID: "",
      //       image:
      //         "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=66747141,2601833110&fm=26&gp=0.jpg",
      //       introduction:
      //         "身份为古不列颠传说中的亚瑟王。性格忠诚正直，谦逊有礼，个性认真。因有圣剑Excalibur的传承，在第四、五次圣杯战争中一直以“Saber”职阶被召唤到现世.身份为古不列颠传说中的亚瑟王。性格忠诚正直，谦逊有礼，个性认真。因有圣剑Excalibur的传承，在第四、五次圣杯战争中一直以“Saber”职阶被召唤到现世"
      //     },
      //     {
      //       authorID: "",
      //       realName: "lw",
      //       userID: "",
      //       image: "test",
      //       organization: "",
      //       introduction: ""
      //     },
      //     {
      //       authorID: "",
      //       realName: "lw",
      //       userID: "",
      //       image: "test",
      //       organization: "",
      //       introduction: ""
      //     }
      //   ],

      //   abstract:
      //     "Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的",
      //   keyWord: ["Saber我的", "Saber我的", "Saber我的", "Saber我的", "Saber我的", "Saber我的"],
      //   download: "",
      //   MLAformat:
      //     "[1]俞文雅,陶红武,曾顺,谭跃刚.四足机器人斜坡对角小跑运动控制研究[J].武汉科技大学学报,2021,44(01):60-67.",
      //   APAformat: "qwertyuio",
      //   venue: "xxxxxxxx",
      //   doi: "123456"
      // }, //文献
      authorList:[],
      staroff: true,
      staron: false,
      navList: [
        {
          name: "相关文献",
          router: "relation"
        },
        {
          name: "数据统计",
          router: "stats"
        },
        {
          name: "文献评论",
          router: "review"
        }
      ],
      //举报相关
      reportDialog: false,
      reportForm: {
        reportContent: "",
        reportCommentId: ""
      },
      reportRule: {
        reportContent: [
          {
            required: true,
            message: "请输入举报理由",
            trigger: "blur"
          },
          {
            min: 5,
            max: 800,
            message: "举报理由长度在 5-800 个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    getLiterature(this.$route.query.literatureID).then(res => {
      console.log(res.literature);
      this.literature = res.literature;
    });
    for(let i=0; i<this.literature.authors;i++){
      getAuthorInformation(literature.authors[i])
      .then(res=>{
        this.authorList[i] = res[i];
      })
    }
    
  },
  methods: {
    collectLiterature() {
      //未登录用户无法收藏
      console.log(this.literature);
      if (this.$store.state.user == null) {
        this.$notify.warning("您还未登录");
      } else {
        let option = this.staroff == true ? 1 : 0;
        collect(
          this.$store.state.user.userID,
          this.literature.literatureID,
          this.literature.year,
          this.literature.venue,
          this.literature.title,
          option
        ).then(res => {
          console.log("collect", res);
          //收藏成功
          if (res == 0) {
            this.staroff = !this.staroff;
            this.staron = !this.staron;
            this.$notify.success("操作成功");
          }
          //收藏失败
          else if (res == -1) {
            this.$notify.warning("操作失败");
          }
        });
      }
    },
    referFormat() {
      this.$refs.hover.showHover({
        title: "引用文献"
      });
    },

    reportLi() {
      this.reportDialog = true;
    },
    // 举报
    handleReport(formName) {
      let pass = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          pass = true;
        }
      });
      if (!pass) return;

      reportLiterature(
        this.$store.state.user.userID,
        this.literature.literatureID,
        this.literature.title,
        this.reportForm.reportContent
      )
        .then(res => {
          console.log("report post");
          console.log(res);
          if (res == 0) {
            this.reportDialog = false;
            this.$notify.success("举报成功");
          } else {
            this.$notify.error("举报失败，请稍后再试。");
          }
        })
        .catch(err => {
          this.$notify.error("举报失败，请稍后再试。");
          console.log(err);
          console.log("test");
        });
    },
    toChild(index) {
      let target = this.navList[index].router;
      this.$router.push("/literature/" + target);
    },
    toAuthor(userID, authorID) {
      this.$router.push({
        path: "/profile",
        query: {
          userID: userID,
          autherID: authorID
        }
      });
    },
    searchKey(key) {
      console.log(key);
      let item = {
        legical: "NULL",
        type: "SU",
        value: key
      };
      search(item)
        .then(res => {
          this.$router.push({
            path: "/search",
            query: {
              start: "",
              end: "",
              litList1: res.literatureList1,
              litList2: res.literatureList2,
              authorList: res.authorList,
              venueList: res.venueList,
              yearList: res.yearList
            }
          });
        })
        .catch(err => {
          this.$notify.error({
            title: "错误",
            message: "网络异常，请稍后重试"
          });
        });
    }
  },
  computed: {
    currentIndex() {
      switch (this.$route.path) {
        case "/literature/relation":
          return 0;
        case "/literature/stats":
          return 1;
        case "/literature/review":
          return 2;
      }
    }
  }
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
  text-align: left;
  letter-spacing: 0.5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
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
  -webkit-user-select: text;
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
.report-content {
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin: auto;
  padding-bottom: 10px;
  width: 80%;
}
.footer .v-btn {
  margin-right: 20px;
}
.el-form-item {
  margin-bottom: 0;
}
.hover-referformat1 {
  font-size: 12px;
  margin-top: 20px;
  -webkit-user-select: text;
}
.hover-referformat2 {
  font-size: 12px;
  margin-bottom: 30px;
  -webkit-user-select: text;
}
</style>
