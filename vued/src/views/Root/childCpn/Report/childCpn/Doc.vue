<template>
  <div>
    <div v-if="!showNone" class="report-cards--indiser">
      <div class="report-card" v-for="(item, index) in reportList" :key="index">
        <l-root-card
          class="delay"
          :style="{ 'animation-delay': index * 200 + 'ms' }"
          :hasRead="item.hasRead"
          :imgPath1="item.reporterInfo.image"
          :type="1"
          :canShowMore="item.trimmedContent != null"
          @toShowMore="resetTrim($event, index)"
          @approveReport="toApprove($event, index)"
          @rejectReport="toReject($event, index)"
          @deleteReport="toDelete($event, index)"
        >
          <template v-slot:reporterProfile>
            <div class="report-profile">
              <span class="report-name">{{ item.reporterInfo.username }}</span>
              <span class="report-job">{{
                options[item.reporterInfo.userDegree]
              }}</span>
            </div>
          </template>
          <template v-slot:reportee>
            <span class="reportee-title"
              >&quot;{{ item.articleTitle }}&quot;</span
            >
          </template>
          <template v-slot:detail>
            <span class="report-detail" v-if="item.trimmed">
              {{ item.trimmedContent }}
            </span>
            <span class="report-detail" v-else>
              {{ item.reportContent }}
            </span>
          </template>
        </l-root-card>
      </div>
    </div>
    <div class="report-cards--none" v-if="showNone">
      <span class="report-cards--wu">無</span>
    </div>
    <m-hover ref="hover" @submit="doReject">
      <div class="reject-hover">
        <textarea
          class="reject-input"
          placeholder="请在此输入驳回原因"
          v-model="msgContent"
        ></textarea>
      </div>
    </m-hover>
  </div>
</template>

<script>
import LRootCard from "./l-root-card.vue";
import { approveReport, rejectReport } from "network/root";
import { getArticleReports } from "network/root";

export default {
  name: "Doc",
  data() {
    return {
      temp_index: -1,
      msgContent: "",
      show: false,
      reportList: [],
      options: ["高中生", "本科生", "研究生", "博士生", "博士后"],
      showNone: false
    };
  },
  methods: {
    resetTrim(e, index) {
      this.reportList[index].trimmed = !this.reportList[index].trimmed;
    },
    toApprove(e, index) {
      approveReport(this.reportList[index].reportID).then(res => {
        if (!res) {
          this.$notify.error({
            title: "通过失败",
            message: "再试一次"
          });
          return;
        } else {
          this.$notify.success("通过成功");
          this.reportList.splice(index, 1);
          if (this.reportList.length == 0) this.showNone = true;
        }
      });
    },
    toReject(e, index) {
      this.temp_index = index;
      this.$refs.hover.showHover({
        title: "请填写驳回原因",
        submitBtn: "确定",
        cancelBtn: "取消"
      });
    },
    doReject() {
      if (this.msgContent == null || this.msgContent.length == 0) {
        this.$notify.error({
          title: "驳回失败",
          message: "请输入驳回原因！"
        });
      } else {
        rejectReport(
          this.reportList[this.temp_index].reportID,
          this.msgContent
        ).then(res => {
          if (res == 0) {
            this.$notify.error({
              title: "驳回失败",
              message: "再试一次"
            });
          } else {
            this.$refs.hover.hideHover();
            this.$notify.success("驳回成功");
            this.reportList.splice(this.temp_index, 1);
            this.msgContent = "";
            if (this.reportList.length == 0) this.showNone = true;
          }
        });
      }
    }
  },
  created() {
    if (this.$store.state.user == null) {
      return;
    }
    getArticleReports()
      .then(res => {
        if (res == null || res.length == 0) {
          this.$notify.info({
            title: "空列表",
            message: "可以摸了"
          });
          this.showNone = true;
          return;
        } else {
          this.reportList = res;
        }
      })
      .catch(err => {
        this.$notify.error({
          title: "网络错误",
          message: "请稍后重试~"
        });
      });
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 70px;
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
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 530px;
  white-space: nowrap;
}

.reportee-title:hover {
  text-decoration-line: underline;
}

.report-detail {
  color: #6b757b;
  transition: 0.5s;
  word-break: break-all;
}

.delay {
  opacity: 0;
  animation: outin 1s 1;
  animation-fill-mode: forwards;
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

.report-cards--none {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 186px);
  width: 900px;
}

.report-cards--wu {
  color: #6b757b;
  font-size: 100px;
  font-family: FangSong;
  margin: auto 380px;
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
