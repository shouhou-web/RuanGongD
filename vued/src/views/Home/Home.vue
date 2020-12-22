<template>
  <!-- Home -->
  <div id="home">
    <m-app-header></m-app-header>
    <!-- 主页面 -->
    <div class="logo">
      <img src="@/assets/image/home/logo.png" alt="" />
    </div>
    <search-advance
      @change-list="changeList"
      @change-time="changeTime"
      :isShow="true"
    />
    <div class="open">
      <div
        @click="show(0)"
        :class="{ 'open--active': openCiation }"
        class="open__left"
      >
        高被引论文
      </div>
      <div
        @click="show(1)"
        :class="{ 'open--active': openCollect }"
        class="open__right"
      >
        热门论文
      </div>
    </div>
    <div class="footer">
      <home-literature
        v-if="showList.length > 0"
        :list="showList"
        :title="openTitle"
      ></home-literature>
      <div class="footer--describe">
        DDL学术让你更强大
      </div>
    </div>
  </div>
</template>

<script>
import searchAdvance from "./childCpn/search-advance";
import homeLiterature from "./childCpn/home-literature";
import { getHighCollect, getHighCitation } from "network/home.js";
export default {
  name: "Home",
  created() {
    // if (!this.$store.state.isHome) {
      getHighCollect().then(res => {
        console.log("highCollect", res);
        this.$store.commit("setHomeCollect", res);
      });
      getHighCitation().then(res => {
        console.log("highCitation", res);
        this.$store.commit("setHomeCiation", res.citationList);
      });
    // }
  },
  data() {
    return {
      showList: [],
      start: "",
      end: "",
      openTitle: "",
      openCiation: false,
      openCollect: false
    };
  },
  methods: {
    show(e) {
      if (e == 0) {
        this.openCollect = false;
        this.openCiation = !this.openCiation;
        this.openTitle = "高被引论文";
        if (this.openCiation) this.showList = this.$store.state.ciationList;
        else this.showList = [];
      } else if (e == 1) {
        this.openTitle = "热门论文";
        this.openCiation = false;
        this.openCollect = !this.openCollect;
        if (this.openCollect) this.showList = this.$store.state.collectList;
        else this.showList = [];
      }
    },
    changeList(e) {
      this.searchList = e;
    },
    changeTime(e) {
      this.start = e.start;
      this.end = e.end;
    }
  },
  components: {
    searchAdvance,
    homeLiterature
  }
};
</script>

<style scoped>
#home {
  background-color: #fff;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
}

.logo {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.logo img {
  width: 114px;
}

.open {
  display: flex;
  justify-content: space-around;
  width: 400px;
  margin: 20px auto;
}

.open__left,
.open__right {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 11px 4px;
  padding: 0 16px;
  line-height: 27px;
  height: 36px;
  width: 154px;
  cursor: pointer;

  border: 2px solid #ebebeb;
  border-radius: 8px;
  color: #6b757b;
  font-size: 17px;
  transition: 0.3s;
}

.open--active,
.open__left:hover,
.open__right:hover {
  /* background-color: #f8f9fa;
  background-image: -webkit-linear-gradient(top, #f8f9fa, #f8f9fa);
  border: 1px solid #dadce0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color: #202124; */
  border-color: #6b757b;
  /* color: #ffffff; */
  transition: 0.3s;
}

.footer {
  /* display: flex; */
  justify-content: space-between;
  /* width: var(--width-main); */
  width: 875px;
  margin: 30px auto;
}

.footer--describe {
  color: #006621;
  font-weight: normal;
  font-size: 18px;
  text-align: center;
  margin: 0 auto;
}
</style>
