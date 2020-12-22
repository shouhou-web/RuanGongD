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
  },
  setSearchList(state,item) {
    state.searchList = []
    state.searchList.push(item)
  },
  // profile相关修改
  setImagePath(state, image) {
    state.user.image = image;
  },
  setUserName(state, userName) {
    state.user.username = userName;
  },
  setEmailAddress(state, emailAddress) {
    state.user.emailAddress = emailAddress;
  },
  setPhoneNumber(state, phone) {
    state.user.phoneNumber = phone;
  },
  setUserDegree(state, degree) {
    state.user.userDegree = degree;
  },
  setSearchRes(state, res) {
    console.log(res);
    state.searchRes = res;
  },
  setHomeCollect(state, collect) {
    state.isHome = true;
    state.collectList = collect;
  },
  setHomeCiation(state, ciation) {
    state.isHome = true;
    state.ciationList = ciation;
  }
};

export default mutations;
