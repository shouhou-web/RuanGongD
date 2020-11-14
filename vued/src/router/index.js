import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

// 示例组件
const Test = () => import("views/Test.vue")
// 首页相关组件
const Home = () => import("views/Home/Home.vue");

//1.安装插件
Vue.use(VueRouter);

//创建router
const routes = [
  {
    path: "/",
    name: "Home",
    component: Test
    // redirect重定向
    // redirect: "/home/workSpace"
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
