<template>
  <div class="row">
    <div class="col-md-4 offset-3">
      <input type="text" placeholder="Tasks to be done" class="form-control" 
              v-model="todo"
              @keyup.enter="addTodo" >
      <todo-item v-for="todo in filteredTodos" :key="todo.id"
                  :todo="todo">      
      </todo-item>
      <div class="extra-container">
        <todo-check-all />
        <todo-items-left/>
      </div>
      <div class="extra-container">
        <todo-filters />
        <todo-clear-completed />
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsLeft from './TodoItemsLeft'
import TodoCheckAll from './TodoCheckAll'
import TodoFilters from './TodoFilters'
import TodoClearCompleted from './TodoClearCompleted'

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    TodoItemsLeft,
    TodoCheckAll,
    TodoFilters,
    TodoClearCompleted,
  },
  data(){
    return{
      todo: '',
    }
  },
  created(){
    this.$store.dispatch('retrieveTodos');
  },
  computed: {
    filteredTodos(){
      return this.$store.getters.filteredTodos
    },
  },
  methods:{
    addTodo(){
      if(this.todo == '') return
      this.$store.dispatch('addTodo',{
        task: this.todo
      });
      this.todo = '';
    },
  }
};
</script>
<style>
  .extra-container{
    display: flex;
    justify-content: space-between;
    border-top: 1px solid lightgray;
    padding-top: 8px;
  }
  .active{
    background-color: darkgreen;
  }
</style>
