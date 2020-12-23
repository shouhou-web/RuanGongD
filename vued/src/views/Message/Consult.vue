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
      messageList: [] // 消息列表
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
