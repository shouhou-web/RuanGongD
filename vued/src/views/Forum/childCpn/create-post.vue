<!-- TODO: 上传图片（如果要做），引用文献 -->
<template>
  <div data-app="true">
    <v-dialog v-model="dialog" persistent max-width="800">
      <v-card elevation="3">
        <v-card-title class="card-title">发表动态</v-card-title>

        <v-card-text>
          <el-form :model="createPostForm" ref="createPostForm" label-width="80px" :rules="postRule">
            <el-form-item label="动态标题" prop="postName">
              <el-input
                class="form-title"
                placeholder="请输入动态标题"
                v-model="createPostForm.postName"
                clearable
                maxlength="41"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="动态内容" prop="postContent">
              <el-input
                class="form-content"
                type="textarea"
                v-model="createPostForm.postContent"
                placeholder="请输入动态内容"
                :autosize="{ minRows: 4, maxRows: 10 }"
                resize="none"
                maxlength="1501"
              ></el-input>
            </el-form-item>
            <el-form-item label="分区" prop="postSectorName">
              <el-select v-model="createPostForm.postSectorId" placeholder="请选择动态分区">
                <el-option
                  v-for="sector in sectorList"
                  :key="sector.sectorId"
                  :label="sector.sectorName"
                  :value="sector.sectorId"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- TODO: 选择标签 -->
            <!-- 选择标签考虑使用 https://www.vue-treeselect.cn/ -->
          </el-form>
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

    <l-button type="primary" @click="dialog = true">发表动态</l-button>
  </div>
</template>

<script>
import { createPost, getAllTags } from "network/forum.js";
export default {
  name: "CreatePost",
  props: {},
  data() {
    return {
      dialog: false, // 是否展示悬浮窗
      postRule: {
        postName: [
          {
            required: true,
            message: "请输入动态标题",
            trigger: "blur",
          },
          {
            min: 2,
            max: 40,
            message: "动态标题长度在 2-40 个字符之间",
            trigger: "blur",
          },
        ],
        postContent: [
          {
            required: true,
            message: "请输入动态内容",
            trigger: "blur",
          },
          {
            min: 5,
            max: 1500,
            message: "动态内容长度在 5-1500 个字符之间",
            trigger: "blur",
          },
        ],
        postSectorName: [
          {
            required: true,
            message: "请选择动态分区",
            trigger: "blur",
          },
        ],
      }, // el-form 的验证规则
      createPostForm: {
        userId: 1,
        postName: "", // 动态标题
        postContent: "", // 动态内容
        postSectorId: "", // 动态所在分区 ID
        postSectorName: "", // 动态分区名称
        postTags: [""], // 动态标签数组
        // imgUrl: [""], // 上传图片的 Url（如果要做）
        citeId: 1, // 引用的文献 ID
      },
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
          sectorId: 123,
          sectorName: "人工智障",
        },
      ], // 可选分区列表
    };
  },
  methods: {
    submit() {
      console.log("分区: " + this.createPostForm.postSectorId);
      createPost(this.userId, this.postName, this.postContent, this.postSectorId, this.postTags, this.citeId)
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
    // getAllTags()
    //   .then((res) => {
    //     console.log("getAllTags");
    //     console.log(res);
    //     // TODO
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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

.hintText {
  display: flex;
  justify-content: flex-end;
}

.form-title {
  font-weight: bold;
}
</style>
