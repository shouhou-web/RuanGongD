<template>
  <div class="msg-all">
    <div class="msg-header">
      <div class="report-nav">
        <ul class="nav-all">
          <li>
            <div class="nav-item--active">
              发送系统消息
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="msg-body">
      <l-msg-text></l-msg-text>
    </div>
  </div>
</template>

<script>
import LMsgText from "./l-msg-textarea";

export default {
  name: "Sysmsg",
  
  components: {LMsgText}
};
</script>

<style scoped>
.msg-all {
  width: 900px;
}

.msg-header {
  background-color: #ffffff;
  border: #e3e2e6 solid 0.5px;
  border-radius: 4px;
  height: 60px;
  margin-bottom: 20px;
  width: 900px;
}
.report-nav {
  display: flex;
  flex-direction: column;
}

.nav-all {
  align-items: center;
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-left: 20px;
}

.nav-item--active {
  color: #6b757b;
  display: flex;
  flex-direction: column;
  font-size: 17.5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;
}

.msg-body {
  background-color: #ffffff;
  border: #e3e2e6 solid 0.5px;
  border-radius: 4px;
  height: calc(100vh - 186px);;
  padding-top: 30px;
  width: 900px;
}
</style>
