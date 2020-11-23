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
    <!-- 时间选择 -->
    <div v-if="isAdvance" class="date">
      <span class="date__title">发表时间：</span>
      <span class="date__key">{{ start }}</span>
      <input type="date" v-model="start" />
      <span class="date__and">--</span>
      <span class="date__key"> {{ end }} </span>
      <input type="date" v-model="end" />
      <span class="date__btn" v-if="start || end" @click="cancelTime">+</span>
    </div>
  </div>
</template>

<script>
import { advance } from "network/search.js";
export default {
  name: "Home",
  data() {
    return {
      isAdvance: false,
      searchList: [
        {
          logical: "NULL",
          type: "SU",
          value: "",
        },
        {
          logical: "AND",
          type: "KY",
          value: "",
        },
      ],
      start: "",
      end: "",
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
        type: "SU",
        value: "",
      });
    },
    deleteItem(index) {
      this.searchList.splice(index, 1);
    },
    search() {
      // 搜索
      console.log(this.searchList, this.start, this.end);
      advance(this.searchList, "1900", "2020")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelTime() {
      // 取消选择时间
      this.start = "";
      this.end = "";
    },
    _dateAddDays(dateStr, dayCount) {
      // 调整日期
      var tempDate = new Date(dateStr.replace(/-/g, "/")); //把日期字符串转换成日期格式
      var resultDate = new Date((tempDate / 1000 + 86400 * dayCount) * 1000); //增加n天后的日期
      var resultDateStr =
        resultDate.getFullYear() + "-" + (resultDate.getMonth() + 1) + "-"; //将日期转化为字符串格式
      if (resultDate.getDate() > "10") resultDateStr += resultDate.getDate();
      else resultDateStr += "0" + resultDate.getDate();
      console.log(resultDateStr);
      return resultDateStr;
    },
  },
  watch: {
    start: function (val, oldVal) {
      if (val > this.end && this.end != "")
        this.end = this._dateAddDays(this.start, 1);
    },
    end: function (val, oldVal) {
      if (val < this.start) this.start = this._dateAddDays(this.end, -1);
    },
  },
  components: {},
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

.search input {
  border: 0;
  outline: none;
  margin: 0 10px;
  /* width: 400px; */
}

.search__icon,
.date__btn {
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

.date__btn {
  transform: rotate(45deg);
}

.date__btn:hover,
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

.date {
  align-items: center;
  display: flex;
  line-height: 20px;
  margin: 0 auto;
  width: 710px;
  height: 28px;
  padding: 14px 15px 14px 0;
}

.date__title {
  display: inline-block;
  vertical-align: top;
  padding: 0 11px;
  margin: 5px 0;
  color: #888;
}

.date__key {
  width: 90px;
}

.date__and {
  margin: 0 10px;
}

.date input {
  border: 0;
  font-size: 12px;
  text-align: center;
}

.date input::-webkit-calendar-picker-indicator {
  margin-left: 0px;
  border: 0;
}

.date input::-webkit-calendar-picker-indicator:active {
  border: 0 !important;
}

/* 控制年字 */
input[type="date"]::-webkit-datetime-edit {
  display: none;
}
</style>
