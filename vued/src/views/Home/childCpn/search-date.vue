<template>
  <!-- 时间选择 -->
  <div id="search-date">
    <div class="date">
      <span class="date__title">发表时间：</span>
      <div class="block">
        <el-date-picker
          v-model="start1"
          type="year"
          value-format="yyyy"
          placeholder="起始"
        >
        </el-date-picker>
      </div>
      <span class="date__and">--</span>
      <div class="block">
        <el-date-picker
          v-model="end1"
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
      start1: "",
      end1: ""
    };
  },
  // computed: {
  //   start() {
  //     console.log("start");
  //     this.start1 = this.$store.state.start;
  //     return this.$store.state.start;
  //   },
  //   end() {
  //     console.log("end");
  //     this.end1 = this.$store.state.end;
  //     return this.$store.state.end;
  //   }
  // },
  created() {
    this.start1 = this.$store.state.start;
    this.end1 = this.$store.state.end;
  },
  watch: {
    start1(val, oldVal) {
      let flag = true;
      if (val > "2020") {
        this.$notify.info({
          title: "提醒",
          message: "不能查看未来的文献"
        });
        this.$store.commit("setStart", "2020");
        this.start1 = "2020";
        flag = false;
      } else {
        this.$store.commit("setStart", val);
        this.start1 = val;
      }
      if (flag && (this.end1 == "" || val > this.end1)) {
        this.$store.commit("setEnd", this._dateAddDays(val, 1));
        this.end1 = this._dateAddDays(val, 1);
      }
    },
    end1(val, oldVal) {
      let flag = true;
      if (val > "2020") {
        this.$notify.info({
          title: "提醒",
          message: "不能查看未来的文献"
        });
        this.$store.commit("setEnd", "2020");
        this.end1 = "2020";
        flag = false;
      } else this.$store.commit("setEnd", val);
      if (flag && (this.start1 == "" || val < this.start1)) {
        this.$store.commit("setStart", this._dateAddDays(val, -1));
        this.start1 = this._dateAddDays(val, -1);
      }
    }
  },
  methods: {
    cancelTime() {
      // 取消选择时间
      this.$store.commit("setStart", "");
      this.$store.commit("setEnd", "");
    },
    _dateAddDays(dateStr, dayCount) {
      // 调整日期
      let origin = parseInt(dateStr);
      origin += dayCount;
      return origin.toString();
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
