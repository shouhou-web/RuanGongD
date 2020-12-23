<template>
  <!-- 管理员界面 -->
  <div id="report">
    <m-app-header></m-app-header>
    <div class="root-main">
      <div>
        <div class="root-nav">
          <ul>
            <li
              class="root-nav-item"
              @click="toChild(index)"
              :class="[currentIndex == index ? 'root-nav-item--active' : '']"
              v-for="(item, index) in navList"
              :key="index"
            >
              <div class="root-nav-item--pointer"></div>
              <div class="root-nav-item--inside">
                {{ item.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Root",
  data() {
    return {
      navList: [
        {
          name: "处理举报",
          route: "report"
        },
        {
          name: "处理申请",
          route: "apply"
        },
        {
          name: "发送系统消息",
          route: "sysmsg"
        }
      ]
    };
  },
  methods: {
    toChild(index) {
      let target = this.navList[index].route;
      this.$router.push("/root/" + target);
    }
  },
  computed: {
    currentIndex() {
      switch (this.$route.path) {
        case "/root/report":
          return 0;
        case "/root/report/doc":
          return 0;
        case "/root/report/gate":
          return 0;
        case "/root/report/comment":
          return 0;
        case "/root/report/post":
          return 0;
        case "/root/apply":
          return 1;
        case "/root/sysmsg":
          return 2;
      }
    }
  }
};
</script>

<style scoped>
.root-main {
  display: flex;
  margin: 25px auto 0;
  width: var(--width-main);
}

.root-nav {
  background-color: #fff;
  border: #e3e2e6 solid 0.5px;
  border-radius: 4px;
  height: calc(100vh - 106px);
  margin-right: 40px;
  padding-top: 10px;
  width: 160px;
}

.root-nav-item {
  align-items: center;
  color: #6b757b;
  display: flex;
  padding-left: 20px;
  padding-top: 5px;
}

.root-nav-item--active,
.root-nav-item:hover {
  color: var(--color-tint);
}

.root-nav-item--pointer {
  border: 4px solid currentColor;
  border-radius: 50%;
  margin-right: 10px;
}

.root-nav-item--inside {
  cursor: pointer;
  font-style: 14px;
  line-height: 40px;
}

.m-header--slot {
  color: #ffffff;
}

.root-report-nav {
  border: 2px solid #e3b4b8;
  height: 30%;
  left: 40px;
  margin-top: 20px;
  margin-left: 70px;
  width: 30%;
}

.root-report-cards {
  height: calc(100vh - 57px);
  overflow: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
}

.root-report-card {
  padding-bottom: 30px;
  padding-top: 10px;
  padding-right: 20px;
  padding-left: 20px;
  width: 80%;
}

.root-report--profile {
  align-content: center;
  display: flex;
  flex-direction: column;
  margin-left: 2px;
}

.root-report--id {
  color: #62592c;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 4px;
  transition: 0.3s;
}

.root-report--id:hover {
  color: #f19483;
  transition: 0.3s;
}

.root-report--job {
  color: #62592c;
  font-size: 8px;
}

.root-reportee-title {
  cursor: pointer;
  color: #62592c;
  font-size: 20px;
  font-style: italic;
  transition: 0.3s;
}

.root-reportee-title:hover {
  color: #f19483;
  text-decoration: underline;
  transition: 0.3s;
}

.root-report--detail {
  color: #62592c;
  line-height: 1.5em;
  text-indent: 2em;
}

.delay {
  opacity: 0;
  animation: outin 1s 1;
  animation-fill-mode: forwards;
}

@keyframes outin {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
