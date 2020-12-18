import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";

Vue.use(Vuex);

const state = {
  token: false,
  user: null,
  // user: {
  //   userID: "761D3616",
  //   authorID: "0",
  //   username: "samshui",
  //   realName: "Yu Haomiao",
  //   image:
  //     "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
  //   introImage:
  //     "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",
  //   userDegree: 1,
  //   userIdentity: 0,
  //   organization: "BUAA SE",
  //   emailAddress: "18373612@buaa.edu.cn",
  //   phoneNumber: "17639****65",
  //   introduction: "该门户暂无信息"
  // },
  fullscreenLoading: false,
  appHeaderCurIndex: -1,
  pageSize: 25, //讨论区分区每页动态数
  searchList: [
    // 检索信息
    {
      logical: "NULL",
      type: "SU",
      value: ""
    }
  ],
  isAdvance: false, // 是否为高级检索状态
  start: "", // 开始时间
  end: "" // 结束时间
};

const store = new Vuex.Store({
  state,
  mutations
});

export default store;
