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
        <div class="header__right">
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
            <img
              src="https://img-static.mihoyo.com/communityweb/upload/820f461e107e17f11d8fa8c5e45d5289.png"
              alt=""
            />
          </div>
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
      // this.$store.commit("changeAppHeader", e);
      console.log(e);
      this.$router.push({
        path: e.path
      });
    },
    color() {
      this.isColor = !this.isColor;
    },
    toMessage() {
      this.$store.commit("changeAppHeader", {});
      this.$router.push({ path: "/message" });
    },
    toProfile() {
      this.$store.commit("changeAppHeader", {});
      this.$router.push({ path: "/profile", query: { userID: this.$store.state.user.userID } });
    }
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
}
</style>
