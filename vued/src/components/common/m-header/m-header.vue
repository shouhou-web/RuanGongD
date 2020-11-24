<template>
  <div>
    <div class="nav" :style="{ 'background-color': bgColor }">
      <div class="wrap">
        <div class="nav-left">
          <slot name="left"></slot>
        </div>
        <div class="nav-right">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MHeader",
  props: {
    bgColor: {
      type: String,
      default: "#fff"
    }
  },
  methods: {}
};
</script>
<style scoped>
.nav {
  font-size: 16px;
  padding: 0 auto;
  position: relative;
}

.wrap {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  margin: 0 auto;
  padding: 10px 0;
  width: 100%;
}

.nav-left,
.nav-right {
  align-items: center;
  display: flex;
  height: 36px;
}

.nav-left {
  /* min-width: 385px; */
  margin-left: 20px;
  justify-content: flex-end;
}

.nav-right {
  /* min-width: 510px; */
  margin-right: 20px;
  justify-content: flex-start;
}
</style>
