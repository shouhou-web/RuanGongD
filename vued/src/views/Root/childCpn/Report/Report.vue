<template>
  <div>
    <div class="report-all">
      <div class="report-nav">
        <ul class="nav-all">
          <li
            @click="toChild(index)"
            v-for="(item, index) in navList"
            :key="index"
          >
            <div
              :class="[
                currentIndex == index ? 'nav-item--active' : 'nav-item--inside'
              ]"
            >
              {{ item.name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Report",
  data() {
    return {
      navList: [
        {
          name: "文档相关",
          route: "doc"
        },
        {
          name: "门户相关",
          route: "gate"
        },
        {
          name: "评论相关",
          route: "comment"
        },
        {
          name: "动态相关",
          route: "post"
        }
      ]
    };
  },
  methods: {
    toChild(index) {
      let target = this.navList[index].route;
      this.$router.push("/root/report/" + target);
    }
  },
  computed: {
    currentIndex() {
      switch (this.$route.path) {
        case "/root/report/doc":
          return 0;
        case "/root/report/gate":
          return 1;
        case "/root/report/comment":
          return 2;
        case "/root/report/post":
          return 3;
      }
    }
  }
};
</script>

<style scoped>
.report-all {
  background-color: #ffffff;
  border: #e3e2e6 solid 0.5px;
  border-radius: 4px;
  height: 60px;
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

.nav-item--inside {
  color: #6b757b;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 17.5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;
}

.nav-item--inside:before {
  background-color: var(--color-tint);
  bottom: -5px;
  content: "";
  height: 1.7px;
  left: 50%;
  position: absolute;
  transition: all 0.3s;
  width: 0;
}

.nav-item--inside:hover {
  color: var(--color-tint);
}

.nav-item--inside:hover:before {
  left: 0;
  right: 0;
  width: 100%;
}

.nav-item--active {
  color: var(--color-tint);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 17.5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;
}

.nav-item--active:before {
  background-color: var(--color-tint);
  bottom: -5px;
  content: "";
  height: 1.7px;
  left: 0%;
  position: absolute;
  transition: all 0.3s;
  width: 100%;
}
</style>
