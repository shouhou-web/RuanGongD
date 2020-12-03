<template>
  <div class="l-root-card">
    <span class="l-root-card--notice">!</span>
    <div class="l-root-card--header">
      <img
        class="l-root-card--showmore"
        src="@/assets/icons/Root/showmore.svg"
      />
      <m-dropdown position="middle" color="#e83015">
        <template v-slot:show>
          <img
            class="l-root-card--options"
            src="@/assets/icons/Root/options.svg"
          />
        </template>
        <template v-slot:hide>
          <div class="l-root-card--nav">
            <l-button type="text" class="l-root-card--nav-btn">驳回</l-button>
            <l-button type="text" class="l-root-card--nav-btn">接受</l-button>
            <l-button type="text" class="l-root-card--nav-btn"
              >置为未读</l-button
            >
          </div>
        </template>
      </m-dropdown>
    </div>
    <div class="l-root-card--content">
      <div class="l-root-card--content-info">
        <img
          class="l-root-card--reporter-pic"
          :src="require('@/assets/icons/Root/' + imgPath1 + '.jpg')"
        />
        <slot name="reporterProfile"></slot>
        <div class="l-root-card--content-connect" v-if="type == 1">
          举报了文献
        </div>
        <div class="l-root-card--content-connect" v-if="type == 2">
          举报了评论
        </div>
        <div class="l-root-card--content-connect" v-if="type == 3">
          举报了用户
        </div>
        <slot name="reportee" v-if="type != 3"></slot>
        <img
          class="l-root-card--reportee-pic"
          :src="require('assets/image/root/' + imgPath1 + '.jpg')"
          v-if="type == 3"
        />
        <slot name="reporteeProfile"></slot>
      </div>
      <div class="l-root-card--divider">
        <div class="l-root-card--divider-self"></div>
        <div class="l-root-card-divider-circle">
          <img
            class="l-root-card--select"
            src="@/assets/icons/Root/select.svg"
          />
        </div>
      </div>
      <slot name="detail"></slot>
    </div>
  </div>
</template>

<script>
// import mDropdown from "../../../components/common/m-dropdown/m-dropdown.vue";
export default {
  components: {},
  name: "LRootCard",
  props: {
    imgPath1: "",
    imgPath2: "",
    type: ""
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.l-root-card {
  position: relative;
}
.l-root-card--notice {
  background-color: #ffb11b;
  border-radius: 10px;
  color: #ffffff;
  display: block;
  height: 20px;
  position: absolute;
  right: -10px;
  text-align: center;
  top: -10px;
  width: 20px;
}
.l-root-card--header {
  align-content: center;
  background-color: #e83015;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.l-root-card--showmore {
  cursor: pointer;
  height: 20px;
  margin-top: 8px;
  margin-bottom: 6px;
  margin-left: 12px;
  transition: 0.3s;
  width: 20px;
}
.l-root-card--showmore:hover {
  transform: scale(1.2, 1.2);
}
.l-root-card--options {
  cursor: pointer;
  height: 26px;
  margin-left: 7px;
  margin-right: 7px;
  margin-top: 5.5px;
  transition: 0.3s;
  width: 26px;
}
.l-root-card--options:hover {
  transform: rotate(180deg);
}
.l-root-card--nav {
  align-items: center;
  background-color: #ffffff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 3px solid #e83015;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.l-root-card--nav-btn {
  color: #e83015;
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 10px 35px;
  text-align: center;
}
.l-root-card--nav-btn:hover {
  box-shadow: 0px 0px 1px 2px rgba(224, 37, 62, 0.219);
}
.l-root-card--content {
  align-items: center;
  border: 2px solid #e83015;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.l-root-card--content-info {
  align-items: center;
  display: flex;
  flex-direction: row;
}
.l-root-card--reporter-pic {
  border-radius: 25px;
  border: 1px solid #e83015;
  cursor: pointer;
  height: 50px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 5px;
  margin-top: 20px;
  transition: 0.2s;
  width: 50px;
}
.l-root-card--reporter-pic:hover {
  box-shadow: 0px 0px 1px 2px rgba(224, 37, 62, 0.219);
  transition: 0.2s;
}
.l-root-card--reportee-pic {
  border-radius: 25px;
  border: 1px solid #e83015;
  cursor: pointer;
  height: 50px;
  margin-bottom: 20px;
  margin-right: 5px;
  margin-top: 20px;
  transition: 0.2s;
  width: 50px;
}
.l-root-card--reportee-pic:hover {
  box-shadow: 0px 0px 1px 2px rgba(224, 37, 62, 0.219);
  transition: 0.2s;
}
.l-root-card--content-connect {
  color: #62592c;
  font-weight: 800;
  margin-left: 20px;
  margin-right: 20px;
}
.l-root-card--divider {
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 5px;
  width: 96%;
}
.l-root-card--divider-self {
  background-color: #e83015;
  height: 2px;
  width: 100%;
}
.l-root-card-divider-circle {
  background: #e83015;
  border-radius: 10px;
  height: 20px;
  position: absolute;
  right: -10px;
  width: 20px;
}
.l-root-card--select {
  cursor: pointer;
  width: 100%;
}
</style>
