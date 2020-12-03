<template>
  <!-- 搜索下拉分类 -->
  <div id="sd">
    <div class="sd__header">
      <div class="header__title">
        {{ type }}
      </div>
      <div class="header__tri"></div>
    </div>
    <ul class="sd__main" v-for="(item, index) in typeList" :key="index">
      <li class="main__line">
        <div class="main__line__block">
          <div class="main__line__block--ok"></div>
        </div>
        <div class="main__name">
          {{ item.key }}
        </div>
        <div class="main__value">({{ item.value }})</div>
      </li>
    </ul>
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
    return {};
  },
  methods: {},
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
  font-size: 18px;
  line-height: 18px;
  width: 38%;
}

.header__tri {
  border: 6px solid transparent;
  border-top-color: #888;
  cursor: pointer;
  margin-top: 3px;
  margin-left: 3px;
  justify-self: flex-end;
  height: 12px;
  width: 12px;
}

.main__line {
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin-bottom: 4px;
}

.main__line__block {
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
}

.main__name {
  font-size: 16px;
  margin-left: 10px;
  line-height: 1em;
  width: 75%;
}

.main__value {
  justify-self: flex-end;
  display: inline-block;
  font-size: 14px;
  position: relative;
  vertical-align: top;
}
</style>
