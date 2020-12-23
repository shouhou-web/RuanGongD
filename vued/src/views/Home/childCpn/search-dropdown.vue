<template>
  <!-- 搜索下拉分类 -->
  <div id="sd">
    <div class="sd__header">
      <div class="header__title">
        {{ type }}
      </div>
      <div
        v-if="show"
        @click="changeShow"
        class="header__tri--show"
        :style="{ transform: ' rotate(' + tri + 'deg) translateY(-6px)' }"
      ></div>
      <div
        v-else
        @click="changeShow"
        class="header__tri--hide"
        :style="{ transform: ' rotate(' + tri + 'deg) translateY(0px)' }"
      ></div>
    </div>
    <div v-if="show">
      <ul class="sd__main">
        <li class="main__line" v-for="(item, index) in infList" :key="index">
          <input
            type="checkbox"
            name="item.key"
            id="item.key"
            v-model="item.checked"
            @change="changeItem(index, $event)"
          />
          <div class="main__name">
            {{ item.key }}
          </div>
          <div class="main__value">({{ item.value }})</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchDropdown",
  props: {
    type: String,
    typeList: {
      type: Array,
      default: [
        {
          key: "Open Access",
          value: 1769
        },
        {
          key: "Other",
          value: 1798
        }
      ]
    }
  },
  data() {
    return {
      show: true,
      tri: 0,
      infList: []
    };
  },
  computed: {
    typeList() {
      return this.typeList;
    }
  },
  watch: {
    typeList(val) {
      this.infList = val.map(n => {
        n.checked = false;
        return n;
      });
      console.log("typeList", this.infList);
    }
  },
  computed: {},
  methods: {
    changeShow() {
      this.show = !this.show;
      this.tri += 180;
    },
    changeItem(index, e) {
      let emitList = this.infList.reduce((pre, n) => {
        if (n.checked) {
          pre.push(n.key);
        }
        return pre;
      }, []);
      this.$emit("change-filter", {
        type: this.type,
        list: emitList
      });
    }
  },
  components: {}
};
</script>

<style scoped>
#sd {
  border-bottom: 2px solid #dcdcdc;
  margin: 4px;
  padding: 8px;
}

.sd__header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.header__title {
  font-size: 14px;
  line-height: 20px;
  width: 40%;
}

.header__tri--show,
.header__tri--hide {
  border: 6px solid transparent;
  border-bottom-color: #888;
  cursor: pointer;
  height: 12px;
  width: 12px;
  transition: transform 0.2s ease;
}

.main__line {
  align-items: center;
  color: #333;
  display: flex;
  font-size: 13px;
  font-family: Calibri, "宋体";
  justify-content: space-around;
  margin-bottom: 4px;
}

.main__line input {
}

/* .main__line__block {
  align-items: center;
  border: 1px solid #ebebeb;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 30px;
  width: 30px;
}

.main__line__block--ok {
  background-color: var(--color-main);
  height: 10px;
  width: 10px;
} */

.main__name {
  margin-left: 10px;
  line-height: 1em;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.main__value {
  justify-self: flex-end;
  display: inline-block;
  position: relative;
  vertical-align: top;
}
</style>
