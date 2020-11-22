<template>
  <div id="test">
    <!-- 悬浮窗组件 -->
    <m-hover ref="hover" @submit="submit" @cancel="cancel"></m-hover>
    <div class="test">
      <l-button type="success" @click="show">悬浮窗示例</l-button>
      <m-dropdown position="left">
        <l-button slot="show">下拉导航栏示例-左</l-button>
        <div slot="hide">
          <!-- 在这里填充内容 -->
          测试内容1
        </div>
      </m-dropdown>
      <m-dropdown>
        <l-button slot="show">下拉导航栏示例-中（默认）</l-button>
        <div slot="hide">
          <!-- 在这里填充内容 -->
          测试内容2
        </div>
      </m-dropdown>
      <m-dropdown position="right">
        <l-button slot="show">下拉导航栏示例-右</l-button>
        <div slot="hide">
          <!-- 在这里填充内容 -->
          测试内容3
        </div>
      </m-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    show() {
      // this.$refs.hover.showHover({
      //   title: "hhh",
      //   submitBtn: "芜湖",
      //   cancelBtn: "起飞"
      // });
    },
    submit(e) {
      console.log(e, "芜湖");
    },
    cancel() {
      console.log("起飞");
    }
  },
  components: {}
};
</script>

<style scoped>
.test {
  display: flex;
  justify-content: space-between;
  margin: 40px auto;
  width: 80%;
}
</style>
