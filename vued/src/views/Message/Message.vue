<template>
  <div id="message">
    <m-app-header></m-app-header>
    <div class="main">
      <div class="aside">
        <div class="aside-header">
          消息中心
        </div>
        <ul>
          <li
            class="aside-item"
            @click="toChild(index)"
            :class="[currentIndex == index ? 'aside-item--active' : '']"
            v-for="(item, index) in navList"
            :key="index"
          >
            <div class="pointer"></div>
            <div class="aside__inner">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="content-header">
          <div class="content-title">
            {{ navList[currentIndex].name }}
          </div>
        </div>
        <div class="content-main">
          <!-- 页面主组件 -->
          <div class="content-main--inner">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getAllMsgNum } from "network/message";
export default {
  name: "Message",
  data() {
    return {
      navList: [
        {
          name: "回复我的",
          router: "comment",
        },
        {
          name: "系统通知",
          router: "system",
        },
      ],
    };
  },
  methods: {
    toChild(index) {
      let target = this.navList[index].router;
      this.$router.push("/message/" + target);
    },
  },
  computed: {
    currentIndex() {
      switch (this.$route.path) {
        case "/message/comment":
          return 0;
        case "/message/system":
          return 1;
      }
    },
  },
};
</script>

<style scoped>
#message {
  /* background-color: var(--color-background-main); */
}

#message ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

#message ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #a1c4fd;
}

#message ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(236, 186, 186, 0.2);
  background: none;
  border-radius: 10px;
}

.main {
  display: flex;
  height: calc(100vh - 106px);
  margin: 25px auto 0;
  max-width: var(--width-main);
}

.aside {
  /* background-color: rgba(255, 255, 255, 0.8); */
  background-color: #fff;
  width: 140px;
  margin-right: 40px;
}

.aside-header {
  align-items: center;
  color: #333;
  display: flex;
  font-style: 14px;
  font-weight: 600;
  justify-content: center;
  height: 62px;
}

.aside-item {
  align-items: center;
  color: #6b757b;
  display: flex;
  padding-left: 20px;
}

.aside-item--active,
.aside-item:hover {
  /* color: #2faee3; */
  color: var(--color-tint);
}

.pointer {
  border: 4px solid currentColor;
  border-radius: 50%;
  margin-right: 10px;
}

.aside__inner {
  cursor: pointer;
  font-style: 14px;
  line-height: 40px;
}

.content {
  /* background-color: rgba(255, 255, 255, 0.5); */
  background-color: #fff;
  flex: 1;
}

.content-header {
  padding: 10px 10px 0;
  width: 100%;
}

.content-title {
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  color: #666;
  display: flex;
  font-size: 15px;
  height: 42px;
  padding-left: 16px;
}

.content-main {
  padding: 10px 10px 0;
}

.content-main--inner {
  border-radius: 4px;
}
</style>
