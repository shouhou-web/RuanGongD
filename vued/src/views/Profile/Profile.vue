<template>
  <!-- 个人信息界面 -->
  <div id="profile" class="profile">
    <m-header></m-header>
    <div class="profile-header">
      <div class="user-profile">
        <div class="profile-info">
          <div class="headshot">
            <img :src="userImgSrc" class="headshot-img">
          </div>
          <div class="username">
            <div class="user-nickname">{{ userNickName }}</div>
            <div class="user-degree">
              {{ retUserDegree() }}
              <img src="../../assets/icons/profile/edit.svg" class="profile-icon">
            </div>
          </div>
          <div class="publish">
            <div class="publish-button">发表文献</div>
          </div>
        </div>
        <div class="profile-op">
          <div class="op-favor">Favor</div>
          <div class="bar"></div>
        </div>
      </div>
    </div>
    <div class="profile-content">
      <div class="content-left">
        <div class="one-follow-literature">
          <div class="title">{{ onefollowingLiterature.title }}</div>
          <div class="tags">
            <div class="tag" v-for="(a_tag, i) in onefollowingLiterature.tags">
              <div :class="{'first-tag': i==0, 'leftpart-tags': i != 0}">{{a_tag}}</div>
            </div>
          </div>
          <div class="authors">
            <div v-for="(name, i) in onefollowingLiterature.authors" class="author-list">
              <img :src="userImgSrc" class="authorImg">
              <div class="authorname">{{name}}</div>
            </div>
          </div>
          <div class="read-time">
            <div class="read-time-content">
              {{onefollowingLiterature.read_time}} Reads
            </div>
          </div>
          <div class="literature-ops">
            <div class="one-op"></div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="user-intro">
          <div class="user-intro-header">
            <div class="user-intro-header-content">
              Current affiliation
            </div>
            <div class="user-intro-change">
              Edit
              <img src="../../assets/icons/profile/edit.svg" class="profile-icon">
            </div>
          </div>
          <div class="user-intro-content">
            <div class="intro-content">
              <div class="intro-content-details">
                <div class="intro-font-1">{{ introName }}</div>
                <div class="intro-font-2">
                  {{introLocation}}
                </div>
                <div class="intro-font-2">
                  {{introDepartment}}
                </div>
              </div>
            </div>
            <div class="intro-img">
              <img :src="introImg" class="intro-img-details">
            </div>
          </div>
        </div>
        <div class="user-follow">
          <div class="follow-header">
            <div class="follow-header-content">Follow</div>
          </div>
          <div class="following">
            <div class="follow-part-head">following (1)</div>
            <div class="following-content">
              <div id="one-following" class="one-following">
                <img :src="onefollowingUser.imgSrc" class="intro-img img-plus">
                <div class="following-info">
                  <div class="name-style">{{ onefollowingUser.name }}</div>
                  <div class="intro-style">{{ onefollowingUser.intro }}</div>
                </div>
                <div class="following-op">
                  unfollow
                </div>
              </div>
            </div>
          </div>
          <div class="befollowed">
            <div class="follow-part-head">be followed (2)</div>
            <div class="befollowed-content">
              <div id="one-following" class="one-following">
                <img :src="onefollowingUser.imgSrc" class="intro-img img-plus">
                <div class="following-info">
                  <div class="name-style">{{ onefollowingUser.name }}</div>
                  <div class="intro-style">{{ onefollowingUser.intro }}</div>
                </div>
                <div class="befollowed-op-followed">
                  followed
                </div>
              </div>
              <div id="one-following" class="one-following">
                <img :src="onefollowingUser.imgSrc" class="intro-img img-plus">
                <div class="following-info">
                  <div class="name-style">{{ onefollowingUser.name }}</div>
                  <div class="intro-style">{{ onefollowingUser.intro }}</div>
                </div>
                <div class="befollowed-op-to-follow">
                  follow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      // 用户信息
      userName: 'Yu Haomiao',
      userNickName: 'Yu Haomiao',
      userDegree: 1,
      userIntroState: true,
      userIntro: "北航软件学院",
      userImgSrc: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194807023,955890570&fm=26&gp=0.jpg",

      // user收藏文献集合
      favorLiteratures: [],

      // user关注用户集合
      followUsers: [],

      introImg: "https://i1.rgstatic.net/ii/institution.image/AS%3A267456919080961%401440778106588_l",
      introName: "Beihang University (BUAA)",
      introLocation: "Beijing, China",
      introDepartment: "Software Engineering Institute (SEI)",

      onefollowingUser: {
        imgSrc: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3824999008,143707972&fm=26&gp=0.jpg",
        name: "Ma Hanyuan",
        intro: "Beihang University (BUAA)"
      },
      onefollowingLiterature: {
        title: "Improving Auto-Augment via Augmentation-Wise Weight Sharing",
        authors: ["Ma Hanyuan"],
        tags: ["tag 1", "tag 2"],
        read_time: 10,
      }
    };
  },
  methods: {
    retUserDegree() {
      if (this.userDegree == 0) return "高中";
      else if (this.userDegree == 1) return "Bachelor of Engineering";
      else if (this.userDegree == 2) return "研究生";
      else if (this.userDegree == 3) return "博士生";
      else if (this.userDegree == 4) return "博士后";
      else return "";
    },
  },
  components: {},
};
</script>

<style scoped>
.profile {
  font-family: Consolas;
  /*letter-spacing: 2px;*/
}

.profile-header {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 100%;
  height: 193px;
  background-color: white;
}

.user-profile {
  width: var(--width-main);
  height: 100%;
  /*border: 1px solid black;*/
  margin: 0 auto;
}

.profile-info {
  width: 100%;
  height: 145px;
  /*border: 1px solid yellow;*/

  display: flex;
  flex-direction: row;
}

.headshot {
  width: 130px;
  height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  align-items: center;
}

.headshot-img {
  margin: 0 auto;
  border-radius: 50%;
  max-width: 80%;
}

.username {
  width: 665px;
  height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  flex-direction: column;
}

.user-nickname {
  margin-left: 2%;
  margin-top: 7%;
  line-height: 1,2;
  color: #111;
  font-size: 1.375rem;
}

.user-degree {
  max-width: fit-content;
  margin-left: 2%;
  margin-top: 1%;
  line-height: 1,2;
  color: #555;
  font-size: 0.875rem;
  cursor: pointer;
}

.user-degree:hover {
  border-bottom: 1px solid #777777;
  color: #545454;
}

.publish {
  width: calc(100% - 130px - 665px);
  height: 100%;
  /*border: 1px solid red;*/
  display: flex;
  align-items: center;
}

.publish-button {
  margin: 0 auto;
  padding: 10px;
  width: 70%;
  /*border: 1px solid black;*/
  border-radius: 2px;
  text-align: center;
  background-color: #4F6EF2;
  color: white;
  font-size: 0.800rem;
  letter-spacing: 2px;
}

.profile-op {
  width: 100%;
  height: 47px;
  /*border: 1px solid gray;*/
  display: flex;
  flex-direction: column;
}

.op-favor {
  margin-top: 20px;
  font-size: 0.8rem;
  margin-left: 30px;
}

.bar {
  background-color: #4F6EF2;
  border-radius: 2px;
  height: 2px;
  width: 50px;
  margin-top: 10px;
  margin-left: 20px;
}

.profile-content {
  margin: 0 auto;
  margin-top: 30px;
  width: var(--width-main);
  /*margin: 0 auto;*/
  height: 100vh;
  display: flex;
  flex-direction: row;
}

.content-left {
  width: 65%;
  height: 100%;
  /*border: 1px solid #ddd;*/
  /*background-color: white;*/
}

.one-follow-literature {
  width: 100%;
  height: 170px;
  border: 1px solid #dddddd;
  background-color: white;
  padding: 30px 25px 27px 25px;
}

.title {
  font-size: 0.9rem;
  color: black;
  font-weight: 700;
  width: fit-content;
  height: 25px;
  line-height: 20px;
  padding-left: 5px;
  margin-bottom: 5px;
}

.title:hover {
  cursor: pointer;
  border-bottom: 1px solid black;
}

.tags {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}

.tag {
}

.first-tag {
  border-radius: 3px;
  width: fit-content;
  padding: 3px;
  margin: 5px;
  font-size: 0.8rem;
  color: white;
  background-color: #4F6EF2;
}

.first-tag:hover {
  cursor: pointer;
}

.leftpart-tags {
  border-radius: 3px;
  width: fit-content;
  padding: 3px;
  margin: 5px;
  font-size: 0.8rem;
  border: 1px solid #4F6EF2;
  background-color: white;
  color: #4F6EF2;
}

.leftpart-tags:hover {
  cursor: pointer;
}

.authors {
  width: 100%;
  height: 25px;
  margin-bottom: 5px;
}

.author-list {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  align-items: center;
}

.authorImg {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: 1.5px;
  margin-left: 5px;
}

.authorname {
  font-size: 0.8rem;
  color: #000000;
  margin-left: 2px;
}

.authorname:hover {
  cursor: pointer;
  border-bottom: 1px solid #000000;
}

.read-time {
  width: 100%;
  height: 25px;
  font-size: 0.8rem;
  color: #999999;
  padding-left: 5px;
}

.read-time-content {
  height: 100%;
  margin-top: 3px;
}

.literature-ops {
  margin: 0 auto;
  width: 100%;
  height: calc(100% - 75px - 32px);
  display: flex;
}

.one-op {
}

.content-right {
  margin-left: 3%;
  width: 32%;
  height: 100%;
}

.user-intro {
  width: 100%;
  height: 193;
  border: 1px solid #ddd;
  background-color: white;
}

.user-intro-header {
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user-intro-header-content {
  margin-left: 5%;
  font-size: 0.8rem;
  color: #777;
}

.user-intro-change {
  margin-top: -3px;
  margin-left: 37%;
  font-size: 0.8rem;
  color: #777;
  cursor: pointer;
}

.user-intro-change:hover {
  border-bottom: 1px solid #777777;
  color: #4a4a4a;
}

.user-intro-content {
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
  flex-direction: row;
}

.intro-content {
  width: calc(100% - 70px);
  height: 100px;
}

.intro-content-details {
  height: 100px;
}

.intro-font-1 {
  max-width: fit-content;
  color: #111111;
  font-weight: 700;
  font-size: 1rem;
}

.intro-font-1:hover {
  border-bottom: 1px solid #777777;
  cursor: pointer;
}

.intro-font-2 {
  margin-top: 18px;
  color: #111111;
  font-size: 0.8rem;
}

.intro-img {
  border: 1px solid #e3e3e3;
  width: 70px;
  height: 70px;
}

.img-plus {
  margin-left: 5%;
  border-radius: 50%;
}

.intro-img-details {
  max-width: 100%;
  max-height: 100%;
}

.user-follow {
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  background-color: white;
  margin-top: 30px;
}

.follow-header {
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
}

.follow-header-content {
  margin-left: 5%;
  font-size: 0.8rem;
  color: #777;
}

.following {
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.befollowed {

}

.follow-part-head {
  width: 100%;
  height: 54px;
  /*border: 1px solid red;*/
  font-size: 0.7rem;
  padding: 5%;
  color: #000000;
}

.following-content {
}

.following-info {
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  margin-top: 5%;
}

.one-following {
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
}

.name-style {
  font-size: 1rem;
  color: #555555;
}

.intro-style {
  font-size: 0.8rem;
  color: #999999;
}

.following-op {
  margin: 0 auto;
  color: red;
  font-size: 0.8rem;
  margin-top: 8%;
}

.befollowed-op-followed {
  margin: 0 auto;
  color: #dddddd;
  font-size: 0.8rem;
  margin-top: 8%;
}

.befollowed-op-to-follow {
  margin: 0 auto;
  font-size: 0.8rem;
  margin-top: 8%;
}

.befollowed-content {
  padding-bottom: 20px;
}

.profile-icon {
  width: 15px;
}

.click-hover {
  border-bottom: 1px solid #777777;
  cursor: pointer;
}
</style>
