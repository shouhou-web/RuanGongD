<template>
  <!-- 个人信息界面 -->
  <div id="profile">
    <div id="profile-firstlayer" class="firstlayer-outterstyle">

    </div>
    <div id="profile-secondlayer" class="secondlayer-outterstyle">
      <div id="leftpart" class="leftpart-style"></div>
      <div id="rightpart" class="rightpart-style"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.firstlayer-outterstyle {
  margin-left: 5vw;
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;
  width: 90vw;
  height: 200px;
}

.secondlayer-outterstyle {
  margin-left: 5vw;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.336);
  border-radius: 5px;
  width: 90vw;
  height: 450px;
  display: flex;
  flex-direction: row;
}

.leftpart-style {
  margin: 2%;
  width: 46%;
  height: 300px;
  background-color: white;
}

.rightpart-style {
  margin: 2%;
  width: 46%;
  height: 200px;
  background-color: white;
}
</style>
