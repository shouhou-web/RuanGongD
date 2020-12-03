<template>
  <!-- 讨论区分区页面 -->
  <div id="forumSector" data-app>
    <div class="pageHeader">
      <div class="sectorName">{{ sectorName }}</div>
      <v-divider></v-divider>
      <div class="sectorTool">
        <el-row>
          <el-col :span="12">
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              :current-page="currentPage"
              @current-change="changePage"
            >
            </el-pagination>
          </el-col>
          <el-col :offset="7" :span="3">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="toolButton" small dark v-bind="attrs" v-on="on">
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
              dark
              small
              elevation="1"
              @click="followSector()"
              ><div>关注</div></v-btn
            >
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <ul>
        <li v-for="(item, index) in posts" :key="index">
          <v-card class="postCard" elevation="1" tile>
            <el-row>
              <el-col :span="12">
                <div class="postInfo">
                  <v-card-title>
                    <div class="postName" @click="goToPost(item.postId)">
                      {{ item.postName }}
                    </div>
                  </v-card-title>
                  <v-card-subtitle>
                    <div class="creator">
                      <span>{{ createStr0 }}</span>
                      <span
                        class="creatorName"
                        @click="goToUser(item.creatorId)"
                        >{{ item.creatorName }}</span
                      >
                      <span>{{ createStr1 + item.createTime }}</span>
                    </div>
                    <div class="tags">
                      <v-chip
                        label
                        class="tag"
                        small
                        v-for="(tag, index) in item.tags"
                        :key="index"
                      >
                        {{ tag }}
                      </v-chip>
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
                      @click="goToUser(item.userId)"
                    />
                  </v-avatar>
                </v-card-text>
              </el-col>
              <el-col :span="6">
                <v-card-text>
                  <div class="editInfo">
                    <div class="editorName" @click="goToUser(item.userId)">
                      <span>{{ editStr0 }}</span>
                      <span>
                        {{ item.editorName }}
                      </span>
                    </div>
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
      </ul>
    </div>
  </div>
</template>

<script>
import { getPosts } from "network/forum.js";
export default {
  name: "ForumSector",
  data() {
    return {
      sectorId: "01",
      page: "1",
      sort: "0",
      sectorName: "测试分区",
      createStr0: "由 ",
      createStr1: " 创建于 ",
      editStr0: "由 ",
      editStr1: "最后编辑于 ",
      totalPosts: "123",
      sortType: [
        { name: "最近更新", type: "0" },
        { name: "开始日期", type: "1" },
        { name: "标题", type: "2" },
        { name: "最多恢复", type: "3" }
      ],
      //posts: [],
      posts: [
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
    goToUser(id) {
      //todo: 跳转到用户
      /*
      this.$router.push({
        path: "/",
        query: {}
      });
      */
    },
    goToPost(id) {
      //todo: 跳转到动态
      /*
      this.$router.push({
        path: "/",
        query: {}
      });
      */
    },
    followSector() {
      //todo: (或解除)关注分区
    },
    changePage(val) {
      this.$router.push({
        path: "/forumSector",
        query: {
          sectorId: this.sectorId,
          page: val.toString(),
          sort: this.sort
        }
      });
      this.$router.go(0);
    },
    changeSort(val) {
      this.$router.push({
        path: "/forumSector",
        query: {
          sectorId: this.sectorId,
          page: this.page,
          sort: val
        }
      });
      this.$router.go(0);
    }
  },
  computed: {
    total() {
      return parseInt(this.totalPosts);
    },
    currentPage() {
      return parseInt(this.page);
    }
  },
  components: {},
  created() {
    this.sectorId = this.$route.query.sectorId;
    this.page = this.$route.query.page;
    this.sort = this.$route.query.sort;
    let pageSize = this.$store.state.pageSize;
    //return;
    let start = ((parseInt(this.page) - 1) * this.pageSize).toString();
    getPosts(this.sectorId, start, pageSize, this.sort)
      .then(res => {
        console.log("getPosts");
        console.log(res);
        this.posts = res.data.posts;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
#forumSector {
  margin: 20px auto;
  width: 100vw;
  /*background-image: url();*/
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
.sectorName {
  margin: 20px 20px;
  font-size: 30px;
  font-style: bold;
  height: 50px;
}
.sectorTool {
  height: 40px;
  margin-top: 5px;
}
.postCard {
  margin: 1px auto;
  border-radius: 0px;
  width: 900px;
}
.toolButton {
  margin-top: 4px;
}
.menu {
  font-size: 10px;
}
/*.postInfo {
}*/
.postName {
  cursor: pointer;
  font-size: 25px;
}
.creator {
  cursor: pointer;
}
.creatorName {
  cursor: pointer;
}
.tags {
  margin-top: 10px;
}
.tag {
  margin-right: 3px;
}
.displayNum {
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
}
.editTime {
  font-size: 12px;
}
</style>
