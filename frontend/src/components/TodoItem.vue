<template>
  <div class="todo-item">
        <div :class="{completed:todo.completed}">
          <div class="left">
            <input type="checkbox" class="checkbox" v-model="todo.completed">
                <div v-if="!todo.editing" 
                  @dblclick="editTodo"
                  class="left-label">{{ todo.task }}</div>
            <input v-else v-focus type="text" class="form-control left-value"
                v-model="todo.task"
                  @blur="saveEdit"
            @keyup.enter="saveEdit"
            @keyup.esc="cancelEdit"
            >
          </div>
        </div>
        <div class="right"> 
          <button class="btn btn-light btn-sm" @click="capitalize">CAPITALIZE</button>
          <span class="remove-item" @click="removeTodo(todo._id)">  &times;</span>
        </div>
  </div>
</template>

<script>
import {eventBus} from '../main';

export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true,
    }
  },
  data(){
      return {
        
      }
  }, 
  created(){
    eventBus.$on('capitalize', ()=>  {
      this.todo.task = this.todo.task + 's'
    })
    this.todo.editing = false;
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    editTodo(){
      this.cachedTodo = Object.assign({}, this.todo);
      this.todo.editing = true;
    },
    saveEdit(){
      if(this.todo.task == '') Object.assign(this.todo, this.cachedTodo);  
      this.todo.editing = false;
      this.$store.dispatch('updateTodo', {
        '_id': this.todo._id,
        'task': this.todo.task,
        'completed': this.todo.completed,
        'editing': this.todo.editing
      })
    },
    cancelEdit(){
     Object.assign(this.todo, this.cachedTodo);
    },
    removeTodo(id){
      this.$store.dispatch('deleteTodo',id)
    },
    capitalize(){
      eventBus.$emit('capitalize');
    }
  }
};
</script>
<style>
    .todo-item {
    display: flex;
    height: 44px;
    justify-content: space-between;
    align-items: center;
  }
  .left{
    display: flex;
    align-items: center;
  } 
  .left-label, .left-value{
    margin-left: 4px;
  }
  .right{
    display: flex;
    align-items: center;
  }
  .remove-item{
    margin-right: 0px;
    cursor: pointer;
  }
  .completed{
    text-decoration: line-through;
  }
</style>