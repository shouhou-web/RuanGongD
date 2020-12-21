<template>
  <div class="report-cards--indiser">
    <div class="report-card" v-for="(item, index) in reportList" :key="index">
      <l-root-card
        class="delay"
        :style="{ 'animation-delay': index * 200 + 'ms' }"
        :hasRead="item.hasRead"
        :imgPath1="item.reporterInfo.image"
        :type="item.reportType"
        :canShowMore="item.trimmedContent != null"
        @toShowMore="resetTrim($event, index)"
        @approveReport="toApprove($event, index)"
        @rejectReport="toReject($event, index)"
        @deleteReport="toDelete($event, index)"
      >
        <template v-slot:reporterProfile>
          <div class="report-profile">
            <span class="report-name">{{ item.reporterInfo.userName }}</span>
            <span class="report-job">{{ item.reporterInfo.userDegree }}</span>
          </div>
        </template>
        <template v-slot:reportee>
          <span class="reportee-title"
            >&quot;{{ item.articleTitle }}&quot;</span
          >
        </template>
        <template v-slot:detail>
          <span class="report-detail" v-if="item.isTrimmed">
            {{ item.trimmedContent }}
          </span>
          <span class="report-detail" v-else>
            {{ item.reportContent }}
          </span>
        </template>
      </l-root-card>
    </div>
    <m-hover ref="hover" @submit="doReject">
      <div class="reject-hover">
        <textarea class="reject-input" placeholder="请在此输入驳回原因" autofocus v-model="msgContent"></textarea>
      </div>
    </m-hover>
  </div>
</template>

<script>
import LRootCard from "./l-root-card.vue";

export default {
  name: "Doc",
  data() {
    return {
      temp_index: -1,
      msgContent: "",
      show: false,
      reportList: [
        {
          hasRead: false,
          articleID: "E387HB9CS1234",
          articleTitle:
            "This is a card used to test article reports!!!This is a card used to test article reports!!!This is a card used to test article reports!!!",
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a veryonylyc is a very handsome bot, his name....",
          reportContent:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          reportType: 1,
          reportID: "",
          reporterInfo: {
            userID: "",
            userName: "Tonylyc",
            userIdentity: 2,
            image: "lyc",
            realName: "",
            userDegree: "本科生"
          }
        },
        {
          hasRead: false,
          articleID: "E387HB9CS1234",
          articleTitle: "This is a card used to test article reports!!!",
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a very....",
          reportContent:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          reportType: 1,
          reportID: "",
          reporterInfo: {
            userID: "",
            userName: "Tonylyc",
            userIdentity: 2,
            image: "lyc",
            realName: "",
            userDegree: "本科生"
          }
        },
        {
          hasRead: false,
          articleID: "E387HB9CS1234",
          articleTitle: "This is a card used to test article reports!!!",
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a very....",
          reportContent:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          reportType: 1,
          reportID: "",
          reporterInfo: {
            userID: "",
            userName: "Tonylyc",
            userIdentity: 2,
            image: "lyc",
            realName: "",
            userDegree: "本科生"
          }
        },
        {
          hasRead: false,
          articleID: "E387HB9CS1234",
          articleTitle: "This is a card used to test article reports!!!",
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a very....",
          reportContent:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          reportType: 1,
          reportID: "",
          reporterInfo: {
            userID: "",
            userName: "Tonylyc",
            userIdentity: 2,
            image: "lyc",
            realName: "",
            userDegree: "本科生"
          }
        },
        {
          hasRead: false,
          articleID: "E387HB9CS1234",
          articleTitle: "This is a card used to test article reports!!!",
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a very....",
          reportContent:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          reportType: 1,
          reportID: "",
          reporterInfo: {
            userID: "",
            userName: "Tonylyc",
            userIdentity: 2,
            image: "lyc",
            realName: "",
            userDegree: "本科生"
          }
        }
      ]
    };
  },
  methods: {
    resetTrim(e, index) {
      this.reportList[index].isTrimmed = !this.reportList[index].isTrimmed;
    },
    toApprove(e, index) {
      console.log(index);
    },
    toReject(e, index) {
      this.temp_index = index;
      this.$refs.hover.showHover({
        title: "请填写驳回原因",
        submitBtn: "确定",
        cancelBtn: "取消"
      });
    },
    toDelete(e, index) {
      console.log(index);
    },
    doReject() {
      console.log(this.temp_index);
      console.log(this.msgContent);
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
  width: 99%;
}

.report-card:last-child {
  margin-bottom: 0.5px;
}

.report-profile {
  display: flex;
  flex-direction: column;
}

.report-name {
  color: #6b757b;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 5px;
}

.report-name:hover {
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
  overflow: hidden;
  text-overflow: ellipsis;
  width: 540px;
  white-space: nowrap;
}

.reportee-title:hover {
  text-decoration-line: underline;
}

.report-detail {
  color: #6b757b;
  transition: 0.5s;
}

.delay {
  opacity: 0;
  animation: outin 1s 1;
  animation-fill-mode: forwards;
}

.reject-hover {
  width: 500px;
}

.reject-input {
  border: #cdccd1 solid 0.5px;
  border-radius: 4px;
  height: 300px;
  margin: 30px auto;
  outline: none;
  padding: 10px 10px;
  resize: none;
  width: 100%;
}

textarea:-ms-input-placeholder {
  cursor: pointer;
  color: #6b757b;
}

.reject-input::-webkit-scrollbar {
  width: 4px;
}

.reject-input::-webkit-scrollbar-track {
  background-color: transparent;
}

.reject-input::-webkit-scrollbar-thumb {
  background-color: #d4dadd;
  border-radius: 2px;
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
