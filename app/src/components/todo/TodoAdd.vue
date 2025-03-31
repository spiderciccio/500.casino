<template>
  <form @submit.prevent="submit()">
    <div class="wrapper">
      <input
        type="text"
        v-model="text"
        required
        aria-label="Add a new task"
        placeholder="Add a new task..."
      />
      <button class="btn-fav" type="submit" aria-label="Submit">
        <IconPlus />
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

import IconPlus from "@/components/icons/IconPlus.vue";

export default Vue.extend({
  components: { IconPlus },
  data: () => ({
    text: "",
  }),
  methods: {
    submit() {
      this.$emit("submit", this.text);
      this.text = "";
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  display: flex;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0.5rem;
    border-radius: 1.25rem;
    background-color: silver;

    input {
      flex: 1;
      background-color: inherit;
      border: none;
      outline: none;
      font-size: 0.9rem;
      padding: 0 0.5rem;
    }
  }
}
</style>
