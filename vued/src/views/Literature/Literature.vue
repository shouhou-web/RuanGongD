<template>
  <!-- 文献详情页面 -->
  <div id="literature">
    <l-leftmenu class="leftmenu"></l-leftmenu>
    <div class="main">
      <div class="title content">
        <h2 class="li-title">{{literature.title}}</h2>
      </div>
      <div class="authorname content">
        <span class="lable">作者：</span>
        <el-link href="?" target="_blank">{{literature.authorName}}</el-link>
        <!-- <a href="???"></a> -->
      </div>
      <div class="abstract content">
        <div>
          <span class="lable">摘要：</span>
        </div>
        
        <span>{{literature.abstract}}</span>
      </div>
      <div class="keyword content">
        <span class="lable">关键词：</span>
        <!-- <a v-for="(item,index) in literature.keyWord" 
          :key="index"
          href="???"
        >
          {{item.str}}
        </a> -->

        <el-link v-for="(item,index) in literature.keyWord" 
          :key="index"
          href="???"
        >
          {{item.str}}
        </el-link>
      </div>
      <div class="doi content">
        <span class="lable">DOI：</span>
        <span>{{literature.DOI}}</span>
      </div>
      <div class="classification content">
        <span class="lable">分类：</span>
        <!-- <a v-for="(item,index) in literature.classification" 
          :key="index"
          href="???"
        >
          {{item.str}}
        </a> -->

        <el-link v-for="(item,index) in literature.classification" 
          :key="index"
          href="???"
        >
          {{item.str}}
        </el-link>
      </div>
      <div class="button">
        <l-button size="small" 
          round=true
          type="primary"
        > 
          <i class="el-icon-edit"></i>
          <span>  收藏</span> 
        </l-button>
        <l-button size="small" 
          round=true
          type="primary"
        > 
        <i class="el-icon-edit"></i>
          <span>  引用</span> 
        </l-button>
        <l-button size="small" 
          round=true
          type="primary"
        > 
        <i class="el-icon-edit"></i>
          <span>  分享</span> 
        </l-button>
        <l-button size="small" 
          round=true
          type="primary"
        > 
        <i class="el-icon-edit"></i>
          <span>  ？？？</span> 
        </l-button>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script>
import LTest from './childCpn/test.vue';
import LLeftmenu from './childCpn/leftmenu.vue';

export default {
  name: "Literature",
  components: {
    LTest,
    LLeftmenu,
  },
  data() {
    return {
      literature:
        {
          literatureID: "123",
          title: "Saber我的",
          authorID: "123456",
          authorName: "lw",
          abstract: "Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的Saber我的",
          keyWord: [
            {
              id:1,
              str:"Saber我的"
            },
            {
              id:2,
              str:"Saber我的"
            },
            {
              id:3,
              str:"Saber我的"
            }
          ],
          DOI: "123456",
          classification: [
            {
              id:1,
              str:"fate"
            },
            {
              id:2,
              str:"stay"
            },
            {
              id:3,
              str:"night"
            },
          ],
        }, //文献
    };
  },
  methods: {
  },
};
</script>

<style scoped>
#literature{
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  margin-top: 20px;
}
.leftmenu{
  position: absolute;
}
.main{
  width: 800px;
  height: 600px;
  background: #dfe6e9;
  margin-left: 200px;
}
.title{
  display: flex;
  justify-content:center;
  margin-bottom: 25px;
}
 .abstract{
  display: flex;
  text-align: left;
} 
.lable{
  display: inline-block;
  width: 56px;
  font-weight: 700;
}
.content{
  margin-top: 15px;
  font-size: 14px;
}
.el-link{
  margin-right: 8px;
}
.button{
  display: flex;
  justify-content:space-between;
  margin-top: 20px;
  width: 50%;
}
.button > .l-button{
  padding: 5px 13px;
}
.el-divider{
  height: 3px;
  margin: 12px 0;
  background: #000;
}
.right{
  width: 300px;
  height: 600px;
  background: #dfe6e9;
  margin-left: 80px;
}
</style>
