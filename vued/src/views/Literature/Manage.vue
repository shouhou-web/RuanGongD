<template>
  <!-- 管理文献 -->
  <div>
    <div class="manage">
      <y-literature
        v-for="(onefollowingLiterature, i) in myLiteratureList"
        :id="onefollowingLiterature.literatureID"
        :title="onefollowingLiterature.title"
        :display="true"
        :authors="onefollowingLiterature.authors"
        :tags="onefollowingLiterature.tags"
        :key="i"
        @change="openEditWarn(onefollowingLiterature)"
      ></y-literature>
      <div v-if="myLiteratureList.length == 0" class="none">
        <img src="../../assets/image/no-img.png" class="none-img" />
      </div>
    </div>

  </div>
</template>

<script>
  import YLiterature from "@/components/common/y-literature/y-literature";
  import { getMyLiterature , editLiterature } from "@/network/literature";
export default {
  name: "Manage",
  props: { authorID : String},
  components: { 'y-literature': YLiterature, },
  data() {
    return {
      userID: "",
      showbutton: true,
      myLiteratureList: [ ],

    };
  },
  computed: {},
  methods: {
    gotoLiterature() {
      this.$notify.success("跳转ing")
    },
    openEditWarn(doc){
      console.log(doc);
      //修改文章确认提醒
      this.$prompt('<span>输入修改后的链接</span></br>'+doc.title, '修改操作', {
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
        this.sendEdit(doc,value);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    sendEdit(doc,value){
      editLiterature(this.userID, doc.literatureID, value)
        .then((res) => {
          if (res == true) {
            this.$message({
              type: "success",
              message: "文献修改请求成功！",
            });
          } else {
            this.$message.error({
              message: "文献修改请求失败，请重试",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            message: "文献修改请求失败，请重试",
          });
        });

      //修改文章申请，将跳转到发布页面
    },

  },
  created() {
    this.userID = this.$store.state.user.userID;
    console.log(this.userID)
    getMyLiterature(this.authorID)
      .then(res => {
        console.log("getMyList");
        console.log(res);
        this.myLiteratureList = res;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
  .manage {
    width: 101%;
    max-height: 601px;
    overflow: scroll;
  }

  .manage::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .manage::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 2px;
    background-color: #4f6ef2;
  }
  .manage::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
    background: none;
    border-radius: 10px;
  }

  .none {
    height: 600px;
    border: 1px solid #dddddd;
    background-color: white;
  }
</style>
