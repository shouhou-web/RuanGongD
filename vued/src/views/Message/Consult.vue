<template>
  <div>
    <ul class="message-list">
      <li v-for="(item, index) in messageList" :key="index">
        <consult-message
          type="invitation"
          @delete="deleteItem(index)"
          :message="item"
        ></consult-message>
      </li>
    </ul>
  </div>
</template>

<script>
import { getConsultMsg } from "network/message";
import consultMessage from "./childCpn/consult-message";
export default {
  name: "Consult",
  created() {
    getConsultMsg(this.$store.state.user.userID)
      .then(res => {
        console.log("consult", res);
        this.messageList = res;
      })
      .then(getConsultMsg(this.$store.state.user.userID))
      // .then(
      //   getAllMsgNum(this.$store.state.user.userID).then((res) => {
      //     this.$store.commit("setAllMsgNum", res);
      //   })
      // )
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
          content: "你好，一份魏家凉皮不要辣", // 回复的内容
          viewed: false
        }
      ] // 消息列表
    };
  },
  components: {
    consultMessage
  }
};
</script>

<style scoped>
.message-list {
  background-color: #fff;
  margin-bottom: 10px;
  overflow: auto;
  padding: 0 16px;
  height: calc(100vh - 178px);
}
</style>
