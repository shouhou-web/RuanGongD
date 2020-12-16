<template>
  <div>
    <div class="message">
      <div class="message-header">
        <img :src="message.image" alt="" />
      </div>
      <div class="message-main">
        <div class="message__line1">
          <span class="message__name">
            {{ message.senderUserName }}
          </span>
          <span class="message__type">
            向你发送了
          </span>
          <span class="message__teamname">
            咨询消息
          </span>
        </div>
        <div class="message__line2">
          {{ message.content }}
        </div>
        <div class="message__line3">
          <div class="message__time">
            {{ message.sendTime }}
          </div>
        </div>
      </div>
      <div @click="open('delete')" class="message-aside">
        <img
          class="message-aside__img"
          src="@/assets/icons/message/delete.png"
          alt=""
        />
        <div class="message-aside__text">删除该消息</div>
      </div>
    </div>
    <div class="message__div"></div>
    <m-hover ref="hover" @submit="submit" @cancel="cancel"> </m-hover>
  </div>
</template>

<script>
// import {
//   deleteMsg,
//   acceptMember,
//   refuseMember,
//   joinTeam,
//   refuseTeam,
// } from "network/message";
export default {
  name: "CommonMessage",
  props: {
    message: {
      // message消息内容
      type: Object,
      default: {}
    }
  },
  computed: {},
  data() {
    return {
      openAssure: false, // 是否打开确认框
      openType: "", // 确认框类型
      assureTitle: "", // 确认框标题
      assureContent: "" // 确认框内容
    };
  },
  methods: {
    open(type) {
      console.log(type);
      // 打开悬浮窗
      this.openType = type;
      this.openAssure = true;
    },
    submit() {}
  }
};
</script>

<style scoped>
.message {
  display: flex;
  padding-top: 24px;
  padding-bottom: 24px;
}

.message-header {
  width: 60px;
  height: 46px;
}

.message-header img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
}

.message-main {
  flex: 1;
}

.message__line1 {
  color: #505050;
  font-size: 14px;
  line-height: 15px;
  margin-bottom: 10px;
}

.message__name {
  color: #222;
  margin-right: 8px;
  font-weight: bold;
}

.message__teamname {
  color: skyblue;
  font-weight: 600;
}

.message__line2 {
  color: #222;
  font-size: 14px;
  margin-bottom: 10px;
}

.message__line3 {
  align-items: center;
  color: #999;
  display: flex;
  font-size: 12px;
  line-height: 22px;
}

.message__time {
  min-width: 50px;
}

.my-button {
  margin-left: 5px;
  padding: 5px;
}

.message:hover .message-aside {
  opacity: 1;
}

.message-aside {
  align-items: center;
  color: #999;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  opacity: 0;
  width: 100px;
}

.message-aside__img {
  height: 30px;
  width: 30px;
}

.message-aside__text {
  font-size: 12px;
  margin-top: 10px;
}

.message__div {
  border-bottom: 1px solid #e5e9ef;
  height: 1px;
  margin: 0 auto;
  position: relative;
  width: calc(100% - 44px);
}

.hover-content {
  margin-bottom: 5px;
  padding: 7px;
  width: 500px;
}
</style>
