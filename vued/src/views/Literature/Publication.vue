<template>
  <div>
    <!-- 发布文献 -->
    <m-app-header></m-app-header>
    <div class="pageHeaderBg">
      <div class="pageHeader">
        <div class="pageName">发布文献</div>
      </div>
    </div>
    <div class="formContent">
      <v-card>
        <v-card-title class="card-title">请填写各项文献相关信息</v-card-title>

        <v-card-text>
          <el-form :model="createLiForm" ref="createLiForm" label-width="100px" :rules="liRule">
            <el-form-item label="文献标题" prop="title">
              <el-input
                placeholder="请输入文献标题"
                v-model="createLiForm.title"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="文献年份" prop="year">
              <el-input
                placeholder="请输入文献年份"
                v-model="createLiForm.year"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="被引数" prop="citation">
              <el-input
                placeholder="请输入被引数"
                v-model="createLiForm.citation"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="文献链接" prop="url">
              <el-input
                placeholder="请输入文献链接"
                v-model="createLiForm.url"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="文献类型" prop="type">
              <el-select v-model="createLiForm.type" placeholder="请选择文献类型">
                <el-option
                  v-for="type in typeList"
                  :key="type.typeId"
                  :label="type.typeName"
                  :value="type.typeId"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="出版者" prop="publisher">
              <el-input
                placeholder="请输入文献出版者"
                v-model="createLiForm.publisher"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="文献摘要" prop="abstract">
              <el-input
                class="form-content"
                type="textarea"
                v-model="createLiForm.abstract"
                placeholder="请输入文献摘要"
                :autosize="{ minRows: 10, maxRows: 20 }"
                resize="none"
                maxlength="1501"
              ></el-input>
            </el-form-item>

            <el-form-item label="文献关键词" prop="keywords">
              <v-combobox
                v-model="createLiForm.keywords"
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

            <el-form-item label="领域" prop="area">
              <el-input
                placeholder="请输入文献领域"
                v-model="createLiForm.area"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="文献来源" prop="venue">
              <el-input
                placeholder="请输入文献来源"
                v-model="createLiForm.venue"
                clearable
                maxlength="51"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="文献作者" prop="author">
              <v-combobox
                v-model="createLiForm.authors"
                persistent-hint
                hint="请输入作者"
                clearable
                multiple
                small-chips
                outlined
                dense
                color="rgb(64, 158, 255)"
              ></v-combobox>
              <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @keyup.enter.native="handleInputConfirm"
                @select="handleSelect"
              ></el-autocomplete>
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

    </div>
    <!--
    <div id="publication">
      <CreateLiterature></CreateLiterature>
    </div>
    -->
  </div>
</template>

<script>
  import CreateLiterature from "./childCpn/create_literature";
  import MHeader from "../../components/common/m-header/m-header.vue";
  import {createLiterature, getAuthors} from "../../network/literature";
export default {
  name: "Publication",
  data() {
    return {
      userId: "",
      state: "",
      dialog: false, // 是否显示悬浮窗
      liRule: {
        title: [
          {
            required: true,
            message: "请输入文献标题",
            trigger: "blur",
          },
          {
            min: 2,
            max: 40,
            message: "文献标题长度在 2-40 个字符之间",
            trigger: "blur",
          },
        ],
        year: [
          {
            required: true,
            message: "请输入文献年份",
            trigger: "blur",
          },
        ],
        citation: [
          {
            required: true,
            message: "请输入被引数",
            trigger: "blur",
          },
        ], //被引数
        url: [
          {
            required: true,
            message: "请输入文献链接",
            trigger: "blur",
          },
        ], // 文献链接
        type: [
          {
            required: true,
            message: "请输入文献类别",
            trigger: "blur",
          },
        ], // 文献类别
        publisher: [
          {
            required: true,
            message: "请输入出版者",
            trigger: "blur",
          },
        ], //出版者
        authors: [
          {
            required: true,
            message: "请输入文献作者",
            trigger: "blur",
          },
        ],
        abstract: [
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
        keywords: [
          {
            required: true,
            message: "请输入关键词",
            trigger: "blur",
          },
        ],  // 文献关键词
        area: [
          {
            required: true,
            message: "请输入文献领域",
            trigger: "blur",
          },
        ],  // 文献领域
        venue: [
          {
            required: true,
            message: "请输入文献来源",
            trigger: "blur",
          },
        ], //文献来源
      }, // 表单验证规则
      createLiForm: {
        title: "", // 文献标题
        year: "",  //文献年份
        citation: "", //被引数
        url: "", // 文献链接
        type: "", // 文献类别
        publisher: "", //出版者
        abstract: "", // 文献内容
        keywords: [], // 文献关键词
        area: "", // 文献领域
        venue: "", //文献来源
        authors: [], // 文献作者

      },
      authorList: [
        {
          name: "lhx"
        },
        {
          name: "lyc"
        },
        {
          name: "mhy"
        },
      ],
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

      createLiterature(this.userId, this.createLiForm)
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

    querySearchAsync(queryString, callback) {
      var list = [{}];
      getAuthors(queryString).then((response)=>{
        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
        for(let i of response.data){
          i.value = i.name;  //将想要展示的数据作为value
        }
        this.authorList = response.data;
        callback(this.authorList);
      }).catch((error)=>{
        console.log(this.authorList);
      });
      /*
      for(let i of this.authorList){
        i.value = i.name;  //将想要展示的数据作为value
      }
      list = this.authorList;
      list = queryString
        ? list.filter(this.createFilter(queryString))
        : list;
      callback(list);
      */

      /* var list = [{}];
      //调用的后台接口
      let url = 后台接口地址 + queryString;
      //从后台获取到对象数组
      axios.get( url ).then((response)=>{
        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
        for(let i of response.data){
          i.value = i.想要展示的数据;  //将想要展示的数据作为value
        }
        list = response.data;
        callback(list);
      }).catch((error)=>{
        console.log(this.authorList);
      }); */
    },
    createFilter(queryString) {
      return (item) => {
        return item.value.toUpperCase().match(queryString.toUpperCase());
      };
    },

    handleInputConfirm() {
      this.createLiForm.authors.push(this.state) //将选中人的id存到数组中
    },

    handleSelect() {

    }
  },
  watch: {
    "createLiForm.keywords"(val) {
      if (val.length > 5) {
        // 限制最多5个关键词
        this.$nextTick(() => this.createLiForm.keywords.pop());
      }
    },
  },
  created() {
    this.data().userId = this.$store.state.user.userID;
  },
  components: { MHeader, CreateLiterature },
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
    margin-bottom: 1px;
    border-radius: 0px;
    width: 900px;
    /*background-color: white;*/
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
  .formContent {
    width: 1100px;
    margin:0 auto;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    margin: auto;
    padding-bottom: 10px;
    width: 30%;
  }
</style>
