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
    state.appHeaderCur = cur;
  },
  // 登录
  login(state, info) {
    console.log(info);
    state.token = true;
    state.user = info;
    // sessionStorage.clear();
    sessionStorage.setItem("user", JSON.stringify(state.user));
  },
  // 登出
  logout(state) {
    state.token = false;
    state.user = {};
    sessionStorage.clear();
  }
};

export default mutations;
