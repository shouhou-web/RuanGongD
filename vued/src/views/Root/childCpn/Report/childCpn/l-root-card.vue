<template>
  <div class="l-root-card">
    <span class="l-root-card--notice" v-if="!hasRead">!</span>
    <div class="l-root-card--header">
      <img
        class="l-root-card--showmore"
        :style="{ transform: 'rotate(' + rotationAngle + 'deg)' }"
        :class="canShowMore ? '' : 'l-root-card--invisible'"
        src="@/assets/icons/root/showmore.svg"
        @click="showMore"
      />
      <m-dropdown
        class="l-root-card--options-anime"
        position="middle"
        color="#e83015"
      >
        <template v-slot:show>
          <img
            class="l-root-card--options"
            src="@/assets/icons/root/options.svg"
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
      <div class="l-root-card--content-upper">
        <div class="l-root-card--content-info">
          <img
            class="l-root-card--reporter-pic"
            :src="require('@/assets/image/root/' + imgPath + '.jpg')"
          />
          <slot name="reporterProfile"></slot>
          <div class="l-root-card--content-connect">
            举报了文献
          </div>
          <slot name="reportee"></slot>
        </div>
      </div>
      <div class="l-root-card--divider">
        <div class="l-root-card--divider-self"></div>
      </div>
      <div class="l-root-card--content-lower" ref="lower">
        <div class="l-root-card--detail" ref="detail">
          <slot name="detail"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "LRootCard",
  props: {
    hasRead: {
      type: Boolean,
      default: false
    },
    imgPath: "",
    canShowMore: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rotationAngle: 0,
      showing: false
    };
  },
  methods: {
    showMore() {
      if(!this.canShowMore)
        return;
      this.rotationAngle += 180;
      if ((this.rotationAngle / 180) % 2)
        this.$refs.detail.style.height = "auto";
      else this.$refs.detail.style.height = "70px";
      this.$emit('toShowMore')
    }
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

.l-root-card--invisible {
  cursor: auto;
  opacity: 0;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

.l-root-card--options-anime:hover .l-root-card--options {
  transform: rotate(180deg);
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
  width: 130px;
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

.l-root-card--content-upper {
  align-self: flex-start;
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

.l-root-card--content-lower {
  align-self: flex-start;
  transition: 1s;
}

.l-root-card--detail {
  height: 70px;
  line-height: 1.5em;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  text-indent: 2em;
}
</style>
