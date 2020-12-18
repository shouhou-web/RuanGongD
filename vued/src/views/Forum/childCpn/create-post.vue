<template>
  <div data-app="true">
    <v-dialog v-model="dialog" persistent max-width="900">
      <v-card elevation="3">
        <v-card-title class="card-title">发表动态</v-card-title>

        <v-card-text>
          <v-form v-model="createPostFormValid">
            <div class="form-item">
              <div class="form-label">
                <span class="required-star">*</span>动态标题
              </div>
              <!-- TODO：防止增长行数，或者字数强行限制 -->
              <v-textarea
                class="textarea"
                v-model="createPostForm.postName"
                placeholder="请输入动态标题"
                counter
                outlined
                required
                rows="1"
                auto-grow
                color="var(--color-main)"
                :rules="rules.postNameRule"
                dense
                clearable
                clear-icon="mdi-close-circle"
              ></v-textarea>
            </div>

            <div class="form-item">
              <div class="form-label">
                <span class="required-star">*</span>动态内容
              </div>
              <v-textarea
                class="textarea"
                v-model="createPostForm.postContent"
                placeholder="请输入动态内容"
                counter
                outlined
                required
                rows="10"
                auto-grow
                color="var(--color-main)"
                :rules="rules.postContentRule"
                dense
              ></v-textarea>
            </div>

            <div class="form-item">
              <div class="form-label">
                <span class="required-star">*</span>分区
              </div>
              <v-select
                v-model="createPostForm.sectorId"
                hint="请选择动态分区"
                :items="sectorList"
                item-text="sectorName"
                item-value="sectorId"
                persistent-hint
                hide-details="true"
                outlined
                color="var(--color-main)"
                dense
                :rules="rules.sectorIdRule"
              >
              </v-select>
            </div>

            <!-- TODO tag 长度限定，空白过滤 -->
            <div class="form-item">
              <div class="form-label">
                标签
              </div>
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
                color="var(--color-main)"
                :disabled="!createPostForm.sectorId"
              ></v-combobox>
            </div>

            <div class="form-item">
              <div class="form-label">
                引用我的文献
              </div>
              <v-select
                v-model="createPostForm.citeId"
                :items="myLiteratureList"
                item-text="title"
                item-value="literatureID"
                dense
                persistent-hint
                outlined
                color="var(--color-main)"
              >
                <v-btn>test</v-btn>
              </v-select>
            </div>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <div class="footer">
            <v-btn
              @click="submit()"
              color="var(--color-main)"
              :disabled="!createPostFormValid"
            >
              <font color="white">发表</font>
            </v-btn>
            <v-btn @click="dialog = false">取消</v-btn>
          </div>
        </v-card-actions>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    <v-btn
      class="toolButton"
      elevation="1"
      dark
      @click="dialog = true"
      color="var(--color-main)"
    >
      <div>发表动态</div>
    </v-btn>
    <!--
    <l-button type="primary" @click="dialog = true">发表动态</l-button>
    -->
  </div>
</template>

<script>
import { createPost, getAllTags } from "@/network/forum";
import { getMyLiterature } from "@/network/literature";
export default {
  name: "CreatePost",
  props: {},
  data() {
    return {
      dialog: false, // 是否展示悬浮窗
      userId: "1", // 用户id
      search: "", // 搜索的 tag
      selectedLiterature: {},
      createPostFormValid: false,
      rules: {
        postNameRule: [
          v => !!v,
          v =>
            (v.length <= 40 && v.length >= 2) ||
            "动态标题长度在 2-40 个字符之间"
        ],
        postContentRule: [
          v => !!v,
          v =>
            (v.length <= 1500 && v.length >= 5) ||
            "动态标题长度在 5-1500 个字符之间"
        ],
        sectorIdRule: [v => !!v]
      },
      // postRule: {
      //   postName: [
      //     {
      //       required: true,
      //       message: "请输入动态标题",
      //       trigger: "blur"
      //     },
      //     {
      //       min: 2,
      //       max: 40,
      //       message: "动态标题长度在 2-40 个字符之间",
      //       trigger: "blur"
      //     }
      //   ],
      //   postContent: [
      //     {
      //       required: true,
      //       message: "请输入动态内容",
      //       trigger: "blur"
      //     },
      //     {
      //       min: 5,
      //       max: 1500,
      //       message: "动态内容长度在 5-1500 个字符之间",
      //       trigger: "blur"
      //     }
      //   ],
      //   sectorId: [
      //     {
      //       required: true,
      //       message: "请选择动态分区",
      //       trigger: "change"
      //     }
      //   ]
      // }, // el-form 的验证规则
      createPostForm: {
        userId: "1",
        postName: "", // 动态标题
        postContent: "", // 动态内容
        sectorId: "", // 动态所在分区 ID
        postTags: [], // 动态标签数组
        citeId: "-1" // 引用的文献 ID
      },
      sectorList: [
        {
          sectorId: 1,
          sectorName: "软妹工程",
          sectorTags: ["软妹工程基础", "原力系统", "软妹分析与设计"]
        },
        {
          sectorId: 2,
          sectorName: "计蒜姬科学与技术",
          sectorTags: ["计蒜姬组成原理", "计蒜姬科学方法论"]
        },
        {
          sectorId: 123,
          sectorName: "人工智障",
          sectorTags: ["浅度学习", "学不动了", "炼丹术"]
        }
      ], // 可选分区列表
      myLiteratureList: [] // 我的文献列表
    };
  },
  methods: {
    submit() {
      // for test
      console.log(this.createPostForm);
      // for test

      createPost(this.createPostForm)
        .then(res => {
          console.log("createPost");
          console.log(res);
          if (res.data.result == "true") {
            this.dialog = false;
            this.createPostForm = {
              userId: this.$store.state.user.userID,
              postName: "",
              postContent: "",
              sectorId: "",
              postTags: [],
              citeId: "-1"
            };
            this.$notify({
              title: "操作成功",
              message: "动态发表成功",
              type: "success"
            });
            this.$router.push({
              path: "/forumPost",
              query: { postId: res.data.postId }
            });
          } else {
            /*this.$message.error({
              message: "动态发表失败，请稍后再试"
            });*/
            this.$notify.error({
              title: "操作失败",
              message: "动态发表失败，请稍后再试"
            });
          }
        })
        .catch(err => {
          console.log(err);
          /*this.$message.error({
            message: "动态发表失败，请稍后再试"
          });*/
          this.$notify.error({
            title: "操作失败",
            message: "动态发表失败，请稍后再试"
          });
        });
    }
  },
  components: {},
  computed: {
    getSectorTags: function() {
      let sectorId = this.createPostForm.sectorId;
      for (let i = 0; i < this.sectorList.length; i++) {
        // console.log(this.sectorList[i]);
        if (this.sectorList[i].sectorId == sectorId)
          return this.sectorList[i].sectorTags;
      }
      return [];
    }
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
      if (val != oldVal)
        this.createPostForm.postTags.splice(
          0,
          this.createPostForm.postTags.length
        );
    }
  },
  created() {
    this.userId = this.$store.state.user.userID; // TODO 等待统一
    this.createPostForm.userId = this.userId;
    this.createPostForm.citeId = "-1";
    // 获取所有分区，以及每个分区下的 tag
    getAllTags()
      .then(res => {
        console.log("getAllTags");
        console.log(res);
        this.sectorList = res.data.sectorList;
      })
      .catch(err => {
        console.log(err);
      });
    getMyLiterature(this.userId)
      .then(res => {
        console.log("getMyLiterature");
        console.log(res);
        var tmpLiterature = Object;
        for (var literature of res.data.myLiteratureList) {
          // for (var literature of tmpList) {
          tmpLiterature.literatureID = literature.literatureID;
          tmpLiterature.title = literature.title;
          tmpLiterature.authors = [];
          for (var author of literature.authors) {
            tmpLiterature.authors.push(author.userName);
          }
          this.myLiteratureList.push({ ...tmpLiterature });
        }
        console.log(this.myLiteratureList);
      })
      .catch(err => {
        console.log(err);
      });
  }
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

.form-item {
  display: flex;
  margin-bottom: 15px;
}

.form-label {
  display: flex;
  height: 40px;
  width: 100px;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  padding-right: 12px;
  color: rgb(96, 98, 102);
  font-size: 0.9rem;
}

.textarea {
  font-size: 0.9rem;
}

.required-star {
  color: rgb(245, 108, 108);
  padding-right: 3px;
}
</style>
