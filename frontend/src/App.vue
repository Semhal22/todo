<template>
  <div class="app">
    <HelloWorld/>
    <TodoList/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import TodoList from './components/TodoList';

export default {
  name: 'App',

  components: {
    HelloWorld,
    TodoList,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  #app{
    margin-bottom: 20px;
  }
</style>
