import Vue from "vue";
import App from "./App.vue";
import ToastPlugin from "./plugins/toast";

import "./styles/main.scss";

Vue.use(ToastPlugin);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
