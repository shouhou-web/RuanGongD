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
      messageList: [
        {
          messageID: "123465",
          senderID: "123456", // 回复人ID
          senderUserName: "守候123", // 回复人姓名
          image:
            "https://assets.smcdn.cn/static/unmd5/default-avatar-moke.2.png", // 回复人头像
          sendTime: "21小时前", // 回复时间
          originalContent: "源评论", // 回复的评论内容或者回复的文献名称
          replyContent: "回复的", // 回复的内容
          viewd: false
        }
      ] // 消息列表
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
