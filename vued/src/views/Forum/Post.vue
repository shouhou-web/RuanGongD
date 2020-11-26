<template>
  <!-- 动态页面 -->
  <div id="post">
    <m-header></m-header>
    <div class="post-container">
      <div class="card">
        <div class="card-item">
          <div class="post-header">
            <div class="avatar"><img src="https://i.loli.net/2020/11/26/soiOjIlZFpELuTW.png" /></div>
          </div>
          <div class="post-content"></div>
          <div class="post-tags"></div>
        </div>
      </div>
    </div>
    <div class="comment-container">
      <div class="card">
        <div class="card-header"></div>
        <div class="card-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "post",
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.post-container {
  width: var(--width-main);
  height: 100%;
  margin: 0 auto;
}

.comment-container {
  width: var(--width-main);
  margin: 0 auto;
}

.comment-input {
  width: var(--width-main);
  margin: 0 auto;
}

.card {
  width: initial;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.18), 0 1px 3px rgba(0, 0, 0, 0.12);
  padding: 30px;
}

.card-item {
  padding-bottom: 7.5px;
  display: block;
  margin: 0;
}

.post-header {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
}

.avatar {
  position: relative;
  overflow: hidden;
  display: flex;
  width: 64px;
  height: 64px;
  border-radius: 9999px;
  align-items: center;
}
</style>
