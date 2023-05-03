<template>
    <div v-if="thereAreTodos"><input type="checkbox"
                :checked="!remaining"
                @change="checkAllTodos"> Check All</div>
</template>

<script>

export default{
    name: 'todo-check-all',
    computed: {
        remaining(){
            return this.$store.getters.remaining
        },
        thereAreTodos(){
            return this.$store.getters.thereAreTodos
        },
    },
    data(){
        return {

        }
    },
    methods:{
        checkAllTodos(){
            const checked = event.target.checked;
            this.$store.dispatch('checkTodos',checked)
        }
    }
}
</script>