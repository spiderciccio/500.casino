import Vue from "vue";
import type { ToastState, ToastPlugin } from "./types/toast";

import ToastComponent from "./Toast.vue";

const toastState: ToastState = Vue.observable({
  message: "",
  type: "success",
  visible: false,
  timeout: null
});

const ToastPlugin: ToastPlugin = {
  show(message, type = "success", duration = 3000) {
    toastState.message = message;
    toastState.type = type;
    toastState.visible = true;

    if (toastState.timeout) {
      clearTimeout(toastState.timeout);
    }

    toastState.timeout = setTimeout(() => {
      ToastPlugin.hide();
    }, duration);
  },

  hide() {
    toastState.visible = false;
  }
};

export default {
  install(Vue: any) {
    Vue.prototype.$toast = ToastPlugin;

    const ToastConstructor = Vue.extend(ToastComponent);
    const instance = new ToastConstructor({ propsData: { toastState } });

    instance.$mount();
    document.body.appendChild(instance.$el);
  }
};

declare module "vue/types/vue" {
  interface Vue {
    $toast: ToastPlugin;
  }
}
