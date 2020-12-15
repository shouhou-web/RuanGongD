<template>
  <div class="report-cards">
    <div
      class="report-card"
      v-for="(items, index) in reportList"
      :key="index"
    >
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
import LRootCard from './l-root-card.vue';

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
          reportType: 1,
        }
      ],
    };
  },
  methods: {
    resetTrim(e, index) {
      this.reportList[index].isBreviated = !this.reportList[index].isBreviated;
    }
  },
  components: { LRootCard },
};
</script>

<style>
.report-cards {
  /* background-color: #ffffff; */
  /* border: #e3e2e6 solid 0.5px;
  border-radius: 4px; */
  display: flex;
  flex-direction: column;
  height: calc(100vh - 186px);
  margin-top: 20px;
  overflow: auto;
}

.report-cards::-webkit-scrollbar {
  width: 4px;
}

.report-cards::-webkit-scrollbar-track {
  background-color: transparent;
}

.report-cards::-webkit-scrollbar-thumb {
  background-color: #d4dadd;
  border-radius: 8px;
}

.report-card {
}

.report-profile {
  display: flex;
  flex-direction: column;
}

.report-id {
  color: #6b757b;
  font-size: 15px;
  margin-bottom: 5px;
}

.report-job {
  color: #6b757b;
  font-size: 10px;
}

.reportee-title {
  color: #6b757b;
}

.report-detail {
  color: #6b757b;
}
</style>
