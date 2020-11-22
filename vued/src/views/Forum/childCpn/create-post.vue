<!-- TODO: 上传图片（如果要做），引用文献 -->
<template>
  <div data-app="true">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card elevation="3">
        <v-card-title class="headline">发表动态</v-card-title>

        <v-card-text>
          <el-input type="textarea" v-model="postContent" placeholder="请输入动态内容" resize="none"></el-input>
          <!-- TODO: 选择分区，选择标签 -->
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
export default {
  name: 'CreatePost',
  props: {},
  data() {
    return {
      dialog: false, // 是否展示悬浮窗
      userId: 1, // 用户 ID
      postContent: '', // 动态内容
      imgUrl: [''], // 上传图片的 Url（如果要做）
      citeId: 1, // 引用的文献 ID
    };
  },
  methods: {
    submit() {
      // loading
      // submit data
      dialog = false;
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
