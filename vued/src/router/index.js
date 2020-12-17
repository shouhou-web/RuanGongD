import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

// 示例组件
const Test = () => import("views/Test.vue");

// 论坛相关组件
const ForumHome = () => import("views/Forum/ForumHome.vue");
const ForumSector = () => import("views/Forum/ForumSector.vue");
const ForumPost = () => import("views/Forum/ForumPost.vue");

// 首页相关组件
const Home = () => import("views/Home/Home.vue");
const Search = () => import("views/Home/Search.vue");

// 文献相关组件
const Literature = () => import("views/Literature/Literature.vue");
const Manage = () => import("views/Literature/Manage.vue");
const Classify = () => import("views/Literature/Classify.vue");
// const Search = () => import("views/Literature/Search.vue");
const Publication = () => import("views/Literature/Publication.vue");

// 消息相关组件
const Message = () => import("views/Message/Message.vue");
const System = () => import("views/Message/System.vue");
const Comment = () => import("views/Message/Comment.vue");
const Consult = () => import("views/Message/Consult.vue");

// 个人相关组件
const Profile = () => import("views/Profile/Profile.vue");
const Intro = () => import("views/Profile/Intro.vue");
const ApplyIntro = () => import("views/Profile/ApplyIntro.vue");

// 管理员相关组件
const Root = () => import("views/Root/Root.vue");
const Report = () => import("views/Root/childCpn/Report/Report.vue");
const Apply = () => import("views/Root/childCpn/Apply.vue");
const Sysmsg = () => import("views/Root/childCpn/Sysmsg.vue");
const Mgauthor = () => import("views/Root/childCpn/Mgauthor.vue");
const Doc = () => import("views/Root/childCpn/Report/childCpn/Doc.vue");
const Gate = () => import("views/Root/childCpn/Report/childCpn/Gate.vue");
const Creport = () => import("views/Root/childCpn/Report/childCpn/Comment.vue");
const Post = () => import("views/Root/childCpn/Report/childCpn/Post.vue");

//登录相关组件
const Login = () => import("views/Login/Login.vue");

//注册相关组件
const Register = () => import("views/Register/Register.vue");

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
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/applyIntro",
    name: "ApplyIntro",
    component: ApplyIntro
  },
  {
    path: "/literature",
    name: "Literature",
    component: Literature
  },
  {
    path: "/manage",
    name: "Manage",
    component: Manage
  },
  {
    path: "/publication",
    name: "Publication",
    component: Publication
  },
  {
    path: "/root",
    name: "Root",
    component: Root,
    children: [
      {
        path: "/",
        // redirect重定向
        redirect: "/root/report"
      },
      {
        path: "/root/report",
        name: "Report",
        component: Report,
        children: [
          {
            path: "/",
            redirect: "/root/report/doc"
          },
          {
            path: "/root/report/doc",
            name: "Doc",
            component: Doc
          },
          {
            path: "/root/report/gate",
            name: "Gate",
            component: Gate
          },
          {
            path: "/root/report/comment",
            name: "Comment",
            component: Creport
          },
          {
            path: "/root/report/post",
            name: "Post",
            component: Post
          }
        ]
      },
      {
        path: "/root/apply",
        name: "Apply",
        component: Apply
      },
      {
        path: "/root/sysmsg",
        name: "Sysmsg",
        component: Sysmsg
      },
      {
        path: "/root/mgauthor",
        name: "Mgauthor",
        component: Mgauthor
      }
    ]
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
    component: ForumPost
  },
  {
    path: "/intro",
    name: "Intro",
    component: Intro
  },
  {
    path: "/message",
    name: "Message",
    component: Message,
    children: [
      {
        path: "/",
        // redirect重定向
        redirect: "/message/comment"
      },
      {
        path: "/message/system",
        name: "System",
        component: System
      },
      {
        path: "/message/comment",
        name: "System",
        component: Comment
      },
      {
        path: "/message/consult",
        name: "Consult",
        component: Consult
      }
    ]
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path.slice(0, 6) == "/forum") store.commit("changeAppHeader", 1);
  else if (to.path == "/") store.commit("changeAppHeader", 0);
  else store.commit("changeAppHeader", -1);
  next();
});

export default router;
