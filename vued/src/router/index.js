import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

// 示例组件
const Test = () => import("views/Test.vue");

// 论坛相关组件
const ForumHome = () => import("views/Forum/ForumHome.vue");
const ForumSector = () => import("views/Forum/ForumSector.vue");
const ForumPost = () => import("views/Forum/ForumPost.vue");
const UserPosts = () => import("views/Forum/UserPosts.vue");

// 首页相关组件
const Home = () => import("views/Home/Home.vue");

// 文献相关组件
const Literature = () => import("views/Literature/Literature.vue");
const Manage = () => import("views/Literature/Manage.vue");
const Classify = () => import("views/Literature/Classify.vue");
const Search = () => import("views/Literature/Search.vue");
const Publication = () => import("views/Literature/Publication.vue");

// 消息相关组件
const Message = () => import("views/Message/Message.vue");

// 个人相关组件
const Profile = () => import("views/Profile/Profile.vue");
const Intro = () => import("views/Profile/Intro.vue");

// 管理员相关组件
const Root = () => import("views/Root/Root.vue");

//1.安装插件
Vue.use(VueRouter);

//创建router
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
    // redirect重定向
    // redirect: "/home/workSpace"
  },
  {
    path: "/forumHome",
    name: "ForumHome",
    component: ForumHome
  },
  {
    path: "/forumSector",
    name: "ForumSector",
    component: ForumSector
  },
  {
    path: "/forumPost",
    name: "ForumPost",
    component: ForumSector
  },
  {
    path: "/userPosts",
    name: "UserPost",
    component: UserPosts
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // getCollaboratorInfo(0).then(res => {
  //   store.commit("setDocCol", res);
  //   // store.commit("login", { userID: 1 });
  // });
  // ${//to and from are Route Object,next() must be called to resolve the hook}
  // 这里是修改名字的全局守护路由，暂不应用
  // document.title = to.matched[0].meta.title;
  if (to.path === "/home/workSpace/recent") {
    store.commit("homeleftnav", 1);
    store.commit("homemidnav", 1);
  } else if (to.path === "/home/workSpace/iMade") {
    store.commit("homeleftnav", 1);
    store.commit("homemidnav", 2);
  } else if (to.path === "/home/workSpace/myCollection") {
    store.commit("homeleftnav", 1);
    store.commit("homemidnav", 3);
  } else if (to.path === "/home/trash") store.commit("homeleftnav", 2);
  else if (to.path === "/home/teamSpace") store.commit("homeleftnav", 3);
  next();
});

export default router;
