<template>
    <div id="logout">
        
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        },
        created(){
            const token = this.$store.commit('logout');
            if(token == null) this.$router.push('/login');
        }
    }
</script>

<style scoped>
    
</style>

