<template>
    <div id="login" class="row">
        <div class="col-md-4 offset-4">
        <div class="card" style="padding:30px;">
          <form @submit.prevent="login">
              <h4>LOGIN</h4>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" class="form-control" v-model="user.email" required>
              </div>
              <div class="form-group">
                <label for="pwrd">Password:</label>
                <input type="password" id="pwrd" class="form-control" 
                         v-model="user.password" minlength="6" required>
              </div>
              <button type="submit" class="btn btn-success">LOGIN</button>
          </form>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                user: {
                    email: '',
                    password: '',
                },
            }
        },
        methods:{
            login(){
                this.$store.dispatch('login',this.user)
                    .then(response=>{
                        console.log(response);
                        this.$router.push('/todo');
                    })
            }
        }
    }
</script>

<style scoped>
   
    h4{
        padding: 5px;
    }
    button{
        color: white;
        width: 100%;
    }
</style>

