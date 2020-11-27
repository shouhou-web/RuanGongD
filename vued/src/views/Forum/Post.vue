<template>
  <!-- 动态页面 -->
  <div id="post">
    <m-header></m-header>
    <div class="post-container">
      <div class="card">
        <div class="card-item">
          <div class="post-header">
            <div class="avatar">
              <v-avatar size="48px"> <img src="https://i.loli.net/2020/11/26/soiOjIlZFpELuTW.png"/></v-avatar>
            </div>
            <div class="name">
              Codevka
            </div>
            <div class="action">
              <v-btn icon v-if="isAuthor == true">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
              <v-btn icon v-else>
                <v-icon>
                  mdi-alert-octagon
                </v-icon>
              </v-btn>
            </div>
          </div>
          <div class="post-body">
            <div class="post-name">Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>
            <div class="post-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </div>
            <div class="post-tags">
              <div class="tag-item">
                <div class="tag-content">Lorem</div>
              </div>
              <div class="tag-item">
                <div class="tag-content">ipsum</div>
              </div>
              <div class="tag-item">
                <div class="tag-content">dolor</div>
              </div>
            </div>
            <div class="post-reply-button">
              <v-btn color="#4F6EF2">
                <font color="white">回复动态</font>
              </v-btn>
            </div>
          </div>
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
    return {
      isAuthor: false,
    };
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.post-container {
  width: 600px;
  height: 100%;
  margin: 0 auto;
}

.comment-container {
  width: 600px;
  margin: 0 auto;
}

.comment-input {
  width: 600px;
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
  padding: 20px 30px 20px 30px;
}

.card-item {
  padding-bottom: 7.5px;
  display: block;
  margin: 0;
}

.post-header {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  position: relative;
  /* height: 100px; */
}

.avatar {
  position: relative;
  /* margin-left: 20px; */
  display: flex;
  align-items: center;
}

.name {
  display: flex;
  align-items: center;
  width: 500px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
}

.action {
  display: flex;
  align-items: flex-end;
  /* border: 1px solid red; */
}

.post-body {
  padding-top: 20px;
}

.post-name {
  /* border: 1px solid purple; */
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.2;
  font-size: 1.375rem;
  height: fit-content;

}

.post-content {
  /* border: 1px solid blue; */
  height: fit-content;
  line-height: 1.25;
  font-size: 14px;
  margin-bottom: 15px;
}

.post-reply-button {
  /* border: 1px solid red; */
  height: fit-content;
}

.post-tags {
  /* border: 1px solid green; */
  margin-bottom: 30px;
  height: fit-content;
}

.tag-item {
  display: inline;
  text-align: center;
  padding-right: 10px;
}

.tag-content {
  font-size: 0.8rem;
  display: inline-block;
  line-height: 1.3;
  color: #555;
  padding: 5px;
  background-color: #ddd;
  padding-top: 0.16em;
  padding-bottom: 0.16em;
  margin-top: -0.16em;
  margin-bottom: -0.16em;
  border-radius: 9999px;
  white-space: nowrap;
}
</style>
