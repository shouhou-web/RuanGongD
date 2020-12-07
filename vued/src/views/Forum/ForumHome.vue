<template>
  <!-- 讨论区主界面 -->
  <div id="forumHome">
<<<<<<< HEAD
    <m-app-header></m-app-header>
=======
    <div class="pageHeader">
      <div class="pageName">讨论区</div>
      <!-- 创建动态 -->
      <div class="pageTool"><create-post></create-post></div>
    </div>
>>>>>>> forum
    <ul>
      <li v-for="(item, index) in sectors" :key="index">
        <v-card class="sectorCard" elevation="1" tile>
          <!--
          <v-footer padless v-if="index == 0">
            <div></div>
          </v-footer>
          -->
          <el-row>
            <el-col :span="12">
              <v-card-title>
                <div class="sectorName" @click="goToSector(item.sectorId)">
                  {{ item.sectorName }}
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
                    class="avatar"
                    alt="Avatar"
                    :src="item.userAvatar"
                    @click="goToUser(item.userId)"
                  />
                </v-avatar>
              </v-card-text>
            </el-col>
            <el-col :span="8">
              <v-card-text>
                <div class="post">
                  <div class="title" @click="goToPost(item.postId)">
                    {{ handleTitle(item.postName) }}
                  </div>
                  <div class="info">
                    <span>
                      {{ editStr }}
                    </span>
                    <span class="userName" @click="goToUser(item.userId)">
                      {{ item.userName }}</span
                    >
                    <span> {{ handleInfo(item.editTime) }}</span>
                  </div>
                </div>
              </v-card-text>
            </el-col>
          </el-row>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { getAllSectors } from "network/forum.js";
import MHeader from "../../components/common/m-header/m-header.vue";
import CreatePost from "./childCpn/create-post.vue";
export default {
  name: "ForumHome",
  data() {
    return {
      editStr: "由 ",
      //sectors: []
      sectors: [
        {
          sectorId: "01",
          sectorName: "测试分区1",
          postNum: "1022",
          userId: "01",
          userAvatar: "https://i.loli.net/2020/08/11/8u6PdLt9vyCaUcX.png",
          userName: "测试用户",
          postId: "01",
          postName: "测试动态一二三四五六七八九十十一十二",
          editTime: "MM月dd日 HH:mm"
        },
        {
          sectorId: "02",
          sectorName: "测试分区2",
          postNum: "24",
          userId: "01",
          userAvatar: "https://i.loli.net/2020/08/11/Rqm3hEG6bnHLsd4.png",
          userName: "测试用户",
          postId: "01",
          postName: "测试动态",
          editTime: "MM月dd日 HH:mm"
        }
      ]
    };
  },
  methods: {
    handleNum(str) {
      let num = parseInt(str);
      if (num >= 1000000) return (num / 1000000).toFixed(1) + "m";
      if (num >= 1000) return (num / 1000).toFixed(1) + "k";
      return num.toString();
    },
    handleTitle(str) {
      let maxLength = 17;
      if (str.length > maxLength) return str.substring(0, maxLength - 2) + "..";
      return str;
    },
    handleInfo(time) {
      return " , 于 " + time;
    },
    goToUser(id) {
      //todo: 跳转到用户
      /*
      this.$router.push({
        path: "/",
        query: {}
      });
      */
    },
    goToSector(id) {
      //todo: 跳转到分区
      this.$router.push({
        path: "/forumSector",
        query: {
          sectorId: id,
          page: "1",
          sort: "0",
          keyword: ""
        }
      });
    },
    goToPost(id) {
      //跳转到动态
      this.$router.push({
        path: "/post",
        query: { postId: id }
      });
    }
  },
  components: { MHeader, CreatePost },
  created() {
    CreatePost;
    //todo: 获取分区信息
    getAllSectors()
      .then(res => {
        console.log("getAllSectors");
        console.log(res);
        this.sectors = res.data.sectors;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
#forumHome {
  margin: 0px auto;
  width: var(--width-main);
  /*background-image: url();*/
}
.m-header {
  width: 100vw;
  margin-bottom: 20px;
}
.pageHeader {
  margin: 1px auto;
  border-radius: 0px;
  width: 900px;
  background-color: white;
  height: auto;
  display: flex;
  flex-direction: column;
}
.pageName {
  margin: 20px 20px;
  font-size: 30px;
  font-style: bold;
  height: 20px;
}
.pageTool {
  height: 30px;
  margin-top: 5px;
  margin-left: 770px;
  margin-bottom: 20px;
}
.sectorCard {
  margin: 1px auto;
  border-radius: 0px;
  width: 900px;
}
.sectorName {
  cursor: pointer;
  font-size: 25px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.postNum {
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
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
}
.title {
  cursor: pointer;
  font-size: 17px;
}
.info {
  font-size: 10px;
}
.userName {
  cursor: pointer;
}
</style>
