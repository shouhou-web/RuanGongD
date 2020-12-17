<template>
  <div>
    <div class="message">
      <!-- 评论人头像 -->
      <div class="message-header">
        <img :src="message.image" alt="" />
      </div>
      <div class="message-main">
        <div class="message__line1">
          <span class="message__name">
            {{ message.senderUserName }}
          </span>
          <span class="message__type">
            回复了你的动态
          </span>
          <span class="message__replyname">
            {{ message.originalContent }}
          </span>
        </div>
        <div class="message__line2">
          {{ message.replyContent }}
        </div>
        <div class="message__line3">
          <div class="message__time">
            {{ message.sendTime }}
          </div>
        </div>
      </div>
      <div @click="open" class="message-aside">
        <img
          class="message-aside__img"
          src="@/assets/icons/message/delete.png"
          alt=""
        />
        <div class="message-aside__text">删除该消息</div>
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
import { deleteMsg } from "network/message";
export default {
  name: "CommentMessage",
  props: {
    message: {
      // message消息内容
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      openAssure: false // 是否打开确认框
    };
  },
  computed: {
    // msgType() {
    //   if (this.message.type == 1) return "评论了你的文献";
    //   else return "回复了你的动态";
    // }
  },
  methods: {
    open() {
      this.$refs.hover.showHover({
        title: "删除消息",
        submitBtn: "删除",
        cancelBtn: "取消"
      });
    },
    assureDelete() {
      console.log(this.message.messageID);
      deleteMsg(this.message.messageID)
        .then(res => {
          if (res == 0) {
            this.$notify({
              title: "成功",
              message: "删除消息成功",
              type: "success"
            });
            this.$emit("delete");
          }
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
  display: flex;
  font-size: 14px;
  line-height: 15px;
  margin-bottom: 10px;
}

.message__name {
  color: #222;
  margin-right: 8px;
  font-weight: bold;
}

.message__replyname {
  color: var(--color-main);
  display: inline-block;
  font-weight: 600;
  margin-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
  white-space: nowrap;
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
  padding: 20px 0 10px;
}
</style>
