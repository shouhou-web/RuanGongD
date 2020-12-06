<template>
  <!-- 通用导航栏 -->
  <div id="header">
    <m-header>
      <div slot="left">
        <ul class="header__switch">
          <li
            :class="{ 'is-active': item.check }"
            v-for="(item, index) in switchList"
            :key="index"
            @click="jump(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div slot="right">
        导航栏右部
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
      ]
    };
  },
  methods: {
    jump(e) {
      this.$store.commit("changeAppHeader", e);
      let url = "";
      this.switchList.forEach(n => {
        console.log(n);
        if (n.name != e) n.check = false;
        else {
          url = n.path;
          n.check = true;
        }
      });
      this.$router.push({
        path: url
      });
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
  background-color: #0080ff;
  height: 3px;
}
</style>
