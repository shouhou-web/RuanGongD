<template>
  <!-- 分类查看 -->
  <div id="search-advance" :style="{ height: height }">
    <ul>
      <li v-for="(item, index) in $store.state.searchList" :key="index">
        <div class="search__advance" v-if="index == 0">
          <!-- 普通检索框 -->
          <div class="search__main">
            <!-- 切换类型 -->
            <div class="advance" @click="changeAdvance">
              <div class="advance__text" v-if="!isAdvance">普通检索</div>
              <div class="advance__text" v-else>高级检索</div>
            </div>
            <!-- 选择type -->
            <m-click-dropdown
              @change-dropdown="changeType($event, index, 'type')"
              v-if="isAdvance"
              :cur="item.type"
              type="click-type"
            />

            <!-- 输入框 -->
            <input
              @keyup.enter="search"
              @input="changeValue($event, index)"
              :value="$store.state.searchList[index].value"
              type="text"
              maxlength="120"
            />
            <span class="search__sub" @click="search">
              <img src="@/assets/icons/home/search.png" alt="" />
            </span>
          </div>
        </div>
        <!-- 高级检索框 -->
        <div class="search__advance" v-else-if="isAdvance && isShow">
          <div class="search__main--second">
            <!-- 选择逻辑连接词 -->
            <div class="advance--nop">
              <m-click-dropdown
                @change-dropdown="changeType($event, index, 'logical')"
                :cur="item.logical"
                type="click-logical"
              />
            </div>
            <!-- 选择搜索类型 -->
            <m-click-dropdown
              @change-dropdown="changeType($event, index, 'type')"
              :cur="item.type"
              type="click-type"
            />
            <!-- 输入框 -->
            <input
              @keyup.enter="search"
              @input="changeValue($event, index)"
              :value="$store.state.searchList[index].value"
              type="text"
              maxlength="120"
            />
          </div>
          <!-- 删除当前项，至少保留两项 -->
          <div @click="deleteItem(index)" v-if="index > 1" class="search__icon">
            -
          </div>
          <div v-else class="search__icon"></div>
          <!-- 在末尾添加一项，仅可在末尾使用 -->
          <div
            @click="addItem"
            v-if="index == $store.state.searchList.length - 1"
            class="search__icon"
          >
            +
          </div>
        </div>
      </li>
    </ul>
    <search-date v-if="isAdvance && isShow" />
  </div>
</template>

<script>
import { advance, search } from "network/search.js";
import SearchDate from "./search-date";
import MClickDropdown from "components/content/m-click-dropdown/m-click-dropdown";
export default {
  name: "Classify",
  props: {
    initSearch: Object,
    isShow: {
      type: Boolean,
      dafault: true
    }
  },
  data() {
    return {};
  },
  watch: {
    searchList(val, oldVal) {
      this.$emit("change-list", val);
    }
  },
  computed: {
    isAdvance() {
      return this.$store.state.isAdvance;
    },
    height() {
      console.log(this.isShow);
      if (this.isAdvance && this.isShow) {
        let h = 51 * this.$store.state.searchList.length;
        h += (this.$store.state.searchList.length - 1) * 10;
        h += 48;
        return h + "px";
      } else return "50px";
    }
  },
  methods: {
    changeType(e, index, type) {
      // console.log(e, index, type);
      let change = {
        value: e,
        index,
        type
      };
      this.$store.commit("changeSearchList", change);
    },
    changeValue(e, index) {
      console.log(e.target.value, index);
      let change = {
        value: e.target.value,
        index
      };
      this.$store.commit("inputSearchList", change);
    },
    changeAdvance() {
      this.$store.commit("changeAdvance");
      if (
        this.$store.state.isAdvance &&
        this.$store.state.searchList.length == 1
      )
        this.$store.commit("initSearchList");
    },
    addItem() {
      this.$store.commit("addSearchList");
    },
    deleteItem(index) {
      // this.searchList.splice(index, 1);
      this.$store.commit("deleteSearchList", index);
    },
    _checkSearch() {
      let check = false;
      if (this.$store.state.isAdvance) {
        this.$store.state.searchList.forEach(item => {
          if (item.value == "") {
            this.$notify.error({
              title: "错误",
              message: "请输入搜索内容"
            });
            check = true;
          }
        });
      } else if (this.$store.state.searchList[0].value == "") {
        this.$notify.error({
          title: "错误",
          message: "请输入搜索内容"
        });
        check = true;
      }
      if (check) return false;
      else return true;
    },
    search() {
      // 搜索
      if (!this._checkSearch()) return;
      if (this.$store.state.isAdvance) {
        let start = this.$store.state.start;
        let end = this.$store.state.end;
        if (start == "" || end == "") {
          start = "1800";
          end = "2021";
        }
        advance(this.$store.state.searchList, start, end)
          .then(res => {
            console.log("advance", res);
            this.$store.commit("setSearchRes", res);
            this.$router.push({
              path: "/search"
            });
          })
          .catch(err => {
            this.$notify.error({
              title: "错误",
              message: "网络异常，请稍后重试"
            });
          });
      } else
        search(this.$store.state.searchList[0])
          .then(res => {
            console.log("search", res);
            this.$store.commit("setSearchRes", res);
            this.$router.push({
              path: "/search"
            });
          })
          .catch(err => {
            this.$notify.error({
              title: "错误",
              message: "网络异常，请稍后重试"
            });
          });
    }
  },
  components: {
    SearchDate,
    MClickDropdown
  }
};
</script>

<style scoped>
#search-advance {
  transition: height 0.1s ease;
}

.search__advance {
  align-items: center;
  display: flex;
  font-size: 14px;
  line-height: 20px;
  margin: 0 auto 10px;
  width: 710px;
}

.search__main,
.search__main--second {
  /* box-shadow: 0 0 2px rgba(0, 0, 0, 0.18), 0 1px 3px rgba(0, 0, 0, 0.12); */
  /* box-shadow: 0 0 2px rgba(30, 35, 70, 0.18), 0 1px 3px rgba(73, 61, 124, 0.12); */
  border: 1px solid var(--color-tint);
  border-radius: 2px;
  display: flex;
  padding: 14px 14px 14px 0;
}

.search__main {
  width: 710px;
}

.search__main--second {
  width: 610px;
}

.advance,
.advance--nop {
  /* border-right: 1px solid grey; */
  border-right: 1px solid var(--color-tint);
  cursor: pointer;
  text-align: center;
}

.advance--nop {
  padding: 0px;
}

.advance__text {
  width: 85px;
}

.advance__text:hover {
  color: var(--color-main);
}

.search__main input,
.search__main--second input {
  border: 0;
  background-color: transparent;
  outline: none;
  margin: 0 10px;
  flex: 1;
}

.search__icon {
  align-items: center;
  background-color: #fff;
  color: #bcbcbc;
  cursor: pointer;
  display: flex;
  margin-left: 20px;
  font-size: 26px;
  font-weight: bold;
  justify-content: center;
  height: 29px;
  width: 29px;
}

.search__icon:hover {
  color: #53a2e3;
}

.search__sub {
  align-items: center;
  display: flex;
  color: #fff;
  cursor: pointer;
}

.search__sub img {
  width: 15px;
  height: 15px;
}
</style>
