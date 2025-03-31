<template>
  <section>
    <transition-group name="list-complete" tag="ul">
      <TodoItem
        v-for="todo in todos"
        :key="todo._id"
        :todo="todo"
        @change="$emit('change', $event)"
        class="list-complete__item"
      />
    </transition-group>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import type { ToDo } from "@/services/todos";

import TodoItem from "./TodoItem.vue";

export default Vue.extend({
  components: { TodoItem },
  props: {
    todos: {
      type: Array as PropType<ToDo[]>,
    },
  },
});
</script>

<style scoped lang="scss">
.list-complete {
  position: relative;

  &__item {
    transition: all 0.5s;
    width: 100%;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  &-leave-active {
    position: absolute;
  }
}
</style>
