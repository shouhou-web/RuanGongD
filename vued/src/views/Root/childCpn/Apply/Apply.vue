<template>
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
            <span class="apply-job">{{ item.userDegree }}</span>
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
</template>

<script>
import LApplyCard from "./childCpn/l-apply-card.vue";

export default {
  name: "Doc",
  data() {
    return {
      temp_index: -1,
      msgContent: "",
      applicationList: [
        {
          realName: "Tonyliujie",
          authorID: "",
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a veryonylyc is a very handsome bot, his name....",
          content:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          applicationID: "",
          userID: "",
          userName: "Tonylyc",
          userIdentity: 2,
          imgPath: "lyc",
          userDegree: "本科生",
          emailAddress: "2290549567@qq.com"
        },
        {
          realName: "Tonyliujie",
          authorID: "",
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a veryonylyc is a very handsome bot, his name....",
          content:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          applicationID: "",
          userID: "",
          userName: "Tonylyc",
          userIdentity: 2,
          imgPath: "lyc",
          userDegree: "本科生",
          emailAddress: "2290549567@qq.com"
        },
        {
          realName: "Tonyliujie",
          authorID: "",
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a veryonylyc is a very handsome bot, his name....",
          content:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          applicationID: "",
          userID: "",
          userName: "Tonylyc",
          userIdentity: 2,
          imgPath: "lyc",
          userDegree: "本科生",
          emailAddress: "2290549567@qq.com"
        },
        {
          realName: "Tonyliujie",
          authorID: "",
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a veryonylyc is a very handsome bot, his name....",
          content:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          applicationID: "",
          userID: "",
          userName: "Tonylyc",
          userIdentity: 2,
          imgPath: "lyc",
          userDegree: "本科生",
          emailAddress: "2290549567@qq.com"
        },
        {
          realName: "Tonyliujie",
          authorID: "",
          isTrimmed: true,
          trimmedContent:
            "Tonylyc is a very handsome bot, his name is Tonylyc, Tonylyc is a veryonylyc is a very handsome bot, his name....",
          content:
            "Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc, Tonylyc is a very handsome boy, his name is Tonylyc",
          applicationID: "",
          userID: "",
          userName: "Tonylyc",
          userIdentity: 2,
          imgPath: "lyc",
          userDegree: "本科生",
          emailAddress: "2290549567@qq.com"
        }
      ]
    };
  },
  methods: {
    resetTrim(e, index) {
      this.applicationList[index].isTrimmed = !this.applicationList[index].isTrimmed;
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
    doReject() {
      console.log(this.temp_index);
      console.log(this.msgContent);
    }
  },
  components: { LApplyCard }
};
</script>

<style>
.apply-cards--indiser {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 106px);
  overflow: auto;
  width: 900px;
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
