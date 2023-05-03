<template>
    <div class="btn-group btn-group-sm">
        <button class="btn btn-success" :class="{active: filter==='all'}"
                  @click="changeFilter('all')">All</button>
        <button class="btn btn-success" v-bind:class="{active: filter==='active'}"
                  @click="changeFilter('active')">Active</button>
        <button class="btn btn-success" :class="{active: filter==='completed'}"
                  @click="changeFilter('completed')">Completed</button>
    </div>
</template>

<script>

export default{
    name: 'todo-filters',
    data(){
        return {
            filter: this.$store.state.filter,
        }
    },
    methods: {
        changeFilter(filter){
            this.$store.dispatch('changeFilter', filter)
            
        }
    }
}
</script>

