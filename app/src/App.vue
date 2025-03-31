<template>
  <div id="app">
    <header>
      <TodoAdd @submit="onSubmit($event)" class="container" />
      <TodoFilter
        v-model="filterBy"
        :options="filterOptions"
        class="container"
      />
    </header>
    <main class="container">
      <TodoList :todos="filteredTodos" @change="onChange" />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import type { ToDo } from "@/services/todos";
import { get, add, update } from "@/services/todos";
import { io } from "socket.io-client";

import TodoAdd from "./components/todo/TodoAdd.vue";
import TodoFilter from "./components/todo/TodoFilter.vue";
import TodoList from "./components/todo/TodoList.vue";

export default Vue.extend({
  components: { TodoAdd, TodoFilter, TodoList },
  data() {
    return {
      todos: [] as ToDo[],
      filterBy: "",
      filterOptions: ["To do", "Complete"],
    };
  },
  computed: {
    filteredTodos(): ToDo[] {
      if (this.filterBy === "") return this.todos;
      return this.todos.filter((todo: ToDo) =>
        this.filterBy === "Complete" ? todo.complete : !todo.complete
      );
    },
  },
  methods: {
    onSubmit(text: string) {
      add(text).catch((err) => {
        console.error(err);
        this.$toast.show("Internal server error", "error");
      });
    },
    onChange(item: ToDo) {
      update(item).catch((err) => {
        console.error(err);
        this.$toast.show("Internal server error", "error");
      });
    },
  },
  async mounted() {
    try {
      this.todos = await get();
    } catch (err) {
      console.error(err);
      this.$toast.show("Internal server error", "error");
    }

    // socket connection
    let socketActive = true;
    const socket = io(import.meta.env.VITE_SOCKET_URL);

    socket.on("connect", () => {
      !socketActive && this.$toast.show("Online", "success");
      socketActive = true;
    });
    socket.on("disconnect", () => {
      this.$toast.show("Offline", "error");
      socketActive = false;
    });

    // triggered after form submit new task
    socket.on("todo-created", (todo) => {
      this.todos = [todo].concat(this.todos);
    });
    // triggered after task change status
    socket.on("todo-updated", (todo) => {
      this.todos = this.todos.map((item) =>
        item._id === todo._id ? todo : item
      );
    });
  },
});
</script>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0;
  background-color: var(--color-background);
  z-index: 1;
  box-shadow: 0 0 7px #736e6e;
}

main {
  padding-top: 1.5rem;
}
</style>
