<template>
  <!-- 通用导航栏 -->
  <div id="header">
    <m-header>
      <div slot="left">
        <ul class="header__switch">
          <li
            :class="{ 'is-active': index == $store.state.appHeaderCurIndex }"
            v-for="(item, index) in switchList"
            :key="index"
            @click="jump(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div slot="right">
        <div v-if="isLogin" class="header__right">
          <div
            class="header__icon"
            @mouseover="color"
            @mouseout="color"
            @click="toMessage"
          >
            <img
              v-if="isColor"
              src="@/assets/icons/header/msg-hover.png"
              alt=""
            />
            <img v-else src="@/assets/icons/header/msg.png" alt="" />
          </div>
          <div class="header__avator" @click="toProfile">
            <img :src="$store.state.user.image" alt="" />
          </div>
          <div @click="showAvator" class="header__down">
            <img src="@/assets/icons/home/down.png" alt="" />
            <div
              class="header__down--hide"
              v-if="isHeaderDown"
              @mouseleave="hideAvator"
            >
              <ul>
                <li v-for="(item, index) in avatorList" :key="index">
                  <div
                    class="header__down__item"
                    v-if="item.type == curType"
                    @click="toAvator(item.path)"
                  >
                    {{ item.name }}
                  </div>
                </li>
                <div class="header__down__div"></div>
                <li>
                  <div class="header__down__item" @click="logOut">
                    登出账户
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul class="header__switch">
          <li
            :class="{ 'is-active': 2 == $store.state.appHeaderCurIndex }"
            @click="jump({ path: '/login' })"
          >
            登录
          </li>
          <li
            :class="{ 'is-active': 3 == $store.state.appHeaderCurIndex }"
            @click="jump({ path: '/register' })"
          >
            注册
          </li>
        </ul>
        <!-- <div v-else class="header__right--unlog">
          <a class="header__right__log" href="/login">登录</a>
          <a class="header__right__reg" href="/register">注册</a>
        </div> -->
      </div>
    </m-header>
  </div>
</template>

<script>
export default {
  name: "MAppHeader",
  data() {
    return {
      switchList: [
        {
          name: "主页",
          path: "/",
          check: true,
        },
        {
          name: "论坛",
          path: "/forumHome",
          check: false,
        },
      ],
      avatorList: [
        {
          type: 0,
          name: "个人空间",
          path: "/profile",
        },
        {
          type: 1,
          name: "个人门户",
          path: "/intro",
        },
        {
          type: 1,
          name: "个人动态",
          path: "/intro/1",
        },
        {
          type: 2,
          name: "后台管理",
          path: "/root",
        },
      ],
      isColor: false,
      isHeaderDown: false,
    };
  },
  methods: {
    jump(e) {
      console.log(e);
      this.$router.push({
        path: e.path,
      });
    },
    color() {
      this.isColor = !this.isColor;
    },
    toMessage() {
      this.$router.push({ path: "/message" });
    },
    toProfile() {
      this.$router.push({
        path: "/profile",
        query: { userID: this.$store.state.user.userID },
      });
    },
    toIntro(e) {
      this.$router.push({
        path: "/intro",
        query: {
          userID: this.$store.state.user.userID,
          authorID: this.$store.state.user.authorID,
          see: e,
        },
      });
    },
    toRoot() {
      this.$router.push({
        path: "/root",
        query: { userID: this.$store.state.user.userID },
      });
    },
    showAvator() {
      this.isHeaderDown = true;
    },
    hideAvator() {
      this.isHeaderDown = false;
    },
    toAvator(path) {
      switch (path) {
        case "/profile":
          this.toProfile();
          break;
        case "/intro":
          this.toIntro(0);
          break;
        case "/intro/1":
          this.toIntro(1);
          break;
        case "/root":
          this.toRoot();
          break;
      }
    },
    logOut() {
      this.$store.commit("logout");
      this.$router.push({
        path: "/",
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.user != null;
    },
    curType() {
      // return 2;
      return this.$store.state.user.userIdentity;
    },
  },
  created() {
    // console.log(this.$store.state.user);
  },
  components: {},
};
</script>

<style scoped>
#header {
  border-bottom: 1px solid #ddd;
}
.header__switch {
  display: flex;
}

.header__switch li {
  align-items: center;
  color: #333;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  height: 56px;
  margin-right: 30px;
  position: relative;
  padding: 0 15px;
}

.header__switch li::before {
  height: 1px;
  background-color: #ddd;
  content: " ";
  position: absolute;
  bottom: -1px;
  left: -4px;
  right: -4px;
  transition: background-color 0.1s linear, border-color 0.1s linear;
}

.header__switch .is-active::before,
.header__switch li:hover::before {
  background-color: var(--color-tint);
  height: 3px;
}

.header__right {
  align-items: center;
  display: flex;
}

.header__icon,
.header__avator {
  align-items: center;
  border: 1px solid #888;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 42px;
  margin-right: 20px;
  width: 42px;
}

.header__down {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 16px;
  margin: 3px 0 0 -15px;
  position: relative;
  width: 16px;
}

.header__down img {
  height: 100%;
  width: 100%;
}

.header__down--hide {
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.13), 0 3px 6px rgba(0, 0, 0, 0.09);
  display: flex;
  flex-direction: column;
  left: -200px;
  min-width: 230px;
  position: absolute;
  padding-top: 5px;
  padding-bottom: 5px;
  top: 36px;
  z-index: 7000;
}

.header__down--hide li {
  font-size: 0.875rem;
  padding: 0 2px;
}

.header__down--hide li:hover .header__down__item::before {
  content: "";
  position: absolute;
  /* background: #bbb; */
  background-color: var(--color-tint);
  transform: translate(0, 0%);
  transition: 0.15s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  right: 100%;
  top: 0;
  bottom: 0;
  width: 2px;
}

.header__down__item {
  align-items: center;
  background: #fff;
  border: 0;
  color: #555;
  cursor: pointer;
  display: flex;
  padding: 0.7375rem 1.25rem;
  text-align: left;
  position: relative;
  width: 100%;
}

.header__down__div {
  display: block;
  height: 1px;
  background: #ddd;
  margin-top: 5px;
  margin-bottom: 5px;
}

.header__icon:hover {
  background-color: #888;
}

.header__icon img {
  height: 20px;
  transform: rotate(30deg);
  width: 20px;
}

.header__avator img {
  height: 90%;
  width: 90%;
  border-radius: 50%;
}

.header__right__log,
.header__right__reg {
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  padding-bottom: 3px;
}

.header__right__log {
  color: #677469;
}

.header__right__log:hover {
  border-bottom: 2px solid #677469;
  text-decoration: none;
}

.header__right__reg {
  color: var(--color-main);
  margin-left: 20px;
}

.header__right__reg:hover {
  border-bottom: 2px solid var(--color-main);
  text-decoration: none;
}
</style>
