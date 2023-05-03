<template>
    <div class="row">
        <div class="col-md-4 offset-4">
        <div class="card" style="padding:30px;">
          <form @submit.prevent="register">
              <h4>REGISTER</h4>
              <div class="form-group">
                <label>Name:</label>
                <input type="name" id="name" class="form-control" v-model="user.name" required>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" class="form-control"  v-model="user.email" required>
              </div>
              <div class="form-group">
                <label for="pwrd">Password:</label>
                <input type="password" id="pwrd" class="form-control" 
                   v-model="user.password" minlength="6" required>
              </div>
              <button type="submit" class="btn btn-success"
                style="color:white">REGISTER</button>
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
                  name: '',
                  email: '',
                  password: '',
                }
            }
        },
        methods:{
          register(){
            this.$store.dispatch('register',this.user)
              .then((response)=> {
                  console.log(response);
                  this.$router.push('/login');
              })
          }
        }
    }
</script>

<style>
    h4{
        padding: 5px;
    }
    button{
        width: 100%;
    }
</style>