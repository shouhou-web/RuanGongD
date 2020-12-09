<template>
  <!-- 管理员界面 -->
  <div id="report">
    <m-app-header></m-app-header>
    <!-- <div class="root-report-nav"></div> -->
    <div class="root-report-cards">
      <div
        class="root-report-card"
        v-for="(items, index) in reportList"
        :key="index"
      >
        <l-root-card
          class="delay"
          :style="{ 'animation-delay': index * 200 + 'ms' }"
          :hasRead="items.hasRead"
          :imgPath="items.reporterInfo.imgPath"
          @toShowMore="show($event, index)"
        >
          <template v-slot:reporterProfile>
            <div class="root-report--profile">
              <span class="root-report--id">{{ items.reporterInfo.userID }}</span>
              <span class="root-report--job">{{ items.reporterInfo.userJob }}</span>
            </div>
          </template>
          <template v-slot:reportee>
            <span class="root-reportee-title"
              >&quot;{{ items.articleTitle }}&quot;</span
            >
          </template>
          <template v-slot:detail>
            <span class="root-report--detail" v-if="!items.isTrimmed">
              {{ items.reportContent }}
            </span>
            <span class="root-report--detail" v-else>
              {{ items.trimmedContent }}
            </span>
          </template>
        </l-root-card>
      </div>
    </div>
  </div>
</template>

<script>
import LRootCard from "./childCpn/l-root-card.vue";

export default {
  name: "Root",
  data() {
    return {
      reportList: [
        {
          articleID: "E387HB9CS1234",
          articleTitle: "Test this Card with Methods No.1",
          hasRead: false,
          reporterInfo: {
            userID: "Tonylyc",
            isAuthorized: false,
            imgPath: "lyc",
            realName: "",
            userJob: "本科生"
          },
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          reportContent:
            "Tonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boy",
        },
        {
          articleID: "E387HB9CS1234",
          articleTitle: "Test this Card with Methods No.1",
          hasRead: false,
          reporterInfo: {
            userID: "Tonylyc",
            isAuthorized: false,
            imgPath: "lyc",
            realName: "",
            userJob: "本科生"
          },
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          reportContent:
            "Tonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boy",
        },
        {
          articleID: "E387HB9CS1234",
          articleTitle: "Test this Card with Methods No.1",
          hasRead: false,
          reporterInfo: {
            userID: "Tonylyc",
            isAuthorized: false,
            imgPath: "lyc",
            realName: "",
            userJob: "本科生"
          },
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          reportContent:
            "Tonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boy",
        },
        {
          articleID: "E387HB9CS1234",
          articleTitle: "Test this Card with Methods No.1",
          hasRead: false,
          reporterInfo: {
            userID: "Tonylyc",
            isAuthorized: false,
            imgPath: "lyc",
            realName: "",
            userJob: "本科生"
          },
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          reportContent:
            "Tonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boyTonylyc is a very handsome boy",
        }
      ]
    };
  },
  methods: {
    show(e, index) {
      this.reportList[index].isTrimmed = !this.reportList[index].isTrimmed;
    }
  },
  components: { LRootCard }
};
</script>

<style scoped>
.root-report-cards {
  height: calc(100vh - 57px);
  overflow: auto;
}

.root-report-cards::-webkit-scrollbar {
  width: 6px;
}

.root-report-cards::-webkit-scrollbar-track {
  background-color: transparent;
}

.root-report-cards::-webkit-scrollbar-thumb {
  background-color: #e83015;
  border-radius: 12px;
}

.root-report-cards::-webkit-scrollbar:hover {
  width: 10px;
}

.root-report-cards::-webkit-scrollbar-thumb:hover {
  border-radius: 20px;
  transition: 0.5s;
}

.m-header--slot {
  color: #ffffff;
}

.root-report-nav {
  border: 2px solid #e3b4b8;
  height: 30%;
  left: 40px;
  margin-top: 20px;
  margin-left: 70px;
  width: 30%;
}

.root-report-cards {
  /* border: 2px solid #e3b4b8; */
  left: 30%;
  padding-top: 20px;
  padding-right: 10%;
  padding-bottom: 20px;
  position: relative;
  width: 70%;
}

.root-report-card {
  padding-bottom: 30px;
  padding-top: 10px;
  padding-right: 20px;
  padding-left: 20px;
  width: 80%;
}

.root-report--profile {
  align-content: center;
  display: flex;
  flex-direction: column;
  margin-left: 2px;
}

.root-report--id {
  color: #62592c;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 4px;
  transition: 0.3s;
}

.root-report--id:hover {
  color: #f19483;
  transition: 0.3s;
}

.root-report--job {
  color: #62592c;
  font-size: 8px;
}

.root-reportee-title {
  cursor: pointer;
  color: #62592c;
  font-size: 20px;
  font-style: italic;
  transition: 0.3s;
}

.root-reportee-title:hover {
  color: #f19483;
  text-decoration: underline;
  transition: 0.3s;
}

.root-report--detail {
  color: #62592c;
  line-height: 1.5em;
  text-indent: 2em;
}

.delay {
  opacity: 0;
  animation: outin 1s 1;
  animation-fill-mode: forwards;
}

@keyframes outin {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
