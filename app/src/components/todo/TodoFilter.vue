<template>
  <section>
    <div class="filter">
      <label>Filter By:</label>
      <ul class="filter__list">
        <li v-for="option in options" :key="option">
          <button
            class="filter__btn"
            :class="{ 'filter__btn--active': value === option }"
            type="button"
            :aria-label="`Filter By ${option}`"
            :aria-pressed="`${value === option}`"
            @click="$emit('input', value === option ? '' : option)"
          >
            {{ option }}
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import TodoItem from "./TodoItem.vue";

export default Vue.extend({
  components: { TodoItem },
  props: {
    value: {
      type: String,
    },
    options: {
      type: Array as PropType<string[]>,
    },
  },
});
</script>

<style lang="scss" scoped>
.filter {
  padding-bottom: 1rem;

  label {
    font-weight: bold;
  }

  &__list {
    display: inline-flex;
  }

  &__btn {
    font-size: 1rem;
    background-color: transparent;
    border: none;
    color: var(--color-text);
    padding: 0 0.5rem;

    &:hover,
    &--active {
      text-decoration: underline;
    }
  }
}
</style>
