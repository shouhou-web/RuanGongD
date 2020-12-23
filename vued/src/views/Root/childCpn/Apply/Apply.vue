<template>
  <div class="apply-cards--all">
    <div class="apply-cards--header">
      <div class="report-nav">
        <ul class="nav-all">
          <li>
            <div class="nav-item--active">
              门户申请
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="apply-cards--indiser">
      <div
        class="apply-card"
        v-for="(item, index) in applicationList"
        :key="index"
      >
        <l-apply-card
          class="delay"
          :style="{ 'animation-delay': index * 200 + 'ms' }"
          :imgPath="item.imgPath"
          :canShowMore="item.trimmedContent != null"
          :emailAddress="item.emailAddress"
          @toShowMore="resetTrim($event, index)"
          @approveReport="toApprove($event, index)"
          @rejectReport="toReject($event, index)"
        >
          <template v-slot:apllyerProfile>
            <div class="apply-profile">
              <span class="apply-name">{{ item.userName }}</span>
              <span class="apply-job">{{ options[item.userDegree] }}</span>
            </div>
          </template>
          <template v-slot:applyee>
            <span class="applyee-name">{{ item.realName }}</span>
          </template>
          <template v-slot:detail>
            <span class="apply-detail" v-if="item.isTrimmed">
              {{ item.trimmedContent }}
            </span>
            <span class="apply-detail" v-else>
              {{ item.content }}
            </span>
          </template>
        </l-apply-card>
      </div>
      <m-hover ref="hover" @submit="doReject">
        <div class="reject-hover">
          <textarea
            class="reject-input"
            placeholder="请在此输入驳回原因"
            autofocus
            v-model="msgContent"
          ></textarea>
        </div>
      </m-hover>
    </div>
  </div>
</template>

<script>
import LApplyCard from "./childCpn/l-apply-card.vue";
import { getAllGateApplication } from "network/root";
import { approveApplication, rejectApplication} from "network/root";

export default {
  name: "Doc",
  data() {
    return {
      temp_index: -1,
      msgContent: "",
      applicationList: [],
      options: [
        "高中生",
        "本科生",
        "研究生",
        "博士生",
        "博士后"
      ]
    };
  },
  methods: {
    resetTrim(e, index) {
      this.applicationList[index].isTrimmed = !this.applicationList[index]
        .isTrimmed;
    },
    toApprove(e, index) {
      approveApplication(this.applicationList[index].applicationID).then(res => {
        if(!res) {
          this.$notify.error({
            title: "通过失败",
            message: "再试一次"
          });
          return;
        } else {
          this.$notify.success("通过成功");
          this.applicationList.splice(index, 1);
        }
      })
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
      if (!this.msgContent || this.msgContent.length == 0) {
        this.$notify.error({
          title: "驳回失败",
          message: "请输入驳回原因！"
        });
      } else {
        rejectApplication(
          this.applicationList[this.temp_index].applicationID,
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
            this.applicationList.splice(this.temp_index, 1);
            this.msgContent = "";
          }
        });
      }
    }
  },
  created() {
    getAllGateApplication()
    .then(res => {
      if(!res || res.length == 0) {
          this.$notify.info({
            title: "空列表",
            message: "可以摸了"
          });
          return;
      } else {
        this.applicationList = res;
      }
    })
    .catch(err => {
      this.$notify.error({
        title: "网络错误",
        message: "请稍后重试~"
      });
    });
  },
  components: { LApplyCard }
};
</script>

<style>
.apply-cards--all {
  width: 900px;
}

.apply-cards--header {
  background-color: #ffffff;
  border: #e3e2e6 solid 0.5px;
  border-radius: 4px;
  height: 60px;
  margin-bottom: 20px;
  width: 904px;
}

.report-nav {
  display: flex;
  flex-direction: column;
}

.nav-all {
  align-items: center;
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-left: 20px;
}

.nav-item--active {
  color: #6b757b;
  display: flex;
  flex-direction: column;
  font-size: 17.5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;
}

.apply-cards--indiser {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 186px);
  overflow: auto;
  width: 904px;
}

.apply-cards--indiser::-webkit-scrollbar {
  width: 4px;
}

.apply-cards--indiser::-webkit-scrollbar-track {
  background-color: transparent;
}

.apply-cards--indiser::-webkit-scrollbar-thumb {
  background-color: #d4dadd;
  border-radius: 2px;
}

.apply-card {
  margin-bottom: 20px;
  width: 99%;
}

.apply-card:last-child {
  margin-bottom: 0.5px;
}

.apply-profile {
  display: flex;
  flex-direction: column;
}

.apply-name {
  color: #6b757b;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 70px;
}

.apply-name:hover {
  color: var(--color-tint);
  transition: 0.3s;
}

.apply-job {
  color: #6b757b;
  font-size: 10px;
}

.applyee-name {
  color: #6b757b;
  cursor: pointer;
  font-style: italic;
  font-size: 18px;
  font-weight: 100;
  margin-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.5s;
  width: 300px;
  white-space: nowrap;
}

.applyee-name:hover {
  color: var(--color-tint);
  transition: 0.5s;
}

.apply-detail {
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
