<template>
    <div>
        <button class="btn btn-light btn-sm" 
            v-show="oneCompleted" @click="clearCompleted">Clear Completed</button>
    </div>
</template>

<script>

export default{
    name: 'todo-clear-completed',
    computed: {
        oneCompleted(){
            return this.$store.getters.oneCompleted
        }
    },
    data(){
        return {

        }
    },
    methods:{
        clearCompleted(){
            this.$store.dispatch('clearCompleted')
        }
    }
}
</script>