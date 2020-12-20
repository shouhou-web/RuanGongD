<template>
  <div>
    <ul class="message-list">
      <li v-for="(item, index) in messageList" :key="index">
        <system-message
          @delete="deleteItem(index)"
          :message="item"
        ></system-message>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSystemMsg } from "network/message";
import SystemMessage from "./childCpn/system-message";
export default {
  content: "Message",
  components: {
    SystemMessage,
  },
  data() {
    return {
      messageList: [
        {
          type: 3,
          sendTime: "刚刚",
          content: "软工展示",
        },
        {
          type: 4,
          sendTime: "刚刚",
          content: "单身同盟",
        },
        {
          type:5,
          sendTime: "刚刚",
          content: "test1",
        },
        {
          type: 6,
          sendTime: "刚刚",
          content: "test2",
        },
        {
          type: 7,
          sendTime: "刚刚",
          content: "test3",
        },
        {
          type: 8,
          sendTime: "刚刚",
          content: "北航炸酱面",
        },
        {
          type: 11,
          sendTime: "刚刚",
          content: "北航炸酱面不好吃的一百个理由",
        },
      ], // 消息列表
    };
  },
  created() {
    console.log(this.$store.state)
    getSystemMsg(this.$store.state.user.userID)
      .then((res) => {
        console.log("system message", res);
        this.messageList = res;
      })
      // .then(getSystemMsg(this.$store.state.user.userID))
      // .then(
      //   getAllMsgNum(this.$store.state.user.userID).then((res) => {
      //     this.$store.commit("setAllMsgNum", res);
      //   })
      // )
      .catch((err) => {
        this.$notify.error({
          title: "网络错误",
          message: "请稍后重试~",
        });
      });
  },
  methods: {
    deleteItem(index) {
      console.log("itemIndex", index);
      this.messageList.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.message-list {
  border-radius: 4px;
  margin-bottom: 10px;
  height: calc(100vh - 178px);
  overflow: auto;
}
</style>
