<template>
  <!-- 讨论区主界面 -->
  <div>
    <m-app-header></m-app-header>
    <!--<v-btn @click="display = true">发送消息</v-btn>
    <create-consultation
      :senderId="'0001'"
      :receiverId="'0002'"
      :display="display"
      @closeDialog="closeDg()"
    >
    </create-consultation>-->
    <div class="pageHeaderBg">
      <div class="pageHeader">
        <div class="pageName">讨论区</div>
        <!-- 创建动态 -->
        <div class="pageTool">
          <create-post v-if="logined"></create-post
          ><v-btn disabled v-if="!logined">
            <div>登录以发表动态</div>
          </v-btn>
          <el-switch
            class="showF"
            v-if="logined"
            v-model="showFollowed"
            active-text="只显示已关注的分区"
          >
          </el-switch>
        </div>
      </div>
    </div>
    <div id="forumHome">
      <el-row>
        <el-col :span="16">
          <ul>
            <li
              v-if="sectors.length == 0 || (showFollowed && followedCount == 0)"
            >
              <div class="sectorEmpty">
                <div class="sectorEmptyText">無</div>
              </div>
            </li>
            <li v-for="(item, index) in sectors" :key="index">
              <v-card
                class="sectorCard"
                elevation="1"
                tile
                flat
                v-if="!showFollowed || item.followed == '1'"
              >
                <el-row>
                  <el-col :span="12">
                    <v-card-title>
                      <div
                        class="sectorName"
                        @click="goToSector(item.sectorId, item.sectorName)"
                      >
                        {{ handleTitle(item.sectorName, 42) }}
                      </div>
                    </v-card-title>
                  </el-col>
                  <el-col :span="2">
                    <v-card-subtitle>
                      <div class="postNum">
                        <div class="sectorPostNum">
                          {{ handleNum(item.postNum) }}
                        </div>
                        <div class="sectorPostNumStr">
                          条 动态
                        </div>
                      </div>
                    </v-card-subtitle>
                  </el-col>
                  <el-col :span="2">
                    <v-card-text>
                      <v-avatar>
                        <img
                          v-if="item.postNum > 0"
                          class="avatar"
                          alt="Avatar"
                          :src="item.userAvatar"
                          @click="goToUser(item.userId)"
                        />
                      </v-avatar>
                    </v-card-text>
                  </el-col>
                  <el-col :span="8">
                    <v-card-text v-if="item.postNum > 0">
                      <div class="post">
                        <div class="title" @click="goToPost(item.postId)">
                          {{ handleTitle(item.postName, 32) }}
                        </div>
                        <div class="info">
                          <span>
                            {{ editStr }}
                          </span>
                          <span class="userName" @click="goToUser(item.userId)">
                            {{
                              handleTitle(
                                item.userName,
                                handleInfo(item.editTime).length == 16 ? 5 : 6
                              )
                            }}</span
                          >
                          <span class="editTime">
                            {{ handleInfo(item.editTime) }}</span
                          >
                        </div>
                      </div>
                    </v-card-text>
                    <v-card-text>
                      <div class="postEmpty" v-if="item.postNum == 0">
                        该分区暂无动态
                      </div>
                    </v-card-text>
                  </el-col>
                </el-row>
              </v-card>
            </li>
          </ul>
        </el-col>
        <el-col :offset="1" :span="7">
          <div class="fPosts">
            <div class="fHeader">
              <div class="fHeaderText">
                我关注的人的动态
              </div>
            </div>
            <div class="fContentEmpty" v-if="posts.length == 0 && logined">
              无
            </div>
            <div class="fContentEmpty" v-if="posts.length == 0 && !logined">
              登录以查看
            </div>
            <div class="fContent" v-if="posts.length > 0">
              <ul>
                <li v-for="(item, index) in posts" :key="index">
                  <v-card class="postCard" elevation="1" tile flat>
                    <v-card-title>
                      <v-avatar size="30">
                        <img
                          class="creatorAvatar"
                          alt="Avatar"
                          :src="item.creatorAvatar"
                          @click="goToUser(item.creatorId)"
                        />
                      </v-avatar>
                      <div
                        class="creatorName"
                        @click="goToUser(item.creatorId)"
                      >
                        {{ handleTitle(item.creatorName, 18) }}
                      </div>
                    </v-card-title>
                    <v-card-title
                      ><div class="fPostName" @click="goToPost(item.postId)">
                        {{ handleTitle(item.postName, 36) }}
                      </div>
                    </v-card-title>
                    <v-card-subtitle>
                      <div class="fPostInfo">
                        <div class="fPostReplyNum">
                          <v-icon size="0.875rem">
                            comment
                          </v-icon>
                          {{ handleNum(item.replyNum) }}
                        </div>
                        <div class="fPostViewNum">
                          <v-icon size="0.875rem">
                            mdi-eye
                          </v-icon>
                          {{ handleNum(item.viewNum) }}
                        </div>
                        <div class="fPostTime">
                          <span> 创建于 </span>
                          <span> {{ item.createTime }}</span>
                        </div>
                      </div>
                      <div class="fPostTags">
                        <div v-for="(tag, index) in item.tags" :key="index">
                          <v-chip
                            label
                            class="fPostTag"
                            x-small
                            v-if="tag !== ''"
                          >
                            {{ tag }}
                          </v-chip>
                        </div>
                      </div>
                    </v-card-subtitle>
                  </v-card>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getAllSectors,
  getFollowedPosts,
  isFollowedAll,
  getUserIdentity
} from "network/forum.js";
import MHeader from "../../components/common/m-header/m-header.vue";
import CreatePost from "./childCpn/create-post.vue";
import CreateConsultation from "./childCpn/create-consultation.vue";

export default {
  name: "ForumHome",
  data() {
    return {
      display: false,
      editStr: "由 ",
      showFollowed: false,
      followedCount: 0,
      sectors: [],
      /*sectors: [
        {
          sectorId: "1",
          sectorName: "测试分区1",
          followed: "1",
          postNum: "1022",
          userId: "01",
          userAvatar: "https://i.loli.net/2020/08/11/8u6PdLt9vyCaUcX.png",
          userName: "测试用户户",
          postId: "01",
          postName:
            "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
          editTime: "MM月dd日 HH:mm"
        },
        {
          sectorId: "02",
          sectorName:
            "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
          followed: "0",
          postNum: "24",
          userId: "01",
          userAvatar: "https://i.loli.net/2020/08/11/Rqm3hEG6bnHLsd4.png",
          userName: "测试用户一二",
          postId: "01",
          postName: "测试动态",
          editTime: "yyyy年MM月dd日"
        },
        {
          sectorId: "03",
          sectorName: "测试分区1",
          //followed: "1",
          postNum: "0",
          userId: "",
          userAvatar: "",
          userName: "",
          postId: "",
          postName: "",
          editTime: ""
        }
      ],*/
      posts: []
      /*posts: [
        {
          postId: "01",
          postName:
            "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
          replyNum: "1023",
          viewNum: "1002001",
          creatorId: "01",
          creatorName: "测试用户",
          creatorAvatar: "https://i.loli.net/2020/08/11/Rqm3hEG6bnHLsd4.png",
          createTime: "yyyy-MM-dd",
          tags: ["测试标签1", "测试标签2", "测试标签3", "测试标签4"]
        },
        {
          postId: "01",
          postName: "一二三四五六七八九十一二三四五六七八九十一二三四五六",
          replyNum: "1023",
          viewNum: "1002001",
          creatorId: "01",
          creatorName:
            "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
          creatorAvatar: "https://i.loli.net/2020/08/11/Rqm3hEG6bnHLsd4.png",
          createTime: "yyyy-MM-dd",
          tags: ["测试标签1", "测试标签2", "测试标签3", "测试标签4"]
        },
        {
          postId: "01",
          postName:
            "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
          replyNum: "1023",
          viewNum: "1002001",
          creatorId: "01",
          creatorName: "测试用户",
          creatorAvatar: "https://i.loli.net/2020/08/11/Rqm3hEG6bnHLsd4.png",
          createTime: "yyyy-MM-dd",
          tags: ["测试标签1", "测试标签2", "测试标签3", "测试标签4"]
        },
        {
          postId: "01",
          postName:
            "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
          replyNum: "1023",
          viewNum: "1002001",
          creatorId: "01",
          creatorName: "测试用户",
          creatorAvatar: "https://i.loli.net/2020/08/11/Rqm3hEG6bnHLsd4.png",
          createTime: "yyyy-MM-dd",
          tags: ["测试标签1", "测试标签2", "测试标签3", "测试标签4"]
        },
        {
          postId: "01",
          postName:
            "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
          replyNum: "1023",
          viewNum: "1002001",
          creatorId: "01",
          creatorName: "测试用户",
          creatorAvatar: "https://i.loli.net/2020/08/11/Rqm3hEG6bnHLsd4.png",
          createTime: "yyyy-MM-dd",
          tags: [""]
        }
      ]*/
    };
  },
  watch: {},
  methods: {
    closeDg() {
      this.display = false;
      console.log("dialogClosed");
    },
    handleNum(str) {
      let num = parseInt(str);
      if (num >= 1000000) return (num / 1000000).toFixed(1) + "m";
      if (num >= 1000) return (num / 1000).toFixed(1) + "k";
      return num.toString();
    },
    handleTitle(str, len) {
      //console.log("handleTitle: " + len);
      let maxLength = len;
      if (str.length > maxLength) return str.substring(0, maxLength - 1) + "..";
      return str;
    },
    handleInfo(time) {
      return "回复于 " + time;
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
    goToSector(id, name) {
      //跳转到分区
      this.$router.push({
        path: "/forumSector",
        query: {
          sectorId: id,
          sectorName: name,
          page: "1",
          sort: "0",
          keyword: ""
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
    handleFollowed() {
      let i;
      console.log("handleFollowed:sectors");
      console.log(this.sectors);
      for (i = 0; i < this.sectors.length; i++) {
        isFollowed(this.currentUser, this.sectors[i].sectorId).then(res => {
          //console.log("sectori:"+i+" "+sectors[i]);
          this.sectors[i].followed = res.followed;
          console.log("res: " + res);
          if (res.followed == "1") this.followedCount++;
        });
      }
      console.log("followedCount: " + this.followedCount);
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user.userID;
    },
    logined() {
      console.log("logined");
      console.log(this.$store.state.user != null);
      console.log(typeof currentUser != undefined);
      return this.$store.state.user != null && typeof currentUser != undefined;
    }
  },
  components: { MHeader, CreatePost, CreateConsultation },
  created() {
    //return;
    //this.$store.commit("login", { userID: "123" });
    //this.sectors[2].followed="1"
    getAllSectors()
      .then(res => {
        console.log("getAllSectors");
        console.log(res);
        this.sectors = res.sectors;
        if (this.logined) {
          isFollowedAll(this.currentUser).then(res => {
            console.log("isFollowedAll");
            console.log(res);
            let followedAll = res.sectors;
            for (let i = 0; i < this.sectors.length; i++) {
              let temp = "0";
              for (let j = 0; j < followedAll.length; j++) {
                if (followedAll[i].sectorId === this.sectors[i].sectorId) {
                  temp = followedAll[i].followed;
                  break;
                }
              }
              if (temp === "1") this.followedCount++;
              this.sectors[i].followed = temp;
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    //return;
    if (this.logined) {
      getFollowedPosts(this.currentUser)
        .then(res => {
          console.log("getFollowedPosts");
          console.log(res);
          this.posts = res.posts;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.posts = [];
    }
  }
};
</script>

<style scoped>
#forumHome {
  margin: 20px auto;
  width: var(--width-main);
}
.m-header {
  width: 100vw;
  margin-bottom: 20px;
}
.pageHeaderBg {
  width: 100vw;
  background-color: white;
  box-shadow: 0px 1px 0px 0px rgba(225, 225, 225, 1);
}
.pageHeader {
  margin: 1px auto;
  margin-bottom: 1px;
  border-radius: 0px;
  width: 1120px;
  height: 190px;
  display: flex;
  flex-direction: column;
}
.pageName {
  margin: 40px 20px;
  font-size: 35px;
  font-style: bold;
  height: 50px;
}
.pageTool {
  display: flex;
  height: 50px;
  margin-top: 5px;
  /*margin-left: 85.5%;*/
  margin-left: 2%;
  margin-bottom: 20px;
}
.showF {
  margin-left: 20px;
  margin-top: 8px;
}
.sectorEmpty {
  border-radius: 0px;
  width: 900px;
}
.sectorEmptyText {
  color: grey;
  font-family: "FangSong";
  font-size: 100px;
  margin-left: 350px;
  margin-top: 100px;
}
.sectorCard {
  border: 1px solid #ddd;
  margin: -1px auto;
  border-radius: 0px;
  width: 900px;
  /*min-height: 100px;*/
}
.sectorName {
  max-width: 50%;
  cursor: pointer;
  font-size: 17px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.postNum {
  margin-left: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
}
.sectorPostNum {
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
}
.sectorPostNumStr {
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  color: grey;
}
.avatar {
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  cursor: pointer;
}
.post {
  margin-left: -5px;
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
}
.postEmpty {
  margin-left: -5px;
  position: absolute;
  top: 48%;
  transform: translateY(-45%);
  font-size: 20px;
  /*color: grey;*/
  color: white;
}
.title {
  cursor: pointer;
  font-size: 14px;
}
/*.info {
  
}*/
.userName {
  font-size: 10px;
  cursor: pointer;
}
.editTime {
  font-size: 8px;
}
.fPosts {
  /*overflow: auto;*/
  border: 1px solid #ddd;
  background-color: white;
  /*max-height: 800px;*/
}
.fHeader {
  border-bottom: 1px solid #ddd;
  height: 30px;
}
.fHeaderText {
  margin-left: 15px;
  margin-top: 4%;
  font-size: 17px;
  font-style: bold;
  color: gray;
}
.fContentEmpty {
  font-size: 25px;
  color: grey;
  height: 50px;
  margin-left: 20px;
  margin-top: 20px;
}
.fContent {
  overflow: auto;
  max-height: 600px;
}
.fContent::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.fContent::-webkit-scrollbar-track {
  border-radius: 0px;
  background-color: rgba(0, 0, 0, 0.05);
}
.fContent::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
}
.postCard {
  border-bottom: 1px solid #ddd;
}
.creatorAvatar {
  cursor: pointer;
  /*border-bottom: 1px solid #ddd;*/
}
.creatorName {
  /*display: flex;
  align-items: center;*/
  font-size: 13px;
  margin-left: 10px;
  cursor: pointer;
}
.fPostName {
  font-size: 15px;
  margin-top: -30px;
  cursor: pointer;
}
.fPostInfo {
  display: flex;
  justify-content: space-between;
}
.fPostReplyNum {
  margin-right: -10px;
}
.fPostViewNum {
  margin-right: 50px;
}
.fPostTime {
  font-size: 12px;
  
}
.fPostTags {
  margin-top: 6px;
  font-size: 10px;
  display: flex;
  flex-flow: row wrap;
}
.fPostTag {
  margin-right: 3px;
}
</style>
