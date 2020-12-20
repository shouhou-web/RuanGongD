const mutations = {
  // 全局加载
  showLoading(state) {
    state.fullscreenLoading = true;
  },
  hideLoading(state) {
    state.fullscreenLoading = false;
  },
  // 全局导航栏跳转
  changeAppHeader(state, cur) {
    state.appHeaderCurIndex = cur;
  },
  // 登录
  login(state, info) {
    console.log(info);
    state.user = info;
  },
  // 登出
  logout(state) {
    state.user = null;
  },
  changeAdvance(state) {
    state.isAdvance = !state.isAdvance;
  },
  // init search list
  initSearchList(state) {
    state.searchList.push({
      logical: "AND",
      type: "KY",
      value: ""
    });
  },
  // add search list
  addSearchList(state) {
    state.searchList.push({
      logical: "AND",
      type: "SU",
      value: ""
    });
  },
  // delete search list
  deleteSearchList(state, index) {
    state.searchList.splice(index, 1);
  },
  // change type
  changeSearchList(state, change) {
    if (change.type == "type")
      state.searchList[change.index].type = change.value;
    else if (change.type == "logical")
      state.searchList[change.index].logical = change.value;
  },
  inputSearchList(state, change) {
    state.searchList[change.index].value = change.value;
  }
};

export default mutations;
