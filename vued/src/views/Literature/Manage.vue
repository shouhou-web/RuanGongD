<template>
  <!-- 管理文献 -->
  <div id="manage">

    <div class="main">

      <div class="pageHeader">
        <div class="top" style="margin-top: 40px">
          <b>我的文献</b>
        </div>
        <v-divider></v-divider>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          @current-change="changePage"
        >
        </el-pagination>
      </div>

      <div class="literatureList" >
        <div
          v-for="doc in myLiteratureList"
          class="myLiteratureListItem"
          @click=""
        >
          <el-card shadow="hover">
            <div class="list_title">
              <span>{{doc.literatureTitle}}</span>
              <l-button @click="openDeleteWarn(doc)" style="float: right" type="info" size="small">删除</l-button>
              <l-button @click="openEditWarn(doc)" style="float: right;margin-right: 20px"  size="small">修改</l-button>
            </div>
            <div class="list_author">{{doc.literatureAuthor}}</div>
            <div class="list_detail">{{doc.literatureDetail}}</div>
          </el-card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Manage",
  data() {
    return {
      page: '1',
      totalPosts: "100",
      myLiteratureList: [
        {
          literatureID: 1,
          literatureTitle: "文章1",
          literatureDetail: "摘要摘要摘要摘要摘要摘要摘要摘要",
          literatureAuthor: "郭德纲",
        },
        {
          literatureID: 2,
          literatureTitle: "文章2",
          literatureDetail: "摘要摘要摘要摘要摘要摘要摘要摘要",
          literatureAuthor: "郭德纲",
        },
      ],

    };
  },
  computed: {
    total() {
      return parseInt(this.totalPosts);
    },
    currentPage() {
      return parseInt(this.page);
    }
  },
  methods: {
    changePage(val) {
      this.$router.push({
        path: "/manage",
        query: {
          page: val.toString(),
        }
      });
      this.$router.go(0);
    },
    openEditWarn(doc){
      //修改文章确认提醒
      this.$prompt('<span>输入修改后的链接</span></br>'+doc.literatureTitle, '修改操作', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator(value){
          if(value == undefined){
            return '输入不得为空'
          }else {
            return true;
          }
        },
        inputErrorMessage: '链接格式不正确'
      }).then(({value}) => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.sendEdit(doc,value);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    sendEdit(doc,value){
      //修改文章申请，将跳转到发布页面
    },

    openDeleteWarn(doc) {
      //删除文章确认提醒
      this.$confirm('<span>将删除以下文章，需得到管理员申请，确认该操作吗？</span></br>'+doc.literatureTitle, '删除操作', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除申请发送成功!'
        });
        this.sendDelete(doc);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    sendDelete(doc){
      //删除文章申请

    },
  },
  components: {},
  created() {
    this.page = this.$route.query.page;
    //return;
    let start = ((parseInt(this.page) - 1) * 15).toString();
    getMyList(this.sectorId, start, 15)
      .then(res => {
        console.log("getMyList");
        console.log(res);
        this.myLiteratureList = res.data.myLiteratureList;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
  h1 {font-size:40px;}

  .main{
    margin: 20px auto;
    width:60%;
  }
  .pageHeader {
    margin: 1px auto;
    background-color: white;
    height: auto;
    display: flex;
    flex-direction: column;
  }
  .top{
    margin: 20px 20px;
    font-size: 30px;
    font-style: bold;
    height: 50px;
  }
  .literatureList{
    display: flex;
    flex-direction: column;
  }
  .list_title{
    font-size:20px;
  }
  .list_author{
    margin-top: 5px;
    font-size:15px;
  }
  .list_detail{
    margin-top: 5px;
    font-size:10px;
  }
</style>
