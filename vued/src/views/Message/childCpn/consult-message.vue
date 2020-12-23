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
          <l-button
            class="message__btn"
            :active="isOpen"
            @click="open('reply')"
            type="text"
            size="small"
          >
            回复
          </l-button>
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
    <div v-if="isOpen" class="message__open">
      <div class="message__open__left">
        <img :src="$store.state.user.image" alt="" />
      </div>
      <div class="message__open__middle">
        <textarea
          v-model="content"
          placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
        ></textarea>
      </div>
      <div class="message__open__right">
        <button @click="reply">
          发表
          <br />
          评论
        </button>
      </div>
    </div>
    <div class="message__div"></div>
    <m-hover ref="hover" @submit="assureDelete">
      <div class="hover-content">
        删除该条消息后将无法恢复，是否继续？
      </div>
    </m-hover>
  </div>
</template>

<script>
import { deleteMsg, replyMsg } from "network/message";
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
      isOpen: false,
      content: ""
    };
  },
  methods: {
    open(type) {
      if (type == "reply") this.isOpen = !this.isOpen;
      else if (type == "delete") {
        console.log(this.$refs);
        this.$refs.hover.showHover({
          title: "删除消息",
          submitBtn: "删除",
          cancelBtn: "取消"
        });
      }
    },
    reply() {
      console.log(this.message.messageID);
      replyMsg(this.message.messageID, this.content)
        .then(res => {
          if (res == 1) {
            this.content = "";
            this.isOpen = false;
            this.$notify({
              title: "成功",
              message: "回复成功~",
              type: "success"
            });
            this.$refs.hover.hideHover();
          } else throw new console.error();
        })
        .catch(err => {
          this.$notify.error({
            title: "错误",
            message: "网络错误，请稍后再试~"
          });
          this.$refs.hover.hideHover();
        });
    },
    assureDelete() {
      console.log(this.message.messageID);
      deleteMsg(this.message.messageID)
        .then(res => {
          if (res == 1) {
            this.$notify({
              title: "成功",
              message: "删除消息成功",
              type: "success"
            });
            this.$emit("delete");
          } else throw new console.error();
        })
        .catch(err => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~"
          });
        });
    }
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

.message__btn {
  margin-left: 15px;
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

.message__open {
  align-items: center;
  display: flex;
  margin-bottom: 24px;
}

.message__open__left {
  height: 60px;
  width: 60px;
}

.message__open__left img {
  display: block;
  width: 46px;
  height: 46px;
  border-radius: 50%;
}

.message__open__middle {
  align-items: center;
  display: flex;
  flex: 1;
}

.message__open__middle textarea {
  width: 100%;
  height: 65px;
  resize: none;
  background-color: #f4f5f7;
  border-radius: 4px;
  border: 1px solid #e9eaec;
  color: #555;
  font-size: 13px;
  overflow: auto;
  padding: 5px 10px;
}

.message__open__middle textarea {
  outline: 0;
  margin: 0;
}

.message__open__right {
  width: 80px;
  display: flex;
  justify-content: flex-end;
}

.message__open__right button {
  align-items: center;
  border-radius: 4px;
  background-color: var(--color-main);
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 64px;
  outline: none;
  width: 70px;
}

.hover-content {
  text-indent: 1em;
  letter-spacing: 0.01em;
  padding: 20px 0 0;
}
</style>
