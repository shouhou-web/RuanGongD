<template>
  <!-- 时间选择 -->
  <div id="search-date">
    <div class="date">
      <span class="date__title">发表时间：</span>
      <div class="block">
        <el-date-picker
          v-model="start"
          type="year"
          value-format="yyyy"
          placeholder="起始"
        >
        </el-date-picker>
      </div>
      <span class="date__and">--</span>
      <div class="block">
        <el-date-picker
          v-model="end"
          type="year"
          value-format="yyyy"
          placeholder="终止"
        >
        </el-date-picker>
      </div>
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
  created() {
    this.start = this.$store.state.start;
    this.end = this.$store.state.end;
  },
  watch: {
    start(val, oldVal) {
      if (val > "2020") {
        this.$notify.info({
          title: "提醒",
          message: "不能查看未来的文献"
        });
        this.start = 2020;
      }
      if (val > this.end) this.end = this._dateAddDays(this.start, 1);
      this._changeTime();
      // console.log(this.start, this.end);
    },
    end(val, oldVal) {
      if (val > "2020") {
        this.$notify.info({
          title: "提醒",
          message: "不能查看未来的文献"
        });
        this.end = 2020;
      }
      if (val < this.start) this.start = this._dateAddDays(this.end, -1);
      this._changeTime();
      // console.log(this.start, this.end);
    }
  },
  methods: {
    cancelTime() {
      // 取消选择时间
      this.start = "";
      this.end = "";
    },
    _dateAddDays(dateStr, dayCount) {
      // 调整日期
      let origin = parseInt(dateStr);
      origin += dayCount;
      return origin.toString();
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
  margin: 16px auto;
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

.el-input {
  width: 100px;
}

/deep/.el-input__inner {
  border: 1px solid var(--color-tint) !important;
}
</style>
