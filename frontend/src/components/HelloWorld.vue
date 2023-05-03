<template>
  <div>
    <div class="row">
      <div class="col-md-4 offset-4">
         <img :src="require('../assets/logo.png')">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
     
    }),
  }
</script>

<style>
  .row{
    margin-top: 30px;
  }
</style>
