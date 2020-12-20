<template>
  <div class="l-root-card">
    <div class="l-root-card--content">
      <div class="l-root-card--content-upper">
        <div class="l-root-card--content-info">
          <img
            class="l-root-card--reporter-pic"
            :src="require('@/assets/image/root/' + imgPath1 + '.jpg')"
          />
          <slot name="reporterProfile"></slot>
          <div v-if="type == 1" class="l-root-card--content-connect">
            举报了文献
          </div>
          <div v-else-if="type == 2" class="l-root-card--content-connect">
            举报了门户
          </div>
          <div v-else-if="type == 3" class="l-root-card--content-connect">
            举报了评论
          </div>
          <div v-else-if="type == 4" class="l-root-card--content-connect">
            举报了动态
          </div>
          <a class="l-root-card--notice" title="待处理" v-if="!hasRead">!</a>
          <img
            class="l-root-card--reportee-pic"
            :src="require('@/assets/image/root/' + imgPath2 + '.jpg')"
            v-if="type == 2"
          />
          <slot name="reportee"></slot>
        </div>
        <ul class="l-root-card--options">
          <li
            class="l-root-card--accept"
            @mouseover="accept"
            @mouseout="accept"
            @click="toAccept"
          >
            <img
              src="@/assets/icons/root/accept.svg"
              class="l-root-card--options-accept"
              v-if="!onAccept"
            />
            <img
              src="@/assets/icons/root/accept-select.svg"
              class="l-root-card--options-accept"
              v-else
            />
          </li>
          <li
            class="l-root-card--reject"
            @mouseover="reject"
            @mouseout="reject"
            @click="toReject"
          >
            <img
              src="@/assets/icons/root/reject.svg"
              class="l-root-card--options-reject"
              v-if="!onReject"
            />
            <img
              src="@/assets/icons/root/reject-select.svg"
              class="l-root-card--options-reject"
              v-else
            />
          </li>
          <li
            class="l-root-card--delete"
            @mouseover="del"
            @mouseout="del"
            @click="toDelete"
          >
            <img
              src="@/assets/icons/root/delete.svg"
              class="l-root-card--options-delete"
              v-if="!onDelete"
            />
            <img
              src="@/assets/icons/root/delete-select.svg"
              class="l-root-card--options-delete"
              v-else
            />
          </li>
        </ul>
      </div>
      <div class="l-root-card--divider">
        <div class="l-root-card--divider-self"></div>
        <img
          class="l-root-card--showmore"
          :style="{ transform: 'rotate(' + rotationAngle + 'deg)' }"
          :class="canShowMore ? '' : 'l-root-card--invisible'"
          src="@/assets/icons/root/showmore.svg"
          @click="showMore"
        />
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
    imgPath1: "",
    imgPath2: "",
    canShowMore: {
      type: Boolean,
      default: true
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rotationAngle: 0,
      showing: false,
      onAccept: false,
      onReject: false,
      onDelete: false
    };
  },
  methods: {
    showMore() {
      if (!this.canShowMore) return;
      this.rotationAngle += 180;
      if ((this.rotationAngle / 180) % 2)
        this.$refs.detail.style.height = "auto";
      else this.$refs.detail.style.height = "70px";
      this.$emit("toShowMore");
    },
    accept() {
      this.onAccept = !this.onAccept;
    },
    del() {
      this.onDelete = !this.onDelete;
    },
    reject() {
      this.onReject = !this.onReject;
    },
    toAccept() {
      this.$emit("approveReport");
    },
    toReject() {
      this.$emit("rejectReport");
    },
    toDelete() {
      this.$emit("deleteReport");
    }
  }
};
</script>

<style scoped>
.l-root-card {
  position: relative;
}

.l-root-card--content {
  align-items: center;
  background-color: #ffffff;
  border: 0.5px solid #e3e2e6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.l-root-card--content-upper {
  align-self: flex-start;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 40px;
  width: 100%;
}

.l-root-card--content-info {
  align-items: center;
  display: flex;
  flex-direction: row;
}

.l-root-card--reporter-pic {
  border-radius: 25px;
  border: 1px solid #6b757b;
  cursor: pointer;
  height: 43px;
  margin-bottom: 20px;
  margin-right: 5px;
  margin-top: 20px;
  transition: 0.2s;
  width: 43px;
}

.l-root-card--content-connect {
  color: #6b757b;
  font-weight: 800;
  font-size: 15px;
  margin-left: 20px;
  margin-right: 5px;
}

.l-root-card--notice {
  background-color: #ffb11b;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  display: block;
  height: 15px;
  margin-right: 25px;
  text-align: center;
  width: 15px;
}

.l-root-card--options {
  border-radius: 50%;
  height: 70px;
  position: relative;
  width: 70px;
}

.l-root-card--options-accept {
  height: 20px;
  left: 9.5px;
  position: absolute;
  top: 25px;
  width: 20px;
}

.l-root-card--options-reject {
  height: 20px;
  left: 4px;
  position: absolute;
  top: 8px;
  width: 20px;
}

.l-root-card--options-delete {
  height: 20px;
  left: 4.5px;
  position: absolute;
  top: 4.5px;
  width: 20px;
}

.l-root-card--accept {
  clip-path: circle(35px at 100% 50%);
  cursor: pointer;
  height: 70px;
  left: 0%;
  position: absolute;
  top: 0%;
  width: 35px;
}

.l-root-card--reject {
  clip-path: circle(35px at 0% 100%);
  cursor: pointer;
  height: 35px;
  left: 50%;
  position: absolute;
  top: 0%;
  width: 35px;
}

.l-root-card--delete {
  clip-path: circle(35px at 0% 0%);
  cursor: pointer;
  height: 35px;
  left: 50%;
  position: absolute;
  top: 50%;
  width: 35px;
}

.l-root-card--divider {
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 5px;
  position: relative;
  width: 96%;
}

.l-root-card--divider-self {
  background-color: #e3e2e6;
  height: 2px;
  width: 100%;
}

.l-root-card--showmore {
  background-color: #ffffff;
  border-radius: 16px;
  cursor: pointer;
  height: 32px;
  left: 416px;
  position: absolute;
  padding: 5px;
  transition: 0.3s;
  width: 32px;
}

.l-root-card--invisible {
  cursor: auto;
  opacity: 0;
}

.l-root-card--content-lower {
  align-self: flex-start;
  transition: 1s;
}

.l-root-card--detail {
  height: 70px;
  line-height: 27px;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 20px;
  padding-bottom: 20px;
  text-indent: 1.5em;
}

.l-root-card--reporter-pic:hover {
  box-shadow: 0px 0px 1px 2px rgba(66, 150, 230, 0.473);
  transition: 0.2s;
}

.l-root-card--reportee-pic {
  border-radius: 25px;
  border: 1px solid #6b757b;
  cursor: pointer;
  height: 43px;
  margin-bottom: 20px;
  margin-right: 5px;
  margin-top: 20px;
  transition: 0.2s;
  width: 43px;
}

.l-root-card--reportee-pic:hover {
  box-shadow: 0px 0px 1px 2px rgba(66, 150, 230, 0.473);
  transition: 0.2s;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}
</style>
