import Vue from "vue";

export interface ToastState {
  message: string;
  type: "success" | "error" | "info";
  visible: boolean;
  timeout: number | null;
}

export interface ToastPlugin {
  show: (message: string, type?: ToastState['type'], duration?: number) => void;
  hide: () => void;
}

declare module "vue/types/vue" {
  interface Vue {
    $toast: ToastPlugin;
  }
}
