<template>
  <!-- 讨论区分区页面 -->
  <div>
    <m-app-header></m-app-header>
    <div class="pageHeaderBg">
      <div class="pageHeader">
        <div class="sectorName">{{ sectorName }}</div>
        <div class="sectorCreatePost">
          <create-post v-if="logined" :sectorId="sectorId"></create-post
          ><v-btn disabled v-if="!logined">
            <div>登录以发表动态</div>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div class="sectorTool">
          <el-row>
            <el-col :span="12">
              <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="changePage"
              >
              </el-pagination>
            </el-col>
            <el-col :offset="3" :span="4">
              <v-text-field
                v-model="keyword"
                class="searchInput"
                label="搜索动态"
                hide-details
                append-icon="search"
                @click:append="changeKeyword"
              >
              </v-text-field>
            </el-col>
            <el-col :span="3">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="toolButton"
                    small
                    dark
                    v-bind="attrs"
                    v-on="on"
                    color="#4F6EF2"
                  >
                    排序方式
                    <i class="el-icon-caret-bottom"></i>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in sortType"
                    :key="index"
                    link
                    @click="changeSort(item.type)"
                  >
                    <v-list-item-title>
                      <i
                        class="el-icon-check"
                        style="color:rgba(255,255,255,0)"
                        v-if="item.type != sort"
                      ></i>
                      <i class="el-icon-check" v-if="item.type == sort"></i>
                      <span class="menu">
                        {{ item.name }}
                      </span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </el-col>
            <el-col :span="2">
              <v-btn
                class="toolButton"
                small
                elevation="1"
                color="#4F6EF2"
                @click="followSector()"
                v-if="logined"
                ><div>{{ followedText }}</div></v-btn
              >
              <v-btn class="toolButton" small disabled v-if="!logined"
                ><div>关注</div></v-btn
              >
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div id="forumSector" data-app>
      <div>
        <div class="postCard" v-if="posts.length == 0">
          <div class="postsEmpty">無</div>
        </div>
        <ul>
          <li v-for="(item, index) in posts" :key="index">
            <v-card class="postCard" elevation="1" tile>
              <el-row>
                <el-col :span="12">
                  <div class="postInfo">
                    <v-card-title>
                      <div class="postName" @click="goToPost(item.postId)">
                        {{ handleTitle(item.postName, 48) }}
                      </div>
                    </v-card-title>
                    <v-card-subtitle>
                      <div class="creator">
                        <span>{{ createStr0 }}</span>
                        <span
                          class="creatorName"
                          @click="goToUser(item.creatorId)"
                          >{{ handleTitle(item.creatorName, 18) }}</span
                        >
                        <span>{{ createStr1 + item.createTime }}</span>
                      </div>
                      <div class="tags">
                        <div v-for="(tag, index) in item.tags" :key="index">
                          <v-chip label class="tag" small v-if="tag !== ''">
                            {{ tag }}
                          </v-chip>
                        </div>
                      </div>
                    </v-card-subtitle>
                  </div>
                </el-col>
                <el-col :span="3">
                  <v-card-subtitle>
                    <div class="displayNum">
                      <div class="replyNum">
                        <span>{{ handleNum(item.replyNum) }}</span>
                        <span>篇 回复</span>
                      </div>
                      <div class="viewNum">
                        <span>{{ handleNum(item.viewNum) }}</span>
                        <span>次 查看</span>
                      </div>
                    </div>
                  </v-card-subtitle>
                </el-col>
                <el-col :span="2">
                  <v-card-text>
                    <v-avatar class="avatar">
                      <img
                        alt="Avatar"
                        :src="item.editorAvatar"
                        @click="goToUser(item.editorId)"
                      />
                    </v-avatar>
                  </v-card-text>
                </el-col>
                <el-col :span="6">
                  <v-card-text>
                    <div class="editInfo">
                      <span>{{ editStr0 }}</span>
                      <span class="editorName" @click="goToUser(item.editorId)">
                        <span>
                          {{ handleTitle(item.editorName, 15) }}
                        </span>
                      </span>
                      <div class="editTime">
                        <span>
                          {{ editStr1 }}
                        </span>
                        <span> {{ item.editTime }}</span>
                      </div>
                    </div>
                  </v-card-text>
                </el-col>
              </el-row>
            </v-card>
          </li>
          <li>
            <v-bottom-navigation class="bottom" v-if="posts.length > 8">
              <v-btn @click="jumpToTop" class="jump" fab>
                返回页首<v-icon>north</v-icon>
              </v-btn>
            </v-bottom-navigation>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPosts,
  isFollowed,
  followSector,
  getPostNum,
  getUserIdentity
} from "network/forum.js";
import MHeader from "../../components/common/m-header/m-header.vue";
import CreatePost from "./childCpn/create-post.vue";
export default {
  name: "ForumSector",
  data() {
    return {
      sectorId: "01",
      page: "1",
      sort: "0",
      keyword: "",
      followed: "0",
      sectorName: "测试分区",
      createStr0: "由 ",
      createStr1: " 创建于 ",
      editStr0: "由 ",
      editStr1: "最后编辑于 ",
      pageSize: 0,
      totalPosts: "0",
      sortType: [
        { name: "最近更新", type: "0" },
        { name: "开始日期", type: "1" },
        { name: "标题", type: "2" },
        { name: "最多回复", type: "3" }
      ],
      posts: []
      /*posts: [
        {
          postId: "01",
          postName: "测试动态1",
          replyNum: "1023",
          viewNum: "1002001",
          creatorId: "01",
          creatorName: "测试用户",
          createTime: "MM月dd日 HH:mm",
          editorId: "02",
          editorName: "测测用户",
          editorAvatar: "https://i.loli.net/2020/08/11/Rqm3hEG6bnHLsd4.png",
          editTime: "MM月dd日 HH:mm",
          tags: ["测试标签1", "测试标签2", "测试标签3", "测试标签4"]
        },
        {
          postId: "01",
          postName:
            "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
          replyNum: "1023",
          viewNum: "1002001",
          creatorId: "01",
          creatorName: "一二三四五六七八九十一二三四五六七八九十",
          createTime: "MM月dd日 HH:mm",
          editorId: "02",
          editorName: "一二三四五六七八九十一二三四五六七八九十",
          editorAvatar: "https://i.loli.net/2020/08/11/Rqm3hEG6bnHLsd4.png",
          editTime: "MM月dd日 HH:mm",
          tags: ["测试标签1", "测试标签2", "测试标签3", "测试标签4"]
        },
        {
          postId: "01",
          postName:
            "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
          replyNum: "1023",
          viewNum: "1002001",
          creatorId: "01",
          creatorName: "测试用户",
          createTime: "MM月dd日 HH:mm",
          editorId: "02",
          editorName: "测测用户",
          editorAvatar: "https://i.loli.net/2020/08/11/Rqm3hEG6bnHLsd4.png",
          editTime: "MM月dd日 HH:mm",
          tags: []
        }
      ]*/
    };
  },
  methods: {
    handleNum(str) {
      let num = parseInt(str);
      if (num >= 1000000) return (num / 1000000).toFixed(1) + "m";
      if (num >= 1000) return (num / 1000).toFixed(1) + "k";
      return num.toString();
    },
    handleTitle(str, len) {
      let maxLength = len;
      if (str.length > maxLength) return str.substring(0, maxLength - 1) + "..";
      return str;
    },
    goToUser(id) {
      //跳转到用户
      getUserIdentity(id).then(res => {
        console.log(res);
        if (res.userIdentity == "1") {
          this.$router.push({
            path: "/intro",
            query: {
              userID: id,
              authorID: res.authorID,
              see: 0
            }
          });
        } else {
          this.$router.push({
            path: "/profile",
            query: {
              userID: id
            }
          });
        }
      });
    },
    goToPost(id) {
      //跳转到动态
      this.$router.push({
        path: "/forumPost",
        query: { postId: id }
      });
    },
    followSector() {
      //关注(或解除)分区
      let textString = this.followed == "0" ? "关注分区" : "取消关注分区";
      followSector(this.currentUser, this.sectorId)
        .then(res => {
          console.log("followSector");
          console.log(res);
          if (res.result == "true") {
            // alartSuccess
            this.$notify({
              title: "操作成功",
              message: "成功" + textString,
              type: "success"
            });
            this.followed = this.followed == "0" ? "1" : "0";
          } else {
            // alartFail
            this.$notify.error({
              title: "操作失败",
              message: "无法" + textString
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify.error({
            title: textString + "失败",
            message: "请稍后再试"
          });
        });
    },
    changePage(val) {
      this.$router.push({
        path: "/forumSector",
        query: {
          sectorId: this.sectorId,
          sectorName: this.sectorName,
          page: val.toString(),
          sort: this.sort,
          keyword: this.keyword
        }
      });
      this.$router.go(0);
    },
    changeSort(val) {
      if (val == this.sort) {
        //console.log(val + " " + this.sort);
        return;
      } else {
        this.$router.push({
          path: "/forumSector",
          query: {
            sectorId: this.sectorId,
            sectorName: this.sectorName,
            page: "1",
            sort: val,
            keyword: this.keyword
          }
        });
        this.$router.go(0);
      }
    },
    changeKeyword() {
      this.$router.push({
        path: "/forumSector",
        query: {
          sectorId: this.sectorId,
          sectorName: this.sectorName,
          page: "1",
          sort: this.sort,
          keyword: this.keyword
        }
      });
      this.$router.go(0);
    },
    jumpToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  computed: {
    total() {
      //return parseInt(this.totalPosts);
      /*getPostNum(this.sectorId)
        .then(res => {
          console.log(res);
          if (res.total) {
            this.totalPosts = res.total;
          }
        })
        .catch(err => {
          console.log(err);
        });*/
      return parseInt(this.totalPosts);
    },
    currentPage() {
      return parseInt(this.page);
    },
    followedText() {
      return this.followed === "0" ? "关注" : "已关注";
    },
    logined() {
      console.log("logined");
      console.log(this.$store.state.user != null);
      console.log(typeof currentUser != undefined);
      return this.$store.state.user != null && typeof currentUser != undefined;
    },
    currentUser() {
      //userId
      return this.$store.state.user.userID;
    }
  },
  components: { MHeader, CreatePost },
  created() {
    //this.$store.commit("login", { userID: "123" });
    this.sectorId = this.$route.query.sectorId;
    this.sectorName = this.$route.query.sectorName;
    this.page = this.$route.query.page || "1";
    this.sort = this.$route.query.sort || "0";
    this.keyword = this.$route.query.keyword || "";
    this.pageSize = this.$store.state.pageSize;
    //return;
    console.log(
      "forumSector:\n" +
        "sectorId: " +
        this.sectorId +
        "\npage: " +
        this.page +
        "\nsort: " +
        this.sort +
        '\nkeyword: "' +
        this.keyword +
        '"'
    );
    let start = ((parseInt(this.page) - 1) * this.pageSize).toString();
    //getPosts
    getPosts(
      this.sectorId,
      start,
      this.pageSize.toString(),
      this.sort,
      this.keyword
    )
      .then(res => {
        console.log("getPosts");
        console.log(res);
        this.posts = res.posts;
      })
      .catch(err => {
        console.log(err);
      });
    //isFollowed
    if (this.logined) {
      isFollowed(this.currentUser, this.sectorId)
        .then(res => {
          console.log("getPosts");
          console.log(res);
          this.followed = res.followed;
        })
        .catch(err => {
          console.log(err);
        });
    }
    //getPostNum
    getPostNum(this.sectorId,this.keyword)
      .then(res => {
        console.log("getPostNum");
        console.log(res);
        if (res.total) {
          this.totalPosts = res.total;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.pageHeaderBg {
  width: 100vw;
  background-color: white;
  box-shadow: 0px 1px 0px 0px rgba(225, 225, 225, 1);
}
.pageHeader {
  margin: 1px auto;
  border-radius: 0px;
  margin-bottom: 1px;
  width: 900px;
  background-color: white;
  height: 240px;
  display: flex;
  flex-direction: column;
}
.sectorName {
  margin: 40px 20px;
  font-size: 35px;
  font-style: bold;
  height: 50px;
}
.sectorCreatePost {
  height: 40px;
  margin-top: 5px;
  /*margin-left: 85.5%;*/
  margin-left: 2%;
  margin-bottom: 20px;
}
.sectorTool {
  height: 50px;
  margin-top: 10px;
}
.postsEmpty {
  color: grey;
  font-family: "FangSong";
  font-size: 100px;
  margin-left: 400px;
  margin-top: 100px;
}
.postCard {
  margin: 1px auto;
  border-radius: 0px;
  width: 900px;
}
.toolButton {
  margin-top: 4px;
  color: white;
}
.menu {
  font-size: 10px;
}
.searchInput {
  width: 120px;
  margin-top: -10px;
  margin-right: 10px;
}
#forumSector {
  margin: 20px auto;
}
/*.postInfo {
}*/
.postName {
  cursor: pointer;
  font-size: 17px;
}
.creator {
  font-size: 13px;
}
.creatorName {
  cursor: pointer;
  /*color: var(--color-tint);*/
}
.tags {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  line-height: 28px;
}
.tag {
  margin-right: 3px;
}
.displayNum {
  margin-left: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  font-size: 15px;
}
.replyNum {
  display: flex;
  justify-content: flex-end;
}
.viewNum {
  display: flex;
  justify-content: flex-end;
}
.avatar {
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  cursor: pointer;
}
.editInfo {
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
}
.editorName {
  cursor: pointer;
  font-size: 15px;
  /*color: var(--color-tint);*/
}
.editTime {
  font-size: 12px;
}
.bottom {
  width: 900px;
  margin: 1px auto;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18), 0 1px 3px rgba(0, 0, 0, 0.12);
}
.jump {
  margin-left: 820px;
  /*margin-top: 8px;*/
}
</style>
