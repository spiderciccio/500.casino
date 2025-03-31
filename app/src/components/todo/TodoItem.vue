<template>
  <li class="todo-item">
    <button
      class="todo-item__btn"
      :class="{ 'todo-item__btn--complete': todo.complete }"
      :aria-pressed="`${todo.complete}`"
      type="button"
      @click="onClick(todo)"
    >
      <div
        class="todo-item__btn__icon"
        :aria-label="todo.complete ? 'Completed task' : 'Open task'"
      >
        <IconCheckmark />
      </div>
      <div class="todo-item__btn__text">{{ todo.text }}</div>
      <div class="todo-item__btn__date">
        <span class="sr-only">Created at </span>{{ date }}
      </div>
    </button>
  </li>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import type { ToDo } from "@/services/todos";

import IconCheckmark from "@/components/icons/IconCheckmark.vue";

import formatDate from "@/utils/formatDate";

export default Vue.extend({
  components: { IconCheckmark },
  props: {
    todo: {
      type: Object as PropType<ToDo>,
      required: true,
    },
  },
  computed: {
    date(): string {
      return formatDate(new Date(this.todo.createdAt));
    },
  },
  methods: {
    onClick(todo: ToDo) {
      this.$emit("change", {
        ...this.todo,
        complete: !todo.complete,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.todo-item {
  & + .todo-item {
    margin-top: 0.5rem;
  }

  &__btn {
    color: var(--color-btn-text);
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-btn-background);
    border: 1px solid var(--color-btn-border);
    padding: 1rem 0;
    border-radius: 0.5rem;

    transition: border-color 0.5s;

    &:hover {
      border-color: var(--color-btn-border-hover);
    }

    &__icon {
      margin: 0 1rem;
      width: 2rem;
      height: 2rem;
      background-color: #def6de;
      border-radius: 50%;

      svg {
        stroke: green;
        width: 2rem;
        height: 2rem;
        stroke-dasharray: 20;
        stroke-dashoffset: 20;
      }
    }

    &__text {
      flex: 1;
      text-align: left;
      font-size: 1rem;
    }

    &__date {
      padding: 0 1rem;
    }

    &--complete {
      .todo-item__btn {
        &__icon svg {
          animation-name: tick;
          animation-duration: 0.5s;
          stroke-dashoffset: 0;
        }

        &__text {
          text-decoration: line-through;
        }
      }
    }
  }
}

@keyframes tick {
  0% {
    stroke-dashoffset: 20;
  }

  100% {
    stroke-dashoffset: 0;
  }
}
</style>
