import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import store from "./store/index";
import 'element-ui/lib/theme-chalk/index.css';//引入全部的样式

import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'

import MHeader from "components/common/m-header/m-header"
import LButton from "components/common/l-button/l-button";
import MHover from "components/common/m-hover/m-hover";
import MDropdown from "components/common/m-dropdown/m-dropdown";
import MAppHeader from "components/content/m-app-header/m-app-header";

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(Vuetify)

// commen
Vue.component("m-header", MHeader); // 全局导航栏
Vue.component("l-button", LButton); // 自定义按钮
Vue.component("m-hover", MHover); // 自定义悬浮窗
Vue.component("m-dropdown", MDropdown); // 自定义悬浮窗
// content
Vue.component("m-app-header", MAppHeader); // App默认导航栏

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
