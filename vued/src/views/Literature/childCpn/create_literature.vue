<template>
  <div data-app="true">
    <v-dialog v-model="dialog" persistent max-width="1000">
      <v-card>
        <v-card-title class="card-title">发布文献</v-card-title>

        <v-card-text>
          <el-form :model="createLiForm" ref="createLiForm" label-width="100px" :rules="liRule">
            <el-form-item label="文献标题" prop="liName">
              <el-input
                class="form-title"
                placeholder="请输入文献标题"
                v-model="createLiForm.liName"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>

            <!--
            <el-form-item label="文献作者" prop="liAuthor">
              <el-input
                class="form-author"
                placeholder="请输入文献作者"
                v-model="createLiForm.liAuthor"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>
            -->

            <el-form-item label="文献作者" prop="liAuthor">
              <v-combobox
                :search-input.sync="search"
                v-model="createLiForm.liAuthor"
                persistent-hint
                hint="请输入作者"
                clearable
                multiple
                small-chips
                outlined
                dense
                color="rgb(64, 158, 255)"
              ></v-combobox>
            </el-form-item>

            <el-form-item label="文献摘要" prop="liContent">
              <el-input
                class="form-content"
                type="textarea"
                v-model="createLiForm.liContent"
                placeholder="请输入文献摘要"
                :autosize="{ minRows: 10, maxRows: 20 }"
                resize="none"
                maxlength="1501"
              ></el-input>
            </el-form-item>

            <!--
            <el-form-item label="文献关键词" prop="liCritical">
              <el-input
                placeholder="请输入关键词"
                v-model="createLiForm.liCritical"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>
            -->

            <el-form-item label="文献关键词" prop="liCritical">
              <v-combobox
                v-model="createLiForm.liCritical"
                persistent-hint
                hint="请输入关键词,最多5个"
                clearable
                multiple
                small-chips
                outlined
                dense
                color="rgb(64, 158, 255)"
              ></v-combobox>
            </el-form-item>

            <el-form-item label="文献DOI" prop="liDOI">
              <el-input
                placeholder="请输入文献DOI"
                v-model="createLiForm.liDOI"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="文献分类" prop="liType">
              <el-select v-model="createLiForm.liType" placeholder="请选择文献分类">
                <el-option
                  v-for="type in typeList"
                  :key="type.typeId"
                  :label="type.typeName"
                  :value="type.typeId"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="文献链接" prop="liLink">
              <el-input
                class="form-author"
                placeholder="请输入文献链接"
                v-model="createLiForm.liLink"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>

          </el-form>
        </v-card-text>

        <v-card-actions>
          <div class="footer">
            <l-button @click="submit('createLiForm')" size="small">发表</l-button>
            <l-button @click="dialog = false" type="info" size="small">取消</l-button>
          </div>
        </v-card-actions>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>

    <l-button type="primary" @click="dialog = true">发布文献</l-button>
  </div>
</template>

<script>
  import { createLiterature } from "../../../network/literature.js";
  export default {
    name: "create_literature",
    props: {},
    data() {
      return {
        dialog: false, // 是否显示悬浮窗
        liRule: {
          liName: [
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
          liAuthor: [
            {
              required: true,
              message: "请输入文献作者",
              trigger: "blur",
            },
          ],
          liContent: [
            {
              required: true,
              message: "请输入文献摘要",
              trigger: "change",
            },
            {
              min: 10,
              max: 500,
              message: "文献摘要在 10-500 个字之间",
              trigger: "change",
            },
          ],
          liCritical: [
            {
              required: true,
              message: "请输入文献关键词",
              trigger: "blur",
            },
          ],
          liDOI: [
            {
              required: true,
              message: "请输入文献DOI",
              trigger: "blur",
            },
          ],
          liType: [
            {
              required: true,
              message: "请选择文献类型",
              trigger: "change",
            },
          ],
          liLink: [
            {
              required: true,
              message: "请输入文献链接",
              trigger: "blur",
            },
          ],
        }, // 表单验证规则
        createLiForm: {
          userId: "1",
          liName: "", // 文献标题
          liAuthor: [], // 文献作者
          liContent: "", // 文献内容
          liCritical: [], // 文献关键词
          liDOI: "", // 文献DOI
          liLink: "", // 文献链接
          liType: "", // 文献类别
        },
        typeList: [
          {
            typeId: 1,
            typeName: "论文",
          },
          {
            typeId: 2,
            typeName: "会议",
          },
          {
            typeId: 3,
            typeName: "期刊",
          },
        ], // 可选分区列表
      };
    },
    methods: {
      submit(formName) {
        // 表单验证
        let pass = false;
        this.$refs.[formName].validate((valid) => {
          if (valid) {
            pass = true;
          }
        });
        if (!pass) return;

        // for test
        console.log(this.createLiForm);
        // for test

        createLiterature(this.createLiForm)
          .then((res) => {
            console.log("createPost");
            console.log(res);
            if (res.data.result == "true") {
              this.dialog = false;
              this.$message({
                type: "success",
                message: "文献发布请求成功！",
              });
            } else {
              this.$message.error({
                message: "文献发布请求失败，请重试",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error({
              message: "文献发布请求失败，请重试",
            });
          });
      },
    },
    components: {},
    computed: {
    },
    watch: {
      "createLiForm.liCritical"(val) {
        if (val.length > 5) {
          // 限制最多5个关键词
          this.$nextTick(() => this.createLiForm.liCritical.pop());
        }
      },
    },
    created() {
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

  .form-title {
    font-weight: bold;
  }
</style>

