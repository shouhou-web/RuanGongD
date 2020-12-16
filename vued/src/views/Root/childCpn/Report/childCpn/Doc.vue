<template>
  <div class="report-cards--indiser">
    <div class="report-card" v-for="(items, index) in reportList" :key="index">
      <l-root-card
        class="delay"
        :style="{ 'animation-delay': index * 200 + 'ms' }"
        :hasRead="items.hasRead"
        :imgPath="items.reporterImgPath"
        :type="items.reportType"
        :canShowMore="items.reportContentTrim != null"
        @toShowMore="resetTrim($event, index)"
      >
        <template v-slot:reporterProfile>
          <div class="report-profile">
            <span class="report-id">{{ items.reporterID }}</span>
            <span class="report-job">{{ items.reporterJob }}</span>
          </div>
        </template>
        <template v-slot:reportee>
          <span class="reportee-title" v-if="items.reportType == 1"
            >&quot;{{ items.articleTitle }}&quot;</span
          >
        </template>
        <template v-slot:detail>
          <span class="report-detail" v-if="items.isBreviated">
            {{ items.reportContentTrim }}
          </span>
          <span class="report-detail" v-else>
            {{ items.reportContent }}
          </span>
        </template>
      </l-root-card>
    </div>
  </div>
</template>

<script>
import LRootCard from "./l-root-card.vue";

export default {
  name: "Doc",
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
          reportType: 1
        },
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
          reportType: 1
        },
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
          reportType: 1
        },
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
          reportType: 1
        },
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
          reportType: 1
        }
      ]
    };
  },
  methods: {
    resetTrim(e, index) {
      this.reportList[index].isBreviated = !this.reportList[index].isBreviated;
    }
  },
  components: { LRootCard }
};
</script>

<style>
.report-cards--indiser {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 186px);
  overflow: auto;
  width: 904px;
}

.report-cards--indiser::-webkit-scrollbar {
  width: 4px;
}

.report-cards--indiser::-webkit-scrollbar-track {
  background-color: transparent;
}

.report-cards--indiser::-webkit-scrollbar-thumb {
  background-color: #d4dadd;
  border-radius: 2px;
}

.report-card {
  margin-bottom: 20px;
}

.report-card:last-child {
  margin-bottom: 0.5px;
}

.report-profile {
  display: flex;
  flex-direction: column;
}

.report-id {
  color: #6b757b;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 5px;
}

.report-id:hover {
  color: var(--color-tint);
  transition: 0.3s;
}

.report-job {
  color: #6b757b;
  font-size: 10px;
}

.reportee-title {
  color: #6b757b;
  cursor: pointer;
}

.reportee-title:hover {
  text-decoration-line: underline;
}

.report-detail {
  color: #6b757b;
  transition: 0.5s;
}
</style>
