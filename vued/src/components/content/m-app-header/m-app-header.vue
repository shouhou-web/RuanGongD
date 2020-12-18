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
        </div>
        <div v-else class="header__right--unlog">
          <a class="header__right__log" href="/login">Log in</a>
          <a class="header__right__reg" href="/register">Join for free</a>
        </div>
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
          check: true
        },
        {
          name: "论坛",
          path: "/forumHome",
          check: false
        }
      ],
      isColor: false
    };
  },
  methods: {
    jump(e) {
      console.log(e);
      this.$router.push({
        path: e.path
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
        query: { userID: this.$store.state.user.userID }
      });
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.user != null;
    }
  },
  created() {
    // console.log(this.$store.state.user);
  },
  components: {}
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
  font-size: 14px;
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
