<template>
    <div>{{remaining}} tasks left</div>
</template>

<script>
export default{
    name: 'todo-items-left',
    computed:{
        remaining(){
            return this.$store.getters.remaining
        }
    },
    data(){
        return {

        }
    },
}
</script>