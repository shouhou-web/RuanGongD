<template>
  <!-- Home -->
  <div id="home">
    <m-header bgColor="#ffffff">
      <div slot="right">
        导航栏右部
      </div>
    </m-header>
    <!-- 主页面 -->
    <div class="logo">
      <img src="@/assets/image/logo.png" alt="" />
    </div>
    <ul>
      <li v-for="(item, index) in searchList" :key="index">
        <div class="search" v-if="index == 0">
          <!-- 普通检索框 -->
          <div class="search__main">
            <!-- 切换类型 -->
            <div class="advance" @click="isAdvance = !isAdvance">
              <div class="advance__text" v-if="!isAdvance">高级检索</div>
              <div class="advance__text" v-else>普通检索</div>
            </div>
            <!-- 选择type -->
            <m-dropdown
              @change-dropdown="change($event, index, 'type')"
              v-if="isAdvance"
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
        <div class="search" v-else-if="isAdvance">
          <div class="search__main--second">
            <!-- 选择逻辑连接词 -->
            <div class="advance--nop">
              <m-dropdown
                @change-dropdown="change($event, index, 'logical')"
                :cur="item.logical"
                type="click-logical"
              />
            </div>
            <!-- 选择搜索类型 -->
            <m-dropdown
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
  </div>
</template>

<script>
import { advance } from "network/search.js";
export default {
  name: "Home",
  data() {
    return {
      isAdvance: true,
      searchList: [
        {
          logical: "NULL",
          type: "SU",
          value: ""
        },
        {
          logical: "AND",
          type: "KY",
          value: ""
        }
      ]
    };
  },
  methods: {
    change(e, index, type) {
      // console.log(e, index, type);
      if (type == "type") this.searchList[index].type = e;
      else if (type == "logical") this.searchList[index].logical = e;
    },
    addItem(index) {
      this.searchList.push({
        logical: "AND",
        type: "ZT",
        value: ""
      });
    },
    deleteItem(index) {
      this.searchList.splice(index, 1);
    },
    search() {
      console.log(this.searchList);
      advance(this.searchList, "1900", "2020")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {}
};
</script>

<style scoped>
#home {
  background-color: #fff;
  min-height: 100vh;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.logo img {
  width: 114px;
}

.search {
  align-items: center;
  display: flex;
  line-height: 20px;
  margin: 0 auto 10px;
  height: auto;
  width: 710px;
}

.search__main,
.search__main--second {
  border: 1.5px solid var(--color-main);
  display: flex;
  padding: 14px 0;
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

.search input {
  border: 0;
  outline: none;
  margin: 0 10px;
  width: 400px;
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
  padding: 15.5px;
  letter-spacing: 1px;
}

.search__sub {
  /* border: .1px solid var(--color-main); */
  background-color: var(--color-main);
  color: #fff;
  cursor: pointer;
}
</style>
