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
                class="post-name"
                placeholder="请输入动态标题"
                v-model="createPostForm.postName"
                clearable
                maxlength="41"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="动态内容" prop="postContent">
              <el-input
                class="post-content"
                type="textarea"
                v-model="createPostForm.postContent"
                placeholder="请输入动态内容"
                :autosize="{ minRows: 10, maxRows: 20 }"
                resize="none"
                maxlength="1501"
              ></el-input>
            </el-form-item>

            <el-form-item label="分区" prop="sectorId">
              <!-- <el-select class="post-sector" v-model="createPostForm.sectorId" placeholder="请选择动态分区">
                <el-option
                  v-for="sector in sectorList"
                  :key="sector.sectorId"
                  :label="sector.sectorName"
                  :value="sector.sectorId"
                ></el-option>
              </el-select> -->
              <v-select
                class="post-sector"
                v-model="createPostForm.sectorId"
                hint="请选择动态分区"
                :items="sectorList"
                item-text="sectorName"
                item-value="sectorId"
                persistent-hint
                hide-details="true"
                outlined
                dense
              ></v-select>
            </el-form-item>
            <el-form-item label="标签" prop="postTags">
              <v-combobox
                :items="getSectorTags"
                :search-input.sync="search"
                v-model="createPostForm.postTags"
                persistent-hint
                hint="最多设置 5 个标签"
                clearable
                multiple
                small-chips
                outlined
                dense
                color="rgb(64, 158, 255)"
              ></v-combobox>
              <!-- https://vuetifyjs.com/en/components/combobox/#advanced-custom-options -->
            </el-form-item>
            <el-form-item label="引用文献">
              <v-btn icon @click="citeLiterature">
                <v-icon color="blue darken-2">
                  mdi-message-text
                </v-icon>
              </v-btn>
            </el-form-item>
          </el-form>
        </v-card-text>

        <v-card-actions>
          <div class="footer">
            <l-button @click="submit('createPostForm')" size="small">发表</l-button>
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
      search: "", // 搜索的 tag
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
        sectorId: [
          {
            required: true,
            message: "请选择动态分区",
            trigger: "change",
          },
        ],
      }, // el-form 的验证规则
      createPostForm: {
        userId: "1",
        postName: "", // 动态标题
        postContent: "", // 动态内容
        sectorId: "", // 动态所在分区 ID
        postTags: [], // 动态标签数组
        // imgUrl: [""], // 上传图片的 Url（如果要做）
        citeId: "-1", // 引用的文献 ID
      },
      sectorList: [
        {
          sectorId: 1,
          sectorName: "软妹工程",
          sectorTags: ["软妹工程基础", "原力系统", "软妹分析与设计"],
        },
        {
          sectorId: 2,
          sectorName: "计蒜姬科学与技术",
          sectorTags: ["计蒜姬组成原理", "计蒜姬科学方法论"],
        },
        {
          sectorId: 123,
          sectorName: "人工智障",
          sectorTags: ["浅度学习", "学不动了", "炼丹术"],
        },
      ], // 可选分区列表
    };
  },
  methods: {
    submit(formName) {
      // 表单验证
      let pass = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          pass = true;
        }
      });
      if (!pass) return;

      // for test
      console.log("动态标题：" + this.createPostForm.postName);
      console.log("动态内容：" + this.createPostForm.postContent);
      console.log("分区 ID：" + this.createPostForm.sectorId);
      console.log("标签：" + this.createPostForm.postTags);
      // for test

      createPost(this.createPostForm)
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
    citeLiterature() {
      // TODO 引用文献
      console.log("cite literature");
    },
  },
  components: {},
  computed: {
    getSectorTags: function() {
      let sectorId = this.createPostForm.sectorId;
      for (let i = 0; i < this.sectorList.length; i++) {
        // console.log(this.sectorList[i]);
        if (this.sectorList[i].sectorId == sectorId) return this.sectorList[i].sectorTags;
      }
      return [];
    },
  },
  watch: {
    "createPostForm.postTags"(val) {
      if (val.length > 5) {
        // 限制最多可选 5 个标签
        this.$nextTick(() => this.createPostForm.postTags.pop());
      }
    },
    "createPostForm.sectorId"(val, oldVal) {
      // 切换分区清空已选标签
      if (val != oldVal) this.createPostForm.postTags.splice(0, this.createPostForm.postTags.length);
    },
  },
  created() {
    // TODO 获取所有分区，以及每个分区下的 tag
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

<style>
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

.post-name {
  font-weight: bold;
}

.el-input__inner,
.el-textarea__inner {
  border-color: rgba(158, 158, 158);
}

.el-input__inner:hover,
.el-textarea__inner:hover {
  border-color: rgba(36, 36, 36);
}

.el-input__inner:focus,
.el-textarea__inner:focus {
  border-color: rgba(64, 158, 255);
  border-width: 2px;
}
</style>
