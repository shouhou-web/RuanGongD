<template>
  <!-- 分类查看 -->
  <div id="search-advance" :style="{ height: height }">
    <ul>
      <li v-for="(item, index) in searchList" :key="index">
        <div class="search__advance" v-if="index == 0">
          <!-- 普通检索框 -->
          <div class="search__main">
            <!-- 切换类型 -->
            <div class="advance" @click="changeAdvance">
              <div class="advance__text" v-if="!isAdvance">高级检索</div>
              <div class="advance__text" v-else>普通检索</div>
            </div>
            <!-- 选择type -->
            <m-click-dropdown
              @change-dropdown="change($event, index, 'type')"
              v-if="isAdvance && isShow"
              :cur="item.type"
              type="click-type"
            />

            <!-- 输入框 -->
            <input v-model="item.value" type="text" maxlength="120" />
          </div>
          <span class="search__sub" @click="search">
            DDL一下
          </span>
        </div>
        <!-- 高级检索框 -->
        <div class="search__advance" v-else-if="isAdvance && isShow">
          <div class="search__main--second">
            <!-- 选择逻辑连接词 -->
            <div class="advance--nop">
              <m-click-dropdown
                @change-dropdown="change($event, index, 'logical')"
                :cur="item.logical"
                type="click-logical"
              />
            </div>
            <!-- 选择搜索类型 -->
            <m-click-dropdown
              @change-dropdown="change($event, index, 'type')"
              :cur="item.type"
              type="click-type"
            />
            <!-- 输入框 -->
            <input v-model="item.value" type="text" maxlength="120" />
          </div>
          <!-- 删除当前项，至少保留两项 -->
          <div @click="deleteItem(index)" v-if="index > 1" class="search__icon">
            -
          </div>
          <div v-else class="search__icon"></div>
          <!-- 在末尾添加一项，仅可在末尾使用 -->
          <div
            @click="addItem"
            v-if="index == searchList.length - 1"
            class="search__icon"
          >
            +
          </div>
        </div>
      </li>
    </ul>
    <search-date v-if="isAdvance && isShow" @changeTime="changeTime" />
  </div>
</template>

<script>
import { advance } from "network/search.js";
import SearchDate from "./search-date";
import MClickDropdown from "components/content/m-click-dropdown/m-click-dropdpwn"

export default {
  name: "Classify",
  props: {
    initSearch: Object,
    isShow: {
      type: Boolean,
      dafault: true
    }
  },
  created() {
    console.log(this.initSearch);
    if (this.initSearch) {
      this.searchList = this.initSearch.searchList;
      this.start = this.initSearch.start;
      this.end = this.initSearch.end;
      this.isAdvance = this.searchList.length > 1 ? true : false;
    }
  },
  data() {
    return {
      isAdvance: false,
      searchList: [
        {
          logical: "NULL",
          type: "SU",
          value: ""
        }
      ],
      start: "",
      end: ""
    };
  },
  watch: {
    searchList: function(val, oldVal) {
      this.$emit("change-list", val);
    },
    isAdvance: function(val, oldVal) {
      this.$emit("change-advance", val);
    }
  },
  computed: {
    height() {
      console.log(this.isShow);
      if (this.isAdvance && this.isShow) {
        let h = 51 * this.searchList.length;
        h += (this.searchList.length - 1) * 10;
        h += 28;
        return h + "px";
      } else return "50px";
    }
  },
  methods: {
    change(e, index, type) {
      // console.log(e, index, type);
      if (type == "type") this.searchList[index].type = e;
      else if (type == "logical") this.searchList[index].logical = e;
    },
    changeAdvance() {
      this.isAdvance = !this.isAdvance;
      if (this.isAdvance && this.searchList.length == 1)
        this.searchList.push({
          logical: "AND",
          type: "KY",
          value: ""
        });
    },
    changeTime(e) {
      this.start = e.start;
      this.end = e.end;
    },
    addItem(index) {
      this.searchList.push({
        logical: "AND",
        type: "SU",
        value: ""
      });
    },
    deleteItem(index) {
      this.searchList.splice(index, 1);
    },
    search() {
      // 搜索
      console.log(this.searchList, this.start, this.end);
      this.$router.push({
        path: "/search",
        query: {
          searchList: this.searchList,
          start: this.start,
          end: this.end
        }
      });
      //   advance(this.searchList, "1900", "2020")
      //     .then(res => {
      //       this.$route.push({
      //         path: "/search",
      //         query: {
      //           searchList: this.searchList,
      //           start: this.start,
      //           end: this.end,
      //           litList: res
      //         }
      //       });
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
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
  line-height: 20px;
  margin: 0 auto 10px;
  width: 710px;
}

.search__main,
.search__main--second {
  border: 1.5px solid var(--color-main);
  display: flex;
  padding: 14px 0;
  width: 610px;
}

.search__main {
  border-right: #fff;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.search__main--second {
  border-radius: 5px;
}

.advance,
.advance--nop {
  border-right: 1px solid grey;
  cursor: pointer;
  padding: 0 15px;
}

.advance--nop {
  padding: 0px;
}

.advance__text:hover {
  color: var(--color-main);
}

.search__advance input {
  border: 0;
  background-color: transparent;
  outline: none;
  margin: 0 10px;
  /* width: 400px; */
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
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: var(--color-main);
  color: #fff;
  cursor: pointer;
  padding: 15.5px;
  letter-spacing: 1px;
}
</style>
