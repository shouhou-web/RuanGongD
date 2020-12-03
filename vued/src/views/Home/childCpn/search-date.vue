<template>
  <!-- 时间选择 -->
  <div id="search-date">
    <div class="date">
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
export default {
  name: "Search",
  data() {
    return {
      start: "",
      end: ""
    };
  },
  watch: {
    start: function(val, oldVal) {
      if (val > this.end) this.end = this._dateAddDays(this.start, 1);
      this._changeTime();
    },
    end: function(val, oldVal) {
      if (val < this.start) this.start = this._dateAddDays(this.end, -1);
      this._changeTime();
    }
  },
  created() {
    let date = new Date();
    let temp =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    this.end = temp;
    this.start = "1700-01-01";
  },
  methods: {
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
    _changeTime() {
      this.$emit("change-time", {
        start: this.start,
        end: this.end
      });
    }
  }
};
</script>

<style scoped>
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
  border: 0 !important;
}

.date input::-webkit-calendar-picker-indicator:active {
  border: 0 !important;
}

/* 控制年字 */
input[type="date"]::-webkit-datetime-edit {
  display: none;
}

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

.date__btn:hover {
  color: #53a2e3;
}
</style>
