<template>
  <!-- 论坛主界面 -->
  <div id="forumHome">
    <ul>
      <li v-for="(item, index) in sectors" :key="index">
        <v-card class="sectorCard" max-width="800" elevation="1" tile>
          <el-row>
            <el-col :span="10">
              <v-card-title>
                <div class="sectorName" @click="goToSector(item.sectorId)">
                  {{ item.sectorName }}
                </div>
              </v-card-title>
            </el-col>
            <el-col :span="3">
              <v-card-subtitle>
                <div class="postNum">
                  <div class="sectorPostNum">
                    {{ _postNum(item.postNum) }}
                  </div>
                  <div class="sectorPostNumStr">
                    条 动态
                  </div>
                </div>
              </v-card-subtitle>
            </el-col>
            <el-col :span="2">
              <v-card-text>
                <v-avatar tile>
                  <img
                    class="avatar"
                    alt="Avatar"
                    :src="item.userAvatar"
                    @click="goToUser(item.userId)"
                  />
                </v-avatar>
              </v-card-text>
            </el-col>
            <el-col :span="9">
              <v-card-text>
                <div class="post">
                  <div class="title" @click="goToPost(item.postId)">
                    {{ _postTitle(item.postName) }}
                  </div>
                  <div class="info">
                    <span>
                      {{ editStr }}
                    </span>
                    <span class="userName" @click="goToUser(item.userId)">
                      {{ item.userName }}</span
                    >
                    <span> {{ _postInfo(item.editTime) }}</span>
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
export default {
  name: "ForumHome",
  data() {
    return {
      editStr: "由 ",
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
    _postNum(str) {
      var num = parseInt(str);
      if (num >= 1000000) return (num / 1000000).toFixed(1) + "m";
      if (num >= 1000) return (num / 1000).toFixed(1) + "k";
      return num.toString();
    },
    _postTitle(str) {
      var maxLength = 17;
      if (str.length > maxLength) return str.substring(0, maxLength - 2) + "..";
      return str;
    },
    _postInfo(time) {
      return " , 于 " + time;
    },
    goToUser(id) {
      //todo: 跳转到用户
    },
    goToSector(id) {
      //todo: 跳转到分区
    },
    goToPost(id) {
      //todo: 跳转到动态
    }
  },
  components: {},
  created() {
    //todo: 获取分区信息
  }
};
</script>

<style scoped>
#forumHome {
  margin: 20px auto;
  width: 100vw;
  background-image: url();
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
  text-align: right;
  font-size: 20px;
}
.sectorPostNumStr {
  text-align: right;
  font-size: 10px;
  color: grey;
}
.avatar {
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
