<template>
  <div class="msg-all">
    <div class="msg-header">
      <div class="report-nav">
        <ul class="nav-all">
          <li>
            <div class="nav-item--active">
              发送系统消息
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="msg-body">
      <l-msg-text v-model="msgContent"></l-msg-text>
      <div class="msg-buttons">
        <l-login-button
          class="msg-button"
          :words="'发送'"
          @click="toSend"
        ></l-login-button>
        <l-login-button
          class="msg-button"
          :words="'清空'"
          :buttonType="'white'"
          @click="toCancel"
        ></l-login-button>
      </div>
    </div>
  </div>
</template>

<script>
import LMsgText from "./l-msg-textarea";
import LLoginButton from "../../../Login/childCpn/l-Login-Button";

import { sendSysMsg } from "network/root";

export default {
  name: "Sysmsg",
  data() {
    return {
      msgContent: ""
    };
  },
  methods: {
    toSend() {
      if (!this.msgContent || this.msgContent.length == 0) {
        this.$notify.error({
          title: "发送失败",
          message: "请输入消息内容！"
        });
      } else {
        sendSysMsg(this.msgContent).then(res => {
          if (res == 0) {
            this.$notify.error({
              title: "发送失败",
              message: "再试一次！"
            });
          } else {
            this.$notify.success("发送成功");
            this.msgContent = "";
          }
        });
      }
    },
    toCancel() {
      this.msgContent = "";
      this.$notify.success("清空成功");
    }
  },
  components: { LMsgText, LLoginButton }
};
</script>

<style scoped>
.msg-all {
  width: 900px;
}

.msg-header {
  background-color: #ffffff;
  border: #e3e2e6 solid 0.5px;
  border-radius: 4px;
  height: 60px;
  margin-bottom: 20px;
  width: 900px;
}
.report-nav {
  display: flex;
  flex-direction: column;
}

.nav-all {
  align-items: center;
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-left: 20px;
}

.nav-item--active {
  color: #6b757b;
  display: flex;
  flex-direction: column;
  font-size: 17.5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;
}

.msg-body {
  background-color: #ffffff;
  border: #e3e2e6 solid 0.5px;
  border-radius: 4px;
  height: calc(100vh - 186px);
  padding-top: 30px;
  width: 900px;
}

.msg-buttons {
  align-items: center;
  display: flex;
  flex-direction: row;
}

.msg-button {
  padding-top: 0px;
  width: 80px;
}
</style>
