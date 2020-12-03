<template>
  <!-- 管理员界面 -->
  <div id="report">
    <m-header bgColor="#e83015">
      <template v-slot:left>
        <div class="m-header--slot">导航栏左部</div>
      </template>
      <template v-slot:right>
        <div class="m-header--slot">导航栏左部</div>
      </template>
    </m-header>
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
          :imgPath1="items.reporterImgPath"
          :imgPath2="items.reportType == 3 ? items.reporteeImgPath : ''"
          :type="items.reportType"
        >
          <template v-slot:reporterProfile>
            <div class="root-report--profile">
              <span class="root-report--id">{{ items.reporterID }}</span>
              <span class="root-report--job">{{ items.reporterJob }}</span>
            </div>
          </template>
          <template v-slot:reportee>
            <span class="root-reportee-title" v-if="items.reportType == 1"
              >&quot;{{ items.articleTitle }}&quot;</span
            >
            <span class="root-reportee-comment" v-if="items.reportType == 2"
              >&quot;{{ items.commentContent }}&quot;</span
            >
          </template>
          <template v-slot:reporteeProfile>
            <div class="root-report--profile">
              <span class="root-report--id">{{ items.reporteeID }}</span>
              <span class="root-report--job">{{ items.reporteeJob }}</span>
            </div>
          </template>
          <template v-slot:detail>
            <span class="root-report--detail" v-if="items.isBreviated">
              {{ items.reportContentTrim }}
            </span>
            <span class="root-report--detail" v-else>
              {{ items.reportContent }}
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
          hasRead: false,
          id: 1,
          articleID: "E387HB9CS1234",
          articleTitle: "Test this Card with Methods No.1",
          reporterImgPath: "lyc",
          isAuthorized: false,
          isBreviated: true,
          reporterJob: "本科生",
          realName: "",
          reportContentTrim:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a very....",
          reportContent:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          reporterID: "Tonylyc",
          reportType: 1,
        },
        {
          hasRead: false,
          id: 2,
          commentID: "E387HB9CS1234-245",
          commentContent: "Test this Card with Comment No.1",
          reporterImgPath: "lyc",
          reportContent:
            "Tonylyc is a very handsome boy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
          reporterJob: "本科生",
          reporterID: "Tonylyc",
          reportType: 2,
        },
        {
          hasRead: false,
          id: 3,
          reporterImgPath: "lyc",
          reportContent:
            "Tonylyc is a very handsome boy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
          reporterJob: "本科生",
          reporterID: "Tonylyc",
          reporteeID: "Shouhou",
          reporteeJob: "本科生",
          reportType: 3,
        },
        {
          hasRead: true,
          id: 3,
          reporterImgPath: "lyc",
          reportContent:
            "Tonylyc is a very handsome boy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
          reporterJob: "本科生",
          reporterID: "Tonylyc",
          reporteeID: "Shouhou",
          reporteeJob: "本科生",
          reportType: 3,
        }
      ],
    };
  },
  methods: {},
  components: { LRootCard },
};
</script>

<style scoped>
.root-report-cards {
  height: calc(100vh - 56px);
  overflow: auto;
}
.root-report-cards::-webkit-scrollbar {
  width: 5px;
}
.root-report-cards::-webkit-scrollbar-track {
  background-color: transparent;
}
.root-report-cards::-webkit-scrollbar-thumb {
  background-color: #e83015;
  border-radius: 10px;
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
  margin-bottom: 20px;
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
.root-reportee-comment {
  cursor: pointer;
  color: #62592c;
  font-size: 20px;
  font-style: italic;
  transition: 0.3s;
}
.root-reportee-comment:hover {
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
