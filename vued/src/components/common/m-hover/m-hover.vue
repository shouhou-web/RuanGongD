<template>
  <div id="suspended">
    <!-- 阴影 -->
    <div
      :class="[onShow ? '' : 'hover-hide']"
      @click="cancel"
      class="hover-mask"
    ></div>
    <div
      :class="[onShow ? 'hover-show' : 'hover-hide']"
      :style="{ left: left }"
    >
      <div class="hover-wrapper">
        <div v-if="title" class="hover-title">
          {{ title }}
        </div>
        <div class="hover-main">
          <slot></slot>
        </div>
        <div v-if="submitBtn || cancelBtn" class="hover-footer">
          <l-button v-if="submitBtn" @click="submit" size="small">
            {{ submitBtn }}
          </l-button>
          <l-button v-if="cancelBtn" @click="cancel" type="info" size="small">
            {{ cancelBtn }}
          </l-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MHover",
  props: {
    width: 0, // 如果无法居中，则需要传入参数
  },
  data() {
    return {
      onShow: false, // 是否展示
      isMaskCancel: true, //能否通过点击遮盖层退出
      isTitle: true, //是否显示标题
      title: "标题", //标题
      submitBtn: "", // 确定按钮内容
      cancelBtn: "", // 取消按钮内容
    };
  },
  computed: {
    left() {
      if (this.width != 0) return "calc(50% - " + this.width / 2 + "px)";
      else return "auto";
    },
  },
  methods: {
    submit() {
      // this.onShow = false;
      this.$emit("submit", this.title);
    },
    cancel() {
      this.onShow = false;
      this.$emit("cancel");
    },
    showHover({
      onShow = true,
      isMaskCancel = true,
      isTitle = true,
      title = "标题",
      submitBtn = "",
      cancelBtn = "",
    } = {}) {
      this.onShow = onShow;
      this.isMaskCancel = isMaskCancel;
      this.isTitle = isTitle;
      this.title = title;
      this.submitBtn = submitBtn;
      this.cancelBtn = cancelBtn;
    },
    hideHover() {
      this.onShow = false;
    },
  },
};
</script>

<style scoped>
#suspended {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#suspended .hover-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.3;
  z-index: 1628;
}

#suspended .hover-show {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 350px;
  opacity: 1;
  position: fixed;
  top: 20%;
  z-index: 1629;
}

#suspended .hover-hide {
  position: fixed;
  display: none;
}

#suspended .hover-wrapper {
  background-color: #fff;
  border-radius: 4px;
}

#suspended .hover-title {
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  padding: 15px 30px;
}

#suspended .hover-main {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}

#suspended .hover-footer {
  display: flex;
  justify-content: space-around;
  margin: 20px 30px;
}
</style>
