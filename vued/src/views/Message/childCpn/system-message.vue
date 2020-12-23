<template>
  <div>
    <div class="message">
      <div class="message-main">
        <!-- 第一行 -->
        <div class="message-line1">
          <span class="message__title">
            {{ messageType }}
          </span>
          <span class="message__time">
            {{ message.sendTime }}
          </span>
        </div>
        <!-- 第二行 -->
        <div class="message-line2">
          <span class="message__content">
            {{ content }}
          </span>
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
        删除消息后不可恢复，是否确认删除？
      </div>
    </m-hover>
  </div>
</template>

<script>
import { deleteMsg } from "network/message";
export default {
  content: "SystemMessage",
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
    messageType() {
      switch (this.message.type) {
        case 1:
          return "管理员消息";
        case 4:
          return "举报成功";
        case 5:
          return "举报失败";
        case 6:
          return "申请成功";
        case 7:
          return "申请失败";
        case 8:
          return "评论被举报";
        case 9:
          return "动态被举报";
        case 10:
          return "门户被举报";
      }
    },
    content() {
      switch (this.message.type) {
        case 1:
          return this.message.content;
        case 4:
          return (
            "您举报的" +
            this.message.content +
            "已被管理员处理，感谢您对网站学术氛围的维护。"
          );
        case 5:
          return "您的举报已被管理员驳回，理由是：" + this.message.content + "";
        case 6:
          return "恭喜，您对" + this.message.content + "的门户申请已成功";
        case 7:
          return (
            "很遗憾，您的申请已被管理员驳回，理由是：" + this.message.content
          );
        case 8:
          return "您的评论" + this.message.content + "被举报，现已被管理员删除";
        case 9:
          return "您的动态" + this.message.content + "被举报，现已被管理员删除";
        case 10:
          return "您的门户被举报冒领，现已撤回您与该门户的绑定关系";
      }
    }
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
      // 删除消息
      console.log(this.message.messageID);
      deleteMsg(this.message.messageID)
        .then(res => {
          if (res == 1) {
            this.$notify({
              title: "成功",
              message: "删除消息成功",
              type: "success"
            });
            this.$refs.hover.hideHover();
            this.$emit("delete");
          } else throw new Error();
        })
        .catch(err => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~"
          });
          this.$refs.hover.hideHover();
        });
    }
  }
};
</script>

<style scoped>
.message {
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  margin-bottom: 10px;
  padding: 24px 16px;
}

.message-main {
  flex: 1;
  width: 670px;
}

.message-line1 {
  font-size: 14px;
  line-height: 24px;
}

.message__title {
  color: #333;
  font-weight: 700;
}

.message__time {
  color: #999;
  font-size: 12px;
  line-height: 22px;
  margin-left: 10px;
}

.message-line2 {
  color: #666;
  font-size: 14px;
  line-height: 24px;
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
  justify-content: flex-end;
  height: 48px;
  opacity: 0;
  width: 100px;
}

.message-aside__img {
  height: 24px;
  width: 24px;
}

.message-aside__text {
  font-size: 12px;
  margin-top: 10px;
}

.hover-content {
  text-indent: 1em;
  letter-spacing: 0.01em;
  padding: 20px 0 0;
}
</style>
