<!-- TODO: 上传图片（如果要做），引用文献 -->
<template>
  <div data-app="true">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card elevation="3">
        <v-card-title class="headline">发表动态</v-card-title>

        <v-card-text>
          <el-input type="textarea" v-model="postContent" placeholder="请输入动态内容" resize="none"></el-input>
          <!-- TODO: 选择分区，选择标签 -->

          <!-- 选择标签考虑使用 https://www.vue-treeselect.cn/ -->
        </v-card-text>

        <v-card-actions>
          <div class="footer">
            <l-button @click="submit" size="small">发表</l-button>
            <l-button @click="dialog = false" type="info" size="small">取消</l-button>
          </div>
        </v-card-actions>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>

    <l-button type="success" @click="dialog = true">发表动态</l-button>
  </div>
</template>

<script>
import { createPost } from "network/forum.js";
export default {
  name: "CreatePost",
  props: {},
  data() {
    return {
      dialog: false, // 是否展示悬浮窗
      userId: 1, // 用户 ID
      postContent: "", // 动态内容
      postSectorId: "",
      postSectorName: "",
      postTags: [""],
      imgUrl: [""], // 上传图片的 Url（如果要做）
      citeId: 1, // 引用的文献 ID
      sectorList: [
        {
          sectorId: 1,
          sectorName: "软妹工程",
        },
        {
          sectorId: 2,
          sectorName: "计蒜姬科学与技术",
        },
        {
          sectorId: 3,
          sectorName: "人工智障",
        },
      ],
    };
  },
  methods: {
    submit() {
      createPost(this.userId, this.postContent, this.postSectorId, this.postTags, this.citeId)
        .then((res) => {
          console.log("createPost");
          console.log(res);
          if (res.data.result == "true") {
            this.dialog = false;
            this.$message({
              type: "success",
              message: "动态发表成功！",
            });
          } else {
            this.$message.error({
              message: "动态发表失败，请稍后再试",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            message: "动态发表失败，请稍后再试",
          });
        });
    },
    // show() {
    //   this.$refs.hover.showHover({
    //     title: '发表动态',
    //     submitBtn: '发表',
    //     cancelBtn: '取消',
    //   });
    // },
  },
  components: {},
  created() {
    // todo: 获取所有分区，以及每个分区下的 tag
    getAllTags()
      .then((res) => {
        console.log("getAllTags");
        console.log(res);
        // TODO
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding-bottom: 10px;
  width: 30%;
}
</style>
