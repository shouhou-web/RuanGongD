const mutations = {
  // 全局加载
  showLoading(state) {
    state.fullscreenLoading = true;
  },
  hideLoading(state) {
    state.fullscreenLoading = false;
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
  },
  // profile相关修改
  setImagePath(state, imagePath) {
    state.user.imagePath = imagePath;
    // sessionStorage.clear();
    sessionStorage.setItem("user", JSON.stringify(state.user));
  },
  setUserName(state, userName) {
    state.user.userName = userName;
    // sessionStorage.clear();
    sessionStorage.setItem("user", JSON.stringify(state.user));
  },
  setPassword(state, userPassword) {
    state.user.userPassword = userPassword;
    // sessionStorage.clear();
    sessionStorage.setItem("user", JSON.stringify(state.user));
  },
  setEmailAddress(state, emailAddress) {
    state.user.emailAddress = emailAddress;
    // sessionStorage.clear();
    sessionStorage.setItem("user", JSON.stringify(state.user));
  },
  // 侧边栏active
  homemidnav(state, isActive) {
    if (isActive !== state.homeMidNav) {
      state.homeMidNav = isActive;
    }
  },
  homeleftnav(state, isActive) {
    if (isActive !== state.homeLeftNav) {
      state.homeLeftNav = isActive;
    }
  },
  // 设置全局docID
  setDocID(state, docID) {
    // console.log("setDocID", docID);
    state.nowDocID = docID;
  },
  setDocCol(state,docCol) {
    state.nowDocCol = docCol;
    console.log('存储',state.nowDocCol)
    // sessionStorage.setItem("users", JSON.stringify(state.nowDocCol));
  },
  setTeamID(state, teamID) {
    state.nowTeamID = teamID;
  },
  setHasTeam(state, hasTeam) {
    state.hasTeam = hasTeam;
  },
  // 个人成就
  setAchieve(state, achieve) {
    // console.log(achieve)
    state.teamNum = achieve.teamNum;
    state.collaboratorNum = achieve.collaboratorNum;
    state.docNum = achieve.docNum;
    // sessionStorage.setItem("achieve", JSON.stringify(achieve));
  },
  // 消息数目
  setAllMsgNum(state, allMsgNum) {
    state.allMsgNum = allMsgNum;
  },
  setEditState(state) {
    state.editState = true;
  },
  loseEditState(state) {
    state.editState = false;
  }
};

export default mutations;
