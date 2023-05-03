<template>
    <div id="app">
        <ul class="nav">
            <li v-if="isLogged"><router-link to="/home" exact>Home</router-link></li>
            <li v-if="isLogged"><router-link to="/todo" exact>App</router-link></li>
            <li v-if="!isLogged"><router-link to="/register" exact>Register</router-link></li>
            <li v-if="!isLogged"><router-link to="/login" exact>Login</router-link></li>
            <li v-if="isLogged"><router-link to="/about" exact>About</router-link></li>
            <li v-if="isLogged"><router-link to="/logout" exact>Logout</router-link></li>
        </ul>
        <router-view class="view"></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        },
        computed: {
            isLogged(){
                return this.$store.getters.isLogged
            }
        }
    }
</script>

<style>
.nav{
    display: flex;
    list-style: none;
    justify-content: flex-end;
    padding: 15px 0;
    background-color: rgb(226, 235, 226);
    border-bottom: 1px solid grey;
    margin-bottom: 10px;
}
.nav li{
    padding: 0 25px;
}
.nav a, .nav a:hover{
    color: black;
    text-decoration: none;
}
.view{
    padding: 10px;
}
</style>