<template>
  <div id="plugin-toast">
    <transition name="fade">
      <div v-if="toastState.visible" class="toast">
        <div
          class="toast__message"
          :class="[`toast__message--${toastState.type}`]"
        >
          {{ toastState.message }}
          <button @click="$toast.hide()" type="button">×</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import type { ToastState } from "./types/toast";

export default Vue.extend({
  props: {
    toastState: Object as PropType<ToastState>,
  },
});
</script>

<style scoped lang="scss">
.toast {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  &__message {
    --bk-color: #28a745;

    padding: 0.5rem;
    border-radius: 5px;
    background-color: var(--bk-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 12.5rem;
    font-size: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &--error {
      --bk-color: #dc3545;
    }
  }

  & button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    margin-left: 10px;
    font-size: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
