<template>
  <!-- 点击下拉导航栏 -->
  <div @mouseleave="closeClick" class="m-click">
    <div @click="showClick" class="m-click--show">
      <span>{{ curValue }}</span>
      <span class="tri"></span>
    </div>
    <!-- 隐藏层 -->
    <div v-if="isOpen" class="m-click--hide">
      <ul>
        <li
          @click="chooseThis(index)"
          v-for="(item, index) in clickList"
          :key="index"
          :class="{ onShow: item.key == cur }"
        >
          {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MClickDropDown",
  props: {
    color: {
      type: String,
      default: "#fff"
    },
    position: {
      type: String,
      default: "middle"
    },
    type: {
      type: String,
      default: "hover"
    },
    cur: {
      type: String,
      default: "SU"
    }
  },
  data() {
    return {
      mlAll: 0,
      mlTri: 0,
      isOpen: false,
      typeList: [
        {
          key: "SU",
          value: "主题"
        },
        {
          key: "KY",
          value: "关键词"
        },
        {
          key: "TI",
          value: "篇名"
        },
        {
          key: "AU",
          value: "作者"
        },
        {
          key: "FI",
          value: "第一作者"
        },
        {
          key: "AF",
          value: "作者单位"
        },
        {
          key: "LY",
          value: "文献来源"
        },
        {
          key: "RF",
          value: "参考文献"
        }
      ],
      logicalList: [
        {
          key: "AND",
          value: "与"
        },
        {
          key: "OR",
          value: "或"
        },
        {
          key: "NOT",
          value: "非"
        }
      ],
      searchList: [
        {
          key: "ciation",
          value: "被引数"
        },
        {
          key: "time",
          value: "发表时间"
        }
      ],
      clickList: []
    };
  },
  created() {
    if (this.type == "click-type") this.clickList = this.typeList;
    else if (this.type == "click-logical") this.clickList = this.logicalList;
    else if (this.type == "click-search") this.clickList = this.searchList;
  },
  computed: {
    curValue() {
      console.log(this.cur);
      return this.clickList.filter(n => {
        return n.key == this.cur;
      })[0].value;
    }
  },
  methods: {
    showClick() {
      this.isOpen = true;
    },
    closeClick() {
      this.isOpen = false;
    },
    showHover(e) {
      // console.log(e)
      // let nav = document.getElementById('m-nav');
      // console.log(nav);
      // let hide = nav.removeChild(nav.childNodes[1]);
      // console.log(hide)
      // console.log(document.getElementsByTagName('body'))
      // document.body.appendChild(hide)

      let showList = document.getElementsByClassName("m-nav--show");
      let hideList = document.getElementsByClassName("m-nav--hide");
      let show = 0,
        hide = 0;
      for (let i = 0; i < showList.length; i++) {
        if (hideList[i].offsetWidth > 0) {
          show = showList[i].offsetWidth;
          hide = hideList[i].offsetWidth;
          // console.log("top", document.documentElement.scrollTop);
          break;
        }
      }
      // console.log(this.position);
      if (this.position == "middle") {
        this.mlAll = -(hide / 2 - show / 2) + "px";
      } else if (this.position == "right") {
        this.mlAll = -(hide / 3 - show / 2) + "px";
        this.mlTri = -(hide / 2 - show / 2) + "px";
      } else if (this.position == "left") {
        this.mlAll = -((hide * 2) / 3 - show / 2) + "px";
        this.mlTri = -show / 2 + hide / 2 + "px";
      }
      // console.log(this.mlTri, this.mlAll);
    },
    chooseThis(index) {
      this.isOpen = false;
      this.$emit("change-dropdown", this.clickList[index].key);
    }
  }
};
</script>

<style>
.m-click {
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 10px;
  width: 85px;
}

.m-click--show {
  cursor: pointer;
  position: relative;
}

.m-click--show .tri {
  margin-top: 3px;
  margin-left: 3px;
  border: 4px solid #888;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
}

.m-click--hide {
  border: 1px solid #ddd;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  line-height: 30px;
  margin-top: 20px;
  width: 80px;
  z-index: 10;
}

.m-click--hide ul {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.m-click--show,
.m-click--hide li {
  white-space: nowrap;
}

.m-click--hide li {
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0 5px;
  width: 100%;
}

.m-click--hide li:hover {
  color: #6698fd;
}

.m-click--hide .onShow {
  background-color: #6698fd;
  color: #fff !important;
  transition: 0.2s;
}

.m-click--show {
  align-items: center;
  display: flex;
  width: fit-content;
}

.m-nav--hide {
  align-items: center;
  display: none;
  flex-direction: column;
  position: absolute;
  z-index: 628;
}

.m-nav__main {
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.m-nav__triangle {
  border: 8px solid;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  width: 8px;
}

/* ---------------隐藏层动效---------------- */
.m-nav--hide:hover,
.m-nav--show:hover + .m-nav--hide {
  display: flex;
  animation: slowin 0.5s ease forwards;
}

@keyframes slowin {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
