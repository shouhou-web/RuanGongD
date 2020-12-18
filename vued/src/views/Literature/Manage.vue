<template>
  <!-- 管理文献 -->
  <div>
    <div v-for="(oneLiterature, i) in myLiteratureList">
      <div class="one-follow-literature">
        <div>
          <div class="title-father">
            <div class="title" @click="gotoLiterature()">{{ oneLiterature.title }}</div>
          </div>
          <div class="edit-button" >
            <l-button class="edit-button-1" @click="openEditWarn(oneLiterature)" size="small">修改</l-button>
          </div>
        </div>
        <div class="tags">
          <div v-for="(a_tag, i) in oneLiterature.tags">
            <div :class="{'first-tag': i==0, 'leftpart-tags': i != 0}">{{a_tag}}</div>
          </div>
        </div>
        <div class="authors">
          <div v-for="(one_author, i) in oneLiterature.authors" class="author-list">
            <img :src="one_author.userImgSrc" class="authorImg">
            <div class="authorname">{{one_author.userName}}</div>
          </div>
        </div>
        <div class="read-time">
          <div class="read-time-content">
            {{oneLiterature.read_time}} Reads
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import YLiterature from "@/components/common/y-literature/y-literature";
  import { getMyLiterature } from "@/network/literature";
export default {
  name: "Manage",
  props: { userID : '' },
  components: { YLiterature },
  data() {
    return {
      myLiteratureList: [
        {
          literatureID: 0,
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: [
            {
              userID: 0,
              userName: 'Yu Haomiao',
              userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
            }
          ],
          tags: ["tag 1", "tag 2"],
          read_time: 10,
        },
        {
          literatureID: 1,
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: [
            {
              userID: 0,
              userName: 'Yu Haomiao',
              userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
            }
          ],
          tags: ["tag 1", "tag 2"],
          read_time: 10,
        },
        {
          literatureID: 2,
          title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
          authors: [
            {
              userID: 0,
              userName: 'Yu Haomiao',
              userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
            }
          ],
          tags: ["tag 1", "tag 2"],
          read_time: 1000,
        },
      ],

    };
  },
  computed: {},
  methods: {
    gotoLiterature() {
      this.$notify.success("跳转ing")
    },
    openEditWarn(doc){
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

  },
  created() {
    getMyLiterature(this.userID)
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
  .one-follow-literature {
    width: 715px;
    height: 170px;
    border: 1px solid #dddddd;
    background-color: white;
    padding: 30px 25px 27px 25px;
    margin-bottom: 20px;
  }

  .title-father {
    width: 90%;
    float: left;
  }

  .title {
    font-size: 0.9rem;
    color: black;
    font-weight: 700;
    width: fit-content;
    height: 25px;
    line-height: 20px;
    padding-left: 5px;
    margin-bottom: 5px;
  }

  .title:hover {
    cursor: pointer;
    border-bottom: 1px solid black;
  }

  .edit-button {
    width: 10%;
    margin-right:0;
    float: left;
  }
  .edit-button-1 {
    margin-right:0;
  }

  .tags {
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
  }

  .first-tag {
    border-radius: 3px;
    width: fit-content;
    padding: 3px;
    margin: 5px;
    font-size: 0.8rem;
    color: white;
    background-color: #4F6EF2;
  }

  .first-tag:hover {
    cursor: pointer;
  }

  .leftpart-tags {
    border-radius: 3px;
    width: fit-content;
    padding: 3px;
    margin: 5px;
    font-size: 0.8rem;
    border: 1px solid #4F6EF2;
    background-color: white;
    color: #4F6EF2;
  }

  .leftpart-tags:hover {
    cursor: pointer;
  }

  .authors {
    width: 100%;
    height: 25px;
    margin-bottom: 5px;
  }

  .author-list {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    align-items: center;
  }

  .authorImg {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-top: 1.5px;
    margin-left: 5px;
  }

  .authorname {
    font-size: 0.8rem;
    color: #000000;
    margin-left: 2px;
  }

  .authorname:hover {
    cursor: pointer;
    border-bottom: 1px solid #000000;
  }

  .read-time {
    width: 100%;
    height: 25px;
    font-size: 0.8rem;
    color: #999999;
    padding-left: 5px;
  }

  .read-time-content {
    width: 100%;
    height: 100%;
    margin-top: 10px;
  }

</style>
