<template>
  <div>
    <ul class="message-list">
      <li v-for="(item, index) in messageList" :key="index">
        <comment-message
          @delete="deleteItem(index)"
          :message="item"
        ></comment-message>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCommentMsg } from "network/message";
import CommentMessage from "./childCpn/comment-message";
export default {
  name: "Application",
  created() {
    console.log(this.$store.state.user.userID);
    getCommentMsg(this.$store.state.user.userID)
      .then(res => {
        console.log("res", res);
        this.messageList = res;
      })
      .then(getCommentMsg(this.$store.state.user.userID))
      // .then(
      //   getAllMsgNum(this.$store.state.user.userID).then(res => {
      //     this.$store.commit("setAllMsgNum", res);
      //   })
      // );
      .catch(err => {
        this.$notify.error({
          title: "网络错误",
          message: "请稍后重试~"
        });
      });
  },
  methods: {
    deleteItem(index) {
      console.log("itemIndex", index);
      this.messageList.splice(index, 1);
    }
  },
  data() {
    return {
      messageList: [] // 消息列表
    };
  },
  components: {
    CommentMessage
  }
};
</script>

<style scoped>
.message-list {
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: auto;
  padding: 0 16px;
  height: calc(100vh - 178px);
}
</style>
